// import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './MainScreen/HomeScreen';
import { UserContext } from './userContext';
import FriendsScreen from './Chat_feature/FriendsScreen';
import ChatScreen from './Chat_feature/ChatScreen';
import ChatMessageScreen from './Chat_feature/ChatMessageScreen';
import Profile_Screen from './ProfileScreen/Profile_Screen';
import MainDrawer from './DrawerScreens/MainDrawer';
import MyProfile from './SideBarComponents/MyProfile'
import Events from './SideBarComponents/Events';
const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
import HelpScreen from './Home_Screen/HelpScreen'
import PaymentPage from './Events/PaymentPage';
import Jobs from './Home_Screen/Jobs';
import Internships from './Home_Screen/internships';
import Notifications from './Home_Screen/Notifications';
import Games from './Home_Screen/Games'
import Teams from './Home_Screen/Teams'
import TicTacToe from './Home_Screen/TicTacToe';
import GuessTheNumber from './Home_Screen/GuessTheNumber';
import JobDetails from './Home_Screen/JobDetails'
import AdminLogin from './screens/AdminLogin';
import AdminUsers from './Components/AdminUsers';
import Game2048 from './Home_Screen/Game2048';


function App() {
  return (
    <UserContext>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen
            name="Login_Screen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register_Screen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminLogin"
            component={AdminLogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminUsers"
            component={AdminUsers}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Home_Screen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Friend Requests"
            component={FriendsScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Chats"
            component={ChatScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Messages"
            component={ChatMessageScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile_Screen}
            options={{ headerShown: true }}
          />

          <Stack.Screen
            name="MyProfile"
            component={MyProfile}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Help"
            component={HelpScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Events"
            component={Events}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="PaymentPage"
            component={PaymentPage}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Jobs"
            component={Jobs}
            options={{ headerShown: true }}
          />
        <Stack.Screen
            name="Internships"
            component={Internships}
            options={{ headerShown: true }}
          />
           <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={{ headerShown: true }}
          />
         <Stack.Screen
         name="Games"
         component={Games}
         options={{headerShown:true}}
         />
         <Stack.Screen
         name="Teams"
         component={Teams}
         options={{headerShown:true}}
         />
          <Stack.Screen
         name="TicTacToe"
         component={TicTacToe}
         options={{headerShown:true}}
         />
          <Stack.Screen
         name="GuessTheNumber"
         component={GuessTheNumber}
         options={{headerShown:true}}
         />
         <Stack.Screen
         name="Game2048"
         component={Game2048}
         options={{headerShown:true}}
         />
         <Stack.Screen
         name="JobDetails"
         component={JobDetails}
         options={{headerShown:true}}
         />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext>
  );
}

export default App;