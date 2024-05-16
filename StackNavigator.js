import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import AdminScreen from './MainScreen/AdminScreen';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login_Screen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register_Screen" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home_Screen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default StackNavigator;