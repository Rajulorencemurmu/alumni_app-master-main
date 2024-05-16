import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '../userContext';
import { useNavigation } from '@react-navigation/native';

const Settings_features = () => {
  const navigation = useNavigation();
  const { setUserId,logout } = useContext(UserType);

  const handleLogout = async () => {
    try {
      console.log('this is setuserid from setting_features.js',setUserId);
      // Clear the authentication token from AsyncStorage
      await AsyncStorage.removeItem('authToken');

      // Clear the user ID from context
      // setUserId('');
      logout();
      
      console.log('this is setuserid from setting_features.js',setUserId);

      // Navigate back to the login screen
      navigation.navigate('Login_Screen');
    } catch (error) {
      console.log('Error during logout:', error.message);
      Alert.alert('Logout Error', 'An error occurred while logging out');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you sure you want to logout?</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings_features;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'tomato',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});