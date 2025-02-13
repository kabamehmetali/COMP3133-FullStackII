// RoomSelectionScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, Button, Text, Snackbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:6000';

export default function RoomSelectionScreen({ navigation }) {
  const [rooms, setRooms] = useState([]);
  const [username, setUsername] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (msg) => {
    setSnackbarMessage(msg);
    setSnackbarVisible(true);
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        console.log('ROOMS: Using token =>', token);

        const res = await axios.get(`${BASE_URL}/api/chat/rooms`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('ROOMS RESULT =>', res.data.rooms);
        setRooms(res.data.rooms);
      } catch (err) {
        console.log('ROOMS ERROR =>', err?.response?.data || err);
        showSnackbar('Failed to load rooms');
      }
    };

    const loadUser = async () => {
      const un = await AsyncStorage.getItem('username');
      if (un) setUsername(un);
    };

    loadUser();
    loadRooms();
  }, []);

  const handleLogout = async () => {
    console.log('LOGOUT');
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.removeItem('username');
    showSnackbar('Logged out');
    setTimeout(() => {
      navigation.replace('Login');
    }, 1500);
  };

  const joinRoom = (roomName) => {
    console.log('JOINING ROOM =>', roomName);
    navigation.navigate('Chat', { room: roomName });
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={{ textAlign: 'center', marginBottom: 10 }}>
        Welcome, {username}
      </Text>
      <Text variant="titleMedium" style={{ marginBottom: 10 }}>
        Select a room to join:
      </Text>

      <FlatList
        data={rooms}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <List.Item
            title={item}
            style={styles.listItem}
            onPress={() => joinRoom(item)}
          />
        )}
      />

      <Button mode="contained" onPress={handleLogout} style={{ marginTop: 16 }}>
        Logout
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={dismissSnackbar}
        duration={3000}
        action={{ label: 'OK', onPress: () => {} }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  listItem: {
    backgroundColor: '#fff',
    marginVertical: 4,
    borderRadius: 8,
  },
});
