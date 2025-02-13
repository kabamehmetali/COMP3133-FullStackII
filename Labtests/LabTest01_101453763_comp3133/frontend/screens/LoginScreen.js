// LoginScreen.js
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Snackbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// EXACT to Postman => http://localhost:6000
const BASE_URL = 'http://localhost:6000';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (msg) => {
    setSnackbarMessage(msg);
    setSnackbarVisible(true);
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  const handleLogin = async () => {
    try {
      if (!username.trim() || !password.trim()) {
        showSnackbar('Please enter a valid username and password');
        return;
      }

      const payload = { username, password };
      console.log('LOGIN PAYLOAD =>', payload);

      const res = await axios.post(`${BASE_URL}/api/auth/login`, payload);

      console.log('LOGIN STATUS =>', res.status);
      console.log('LOGIN DATA =>', res.data);

      // Expect res.data => { message, token, user: {...} }
      const { token, user } = res.data;

      // Store JWT in AsyncStorage
      await AsyncStorage.setItem('jwtToken', token);
      await AsyncStorage.setItem('username', user.username);

      showSnackbar('Login successful!');
      setTimeout(() => {
        navigation.replace('ChatApp');
      }, 1500);
    } catch (err) {
      console.log('LOGIN ERROR =>', err?.response?.data || err);
      const errMsg = err?.response?.data?.error || 'Login failed';
      showSnackbar(errMsg);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Login" />
          <Card.Content>
            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
            <Button mode="contained" onPress={handleLogin} style={{ marginTop: 16 }}>
              Login
            </Button>
            <Button
              onPress={() => navigation.navigate('Signup')}
              style={{ marginTop: 8 }}
            >
              Don't have an account? Sign Up
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={dismissSnackbar}
        duration={3000}
        action={{ label: 'OK', onPress: () => {} }}
      >
        {snackbarMessage}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f1f5f9',
  },
  card: {
    padding: 20,
    borderRadius: 8,
    elevation: 2,
  },
  input: {
    marginVertical: 8,
  },
});
