import { StyleSheet, Text, View,ActivityIndicator,Image,ScrollView,TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import { useContext,useState,useEffect } from 'react';
import { UserType } from '../userContext';
import BASE_URL from '../apiConfig';
import axios from 'axios';
import { FontAwesome6 } from '@expo/vector-icons';

const MyProfile = () => {

  const { userId, setUserId } = useContext(UserType);
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [upcomingEvent, setUpcomingEvent] = useState(null);

  console.log(userId);
  //fetching user and events
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`);
        setUserData(response.data);
        // console.log(response)

           // Fetch events
           const eventsResponse = await axios.get(`${BASE_URL}/api/events`);
           const events = eventsResponse.data;
          //  console.log(events)

             // Find the latest event
        if (events.length > 0) {
          const latestEvent = events[0]; // Assuming events are sorted by date in descending order
          setUpcomingEvent(latestEvent);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  //checking if it has been fetched or not
  if (!userData || !upcomingEvent) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  //formating date and time 
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const formatTime=(datetime)=>{
    const date = new Date(datetime);
    const formattime=date.toLocaleTimeString();
    return `${formattime}`
  }
  

  //getting current user details
  const { name, email, image, number,occupation,batches } = userData;
 const pencilPressed=()=>{
   console.log('presed')
   setEditing(true)
   setEditedData(userData)
  //  console.log(userData)

 } 

 
 const handleSave = async () => {
  try {
    // Ensure editedData is not null and contains the required fields
    if (!editedData || !editedData.name || !editedData.email || !editedData.number) {
      console.error('Invalid data:', editedData);
      return;
    }

    console.log('Saving user data:', editedData);

    // Make the PUT request to update user data
    const response = await axios.put(`${BASE_URL}/user/${userId}`, editedData);

    if (response.status === 200) {
      setUserData(editedData); // Update user data in the UI
      setEditing(false);
      console.log('User data updated successfully');
    } else {
      console.error('Failed to update user data. Status:', response.status);
    }
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('Error updating user data. No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
  }
};






  return (
    <ScrollView style={{flex:1}}>
    <View  style={{height:154}}>
    <Image
      source={require("../ProfileScreen/assets/bg.jpg")}
      style={styles.bgimg}
    />
    {!editing && (
      <TouchableOpacity onPress={pencilPressed}>
      <FontAwesome6 name="pencil" size={24} color="white" style={{alignSelf:'flex-end',marginRight:5,marginTop:-25}} />  
    </TouchableOpacity>
    )}
  
    <View style={{marginTop:-54,marginLeft:-195}}>
    <Image
      source={{uri:image}}
      style={styles.image}
      resizeMode="cover"
    />
    </View>

    <View style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative',top:-95,left:12}}>
      
      {editing ? (
          <TextInput
          value={editedData.name}
          onChangeText={(text) => setEditedData({ ...editedData, name: text })}
          style={{ fontSize: 20,marginLeft:92 }}
          />
      ):(
        <Text style={{fontSize:24,marginLeft:92}}>{name}</Text>
      )}


     {editing?(
      <TextInput
      value={editedData.email}
      onChangeText={(text) => setEditedData({ ...editedData, email: text })}
      style={{ fontSize: 20,marginLeft:92 }}
      />
     ):(
      <Text style={{marginLeft:32,marginLeft:92}}>{email}</Text>
     )}
     {editedData?(
      <TextInput
      value={editedData.number}
      onChangeText={(text)=>setEditedData({...editedData,number:text})}
      style={{ fontSize: 16,marginLeft:92 }}
      />
     ):(
      <Text style={{marginLeft:12,marginLeft:92}}>+91 {number}</Text>
     )}
      
    </View>
    </View>

      <View style={styles.container3}>
      <Image
        source={require('.././assets/occupation.png')}
        style={styles.occupationicon}
      />
        <Text style={{fontSize:21,}}>Occupation</Text>
        
        {editing?(
          <TextInput
          value={editedData.occupation}
          onChangeText={(text) => setEditedData({ ...editedData, occupation: text })}
          />
        ):(
          <Text>{occupation }</Text>
        )}
       
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
      <Text style={{ fontSize: 15,marginTop:14, fontWeight:'bold'}}>{upcomingEvent.title}</Text>
      <Text style={{fontWeight:'bold'}}>{formatDate(upcomingEvent.date)}</Text>
      <Text style={{fontWeight:'bold'}}>{formatTime(upcomingEvent.time)}</Text>
      </View>
      
      {editing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Save</Text>
        </TouchableOpacity>
      )}
      </ScrollView>
  );
};



export default MyProfile

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
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    height: 150,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
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
  },
});
