// ChatScreen.js
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { Button, Text, TextInput, Snackbar } from 'react-native-paper';
import io from 'socket.io-client';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:6000';

export default function ChatScreen({ route }) {
  const { room } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [typingUser, setTypingUser] = useState('');

  // Snackbar
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const socketRef = useRef(null);

  useEffect(() => {
    const loadUser = async () => {
      const un = await AsyncStorage.getItem('username');
      setUsername(un || '');
    };
    loadUser();
  }, []);

  useEffect(() => {
    const initSocket = async () => {
      console.log('JOIN ROOM =>', { username, room });
      socketRef.current = io(BASE_URL, { transports: ['websocket'] });

      socketRef.current.emit('joinRoom', { username, room });

      socketRef.current.on('message', (msgData) => {
        console.log('SOCKET MESSAGE =>', msgData);
        setMessages((prev) => [...prev, msgData]);
      });

      socketRef.current.on('typing', ({ from_user }) => {
        console.log('TYPING =>', from_user);
        setTypingUser(from_user);
        setTimeout(() => {
          setTypingUser('');
        }, 2000);
      });
    };

    if (username && room) {
      initSocket();
    }

    return () => {
      if (socketRef.current) {
        console.log('LEAVE ROOM =>', { username, room });
        socketRef.current.emit('leaveRoom', { username, room });
        socketRef.current.disconnect();
      }
    };
  }, [username, room]);

  // Fetch old messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        console.log('FETCH ROOM MESSAGES =>', room);
        const res = await axios.get(`${BASE_URL}/api/chat/room-messages/${room}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('MESSAGES RESULT =>', res.data);
        setMessages(res.data);
      } catch (err) {
        console.log('MESSAGES ERROR =>', err?.response?.data || err);
        showSnackbar('Failed to fetch messages');
      }
    };

    if (room) {
      fetchMessages();
    }
  }, [room]);

  const showSnackbar = (msg) => {
    setSnackbarMessage(msg);
    setSnackbarVisible(true);
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const msgData = {
      from_user: username,
      room,
      message: newMessage,
    };
    console.log('SEND MESSAGE =>', msgData);
    socketRef.current.emit('groupMessage', msgData);
    setNewMessage('');
  };

  const handleTyping = () => {
    if (socketRef.current) {
      socketRef.current.emit('typing', { from_user: username, room });
    }
  };

  const renderItem = ({ item }) => {
    const isOwn = item.from_user === username;
    return (
      <View
        style={[
          styles.messageBubble,
          isOwn ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text style={styles.messageUser}>{item.from_user}:</Text>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.dateText}>{item.date_sent}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.chatHeader}>
        <Text variant="titleMedium">Room: {room}</Text>
        {typingUser && typingUser !== username && (
          <Text style={{ fontStyle: 'italic' }}>{typingUser} is typing...</Text>
        )}
      </View>

      <FlatList
        data={messages}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderItem}
        style={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={(text) => {
            setNewMessage(text);
            handleTyping();
          }}
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button mode="contained" onPress={sendMessage}>
          Send
        </Button>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={dismissSnackbar}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  chatHeader: {
    padding: 10,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesList: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#cfeffd',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e2e8f0',
  },
  messageUser: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 10,
    alignSelf: 'flex-end',
    color: '#555',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
});
