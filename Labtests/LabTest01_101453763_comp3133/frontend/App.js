// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';

import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import RoomSelectionScreen from './screens/RoomSelectionScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ChatTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Rooms" component={RoomSelectionScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="ChatApp"
            component={ChatTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
