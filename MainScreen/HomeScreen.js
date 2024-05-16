import { React, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Chat_feature from "../Chat_feature/Chat_feature";
import Settings_feature from "../Settings_feature/Settings_feature";
import Maps_feature from "../Maps_feature/Maps_feature";
import { View, Text } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FriendRequest from "../Components/FriendRequests";
import Home_Screen from "../Home_Screen/Home_Screen";
import LoadingIndicator from "../LoadingIndicator";
import EventsManager from "../Events/EventsManager";
import AdminScreen from "./AdminScreen";


function HomeScreenComponent({ navigation }) {
  return <Home_Screen />;
}

function MapsScreen({ navigation }) {
  return <Maps_feature />;
}

function SettingsScreen({ navigation }) {
  return <Settings_feature />;
}

function EventManager({ navigation }) {
  return <EventsManager />;
}

function ChatScreen({ navigation }) {
  return <Chat_feature />;
}

// function Admin_Screen({ navigation }) {
//   return < AdminScreen/>;
// }


const Tab = createBottomTabNavigator();

export default function HomeScreen() {

  const [isAdmin, setIsAdmin] = useState(false); // Assuming isAdmin is false initially

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Settings") {
            iconName = focused ? "setting" : "setting"; // Corrected name
          } else if (route.name === "Maps") {
            iconName = focused ? "enviromento" : "enviromento";
          } else if (route.name === "Events") {
            iconName = focused ? "calendar" : "calendar";
          } else if (route.name === "Chat") {
            iconName = focused ? "message1" : "message1";
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreenComponent} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Maps" component={MapsScreen} />
      <Tab.Screen name="Events" component={EventManager} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      {/* <Tab.Screen name="FriendRequest" component={FriendRequest} /> */}
     {isAdmin &&  <Tab.Screen name="Admin" component={AdminScreen} options={{tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={size}
                  color={color}
      />
    ),
  }}
/>
}

    </Tab.Navigator>
  );
}

// HomeScreen.navigationOptions = {
//   headerRight: () => <CustomChatIcon />,
// };
