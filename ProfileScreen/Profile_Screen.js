import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import BASE_URL from "../apiConfig";
import { useContext, useState, useEffect } from "react";
// import { UserType } from "../userContext";
// import { useRoute } from "@react-navigation/native";

const Profile_Screen = ({ route }) => {

  // const [upcomingEvent, setUpcomingEvent] = useState(null);
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //          // Fetch events
  //          const eventsResponse = await axios.get(`${BASE_URL}/api/events`);
  //          const events = eventsResponse.data;
  //            // Find the latest event
  //       if (events.length > 0) {
  //         const latestEvent = events[0]; // Assuming events are sorted by date in descending order
  //         setUpcomingEvent(latestEvent);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user events:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);
  // if (!upcomingEvent) {
  //   return <ActivityIndicator size="large" color="#000" />;
  // }


  const { name, email, image, number, occupation, batches } = route.params.user;
  return (
    <ScrollView style={{flex:1}}>
    <View  style={{height:154}}>
    <Image
      // source={require(".././assets/background.jpg")}
      source={require('../ProfileScreen/assets/bg.jpg')}
      style={styles.bgimg}
    />
    <View style={{marginTop:-54,marginLeft:-195}}>
    <Image
      source={{uri:image}}
      style={styles.image}
      resizeMode="cover"
    />
    </View>
    <View style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative',top:-95,left:12}}>
      <Text style={{fontSize:24}}>{name}</Text>
      <Text style={{marginLeft:32,fontWeight:300}}>{email}</Text>
      <Text style={{marginLeft:12,fontWeight:400}}>+91 {number}</Text>
    </View>
    </View>


      <View style={styles.container3}>
      <Image
        source={require('.././assets/occupation.png')}
        style={styles.occupationicon}
      />
        <Text style={{fontSize:21,}}>Occupation</Text>
        <Text>{occupation }</Text>
        <Image
        source={require('.././assets/batch.png')}
        style={styles.batchicon}
      />
        <Text style={{fontSize:21,}}>Batch</Text>
        <Text>{batches }</Text>
      </View>
      <View style={styles.container5}>
      <Image
          source={require(".././assets/alarmclock.jpeg")}
          style={styles.icon}
          resizeMode="cover"
        />
      <Text style={{fontSize:21,marginTop:-174}}>Upcoming Events!!!</Text>
      <Text style={{fontSize:15}}>Get ready for exciting events</Text>
      {/* <Text style={{ fontSize: 15, fontWeight:'bold'}}>{upcomingEvent.title}</Text>
        <Text style={{fontWeight:'bold'}}>{upcomingEvent.date}</Text> */}
      </View>
      
      </ScrollView>
  );
};

export default Profile_Screen;

const styles = StyleSheet.create({
  image: {
    width: 130,
    height: 130,
    borderRadius: 100,
    // marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 28,
  },
  container3: {
    marginTop: 184,
    // position:'relative',
    // top:174,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    // width:300,
    height: 150,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // container4: {
  //   marginTop: 24,
  //   backgroundColor: "#fff",
  //   borderRadius: 10,
  //   padding: 10,
  //   marginVertical: 10,
  //   marginHorizontal: 15,
  //   shadowColor: "#000",
  //   width:80,
  //   height: 80,
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  // },
  container5: {
    marginTop: 24,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    // width:120,
    height: 180,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon:{
    marginTop:28,
    width:142,
    height:142,
    alignSelf:"flex-end",
  },
  bgimg:{
    width:364,
    height:154,
  },
  occupationicon:{
    width:22,
    height:22,
    alignSelf:'flex-end',
    marginRight:7,
    marginBottom:-26,
    marginTop:12
  },
  batchicon:{
    width:22,
    height:22,
    alignSelf:'flex-end',
    marginRight:7,
    marginBottom:-30,
    marginTop:28
  }
});
