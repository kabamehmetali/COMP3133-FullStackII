// SignupScreen.js
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Snackbar } from 'react-native-paper';
import axios from 'axios';

// EXACT to your Postman endpoint
// If you're on iOS simulator, localhost works automatically
const BASE_URL = 'http://localhost:6000';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');

  // Snackbar states
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (msg) => {
    setSnackbarMessage(msg);
    setSnackbarVisible(true);
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  const handleSignup = async () => {
    try {
      if (!username.trim() || !password.trim()) {
        showSnackbar('Username & password are required');
        return;
      }

      const payload = {
        username,
        firstname,
        lastname,
        password,
      };
      console.log('SIGNUP PAYLOAD =>', payload);

      const res = await axios.post(`${BASE_URL}/api/auth/signup`, payload);

      console.log('SIGNUP STATUS =>', res.status);
      console.log('SIGNUP DATA =>', res.data);

      if (res.status === 201) {
        showSnackbar('User created successfully!');
        // Navigate to Login after short delay
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1500);
      }
    } catch (err) {
      console.log('SIGNUP ERROR =>', err?.response?.data || err);
      const errMsg = err?.response?.data?.error || 'Signup failed';
      showSnackbar(errMsg);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Sign Up" />
          <Card.Content>
            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
            <TextInput
              label="First Name"
              value={firstname}
              onChangeText={setFirstname}
              style={styles.input}
            />
            <TextInput
              label="Last Name"
              value={lastname}
              onChangeText={setLastname}
              style={styles.input}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />

            <Button mode="contained" onPress={handleSignup} style={{ marginTop: 16 }}>
              Sign Up
            </Button>
            <Button
              onPress={() => navigation.navigate('Login')}
              style={{ marginTop: 8 }}
            >
              Already have an account? Login
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
