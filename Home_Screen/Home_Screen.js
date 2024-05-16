import {
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  TextInput,
  Button,
  BackHandler, // Import BackHandler
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { UserType } from "../userContext";
import { useContext } from "react";


//for main content in home
import { colors } from './theme'
import randomImage from './assets1/random'

import grad from './grad.jpg'
import grad1 from './grad1.jpg'
import grad3 from './grad3.jpg'


const Home_Screen = () => {

  const { userId, setUserId, logout,userName } = useContext(UserType);
  console.log('userId in home screen.js',userId);
  console.log('userName in home screen.js=',userName);

  const { route } = useRoute();

  // const {user}  = route.params;
  // const {name}=user;
  // console.log('Name in home screeen is',user);

  const navigation = useNavigation();
  const drawerRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      drawerRef.current.closeDrawer();
    } else {
      drawerRef.current.openDrawer();
    }
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Confirm Logout",
        "Do you really want to logout?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              await AsyncStorage.removeItem("authToken");
              logout();
              navigation.navigate("Login_Screen");
            },
          },
        ],
        { cancelable: false }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []); // Empty dependency array to run effect only once

  const handleLogout = async () => {
    try {
      Alert.alert(
        "Confirm Logout",
        "Do you really want to logout?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              await AsyncStorage.removeItem("authToken");
              logout();
              navigation.navigate("Login_Screen");
            },
          },
        ],
        { cancelable: false }
      );
      return true;
    } catch (error) {
      console.log("Error during logout:", error.message);
      Alert.alert("Logout Error", "An error occurred while logging out");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: userName?userName:"Home",
      headerLeft: () => (
        <TouchableOpacity onPress={toggleDrawer} style={{ marginLeft: 15 }}>
        <Ionicons name="menu-outline" size={28} color="black" />
      </TouchableOpacity>
      ),
    });
  }, [isDrawerOpen]);

  const navigationView = (
    <View style={styles.navigationContainer}>
      <View style={{ flexDirection: "row", gap: 12, padding: 4 }}>
        <Ionicons name="home-outline" size={24} color="black" />
        <Text
          onPress={() => {
            navigation.navigate("Home_Screen");
            handleDrawerClose();
          }}
        >
          Home
        </Text>
      </View>

      <View
        style={{ flexDirection: "row", gap: 12, marginTop: 12, padding: 4 }}
      >
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={24}
          color="black"
        />
        <Text
          onPress={() => {
            navigation.navigate("MyProfile");
            handleDrawerClose();
          }}
        >
          My Profile
        </Text>
      </View>

      <View
        style={{ flexDirection: "row", gap: 12, marginTop: 12, padding: 4 }}
      >
        <MaterialIcons name="message" size={24} color="black" />
        <Text
          onPress={() => {
            navigation.navigate("Chats");
            handleDrawerClose();
          }}
        >
          Message
        </Text>
      </View>

      <View
        style={{ flexDirection: "row", gap: 12, marginTop: 12, padding: 4 }}
      >
        <MaterialIcons name="event" size={24} color="black" />
        <Text onPress={() => navigation.navigate("Events")}>Events</Text>
      </View>

      <View
        style={{
          height: 1,
          width: 180,
          backgroundColor: "#ccc",
          marginTop: 320,
        }}
      />
      <View style={{ flexDirection: "row", gap: 12, marginTop: 5, padding: 4 }}>
        <Ionicons name="help-circle-outline" size={24} color="black" />
        <Text onPress={() => navigation.navigate("Help")}>Help</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 12, marginTop: 5, padding: 4 }}>
        <MaterialIcons name="logout" size={24} color="black" />
        <Text onPress={handleLogout}>Logout</Text>
      </View>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={200}
      drawerPosition="left"
      renderNavigationView={() => navigationView}
      onDrawerOpen={() => setIsDrawerOpen(true)}
      onDrawerClose={() => setIsDrawerOpen(false)}
    >

      <View style={styles.container}>
        {/* <Text>Home! hello I am home</Text>
        <Text>Welcome, {userName}!</Text> */}
        <View style={styles.imgbdy}>
        <Image source={grad3} style={styles.img} />
        </View>
        <View>
          <Text style={{fontSize:18,width:255}}>Believe in yourself enough to be different and do something unique.</Text>
        </View>

        <View style={{flex:1,flexDirection:'row'}}>
          <TouchableOpacity style={styles.box1} onPress={()=>navigation.navigate('Jobs')}>
            <Image source={require('../ProfileScreen/assets/job.png')} style={{width:35,height:35,alignSelf:"center", justifyContent:'center',marginTop:19}}/>
            <Text style={{alignSelf:'center',marginTop:24}}>Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box1} onPress={()=>navigation.navigate('Internships')}>
          <Image source={require('../ProfileScreen/assets/internship.png')} style={{width:35,height:35,alignSelf:"center", justifyContent:'center',marginTop:19}}/><Text style={{alignSelf:'center',marginTop:24}}>Interns</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box1} onPress={()=>navigation.navigate('Notifications')}>
          <Image source={require('../ProfileScreen/assets/notification.png')} style={{width:35,height:35,alignSelf:"center", justifyContent:'center',marginTop:19}}/>
          <Text style={{alignSelf:'center',marginTop:24}}>Notifi</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
          <TouchableOpacity style={styles.box2} onPress={()=>navigation.navigate('Games')}>
          <Image source={require('../ProfileScreen/assets/games.png')} style={{width:35,height:35,alignSelf:"center", justifyContent:'center',marginTop:19}}/>
          <Text style={{alignSelf:'center',marginTop:24}}>Games</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box2}  onPress={()=>navigation.navigate('Events')}>
          <Image source={require('../ProfileScreen/assets/events.png')} style={{width:35,height:35,alignSelf:"center", justifyContent:'center',marginTop:19}}/>
          <Text style={{alignSelf:'center',marginTop:24}}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box2}  onPress={()=>navigation.navigate('Teams')}>
          <Image source={require('../ProfileScreen/assets/team.png')} style={{width:35,height:35,alignSelf:"center", justifyContent:'center',marginTop:19}}/>
          <Text style={{alignSelf:'center',marginTop:24}}>Team</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#fff'  
  },
 
imgbdy:{
  // width:350,
  // height:220,
marginTop:42,
// marginLeft:13,
},
  img:{
   width:320,
   height:200,
  //  borderRadius:15,
  },
  box1:{
    marginTop: 44,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    width:80,
    height: 80,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  box2:{
    // marginTop: -4,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    width:80,
    height: 80,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  navigationContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    // zIndex:100,
  },
});

export default Home_Screen;
