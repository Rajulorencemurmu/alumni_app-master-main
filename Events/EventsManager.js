import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import DateTimePicker from @react-native-community/datetimepicker
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import BASE_URL from "../apiConfig";
import LoadingIndicator from '../LoadingIndicator';
import { useNavigation } from "@react-navigation/native";

const EventsManager = () => {
  const navigation = useNavigation();

  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "", // Add description field
    price:"",
  });
  const[fetchedEvents,setfetchedEvents]=useState([]);

  // Add state for date and time pickers
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState("date"); // State for date picker mode

  const handleDateConfirm = (event, selectedDate) => {
    const currentDate = selectedDate || newEvent.date;
    setNewEvent({ ...newEvent, date: currentDate });
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = (event, selectedTime) => {
    const currentTime = selectedTime || newEvent.time;
    setNewEvent({ ...newEvent, time: currentTime });
    setTimePickerVisibility(false);
  };

  const handleAddEvent = async() => {
    if (
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.time ||
      !newEvent.location ||
      !newEvent.description // Make sure description is not empty
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response=await axios.post(`${BASE_URL}/api/events`, newEvent);
      console.log('Events added Successfully=',response.data);
      setEvents([...events, { ...newEvent, id: response.data._id }]);
      setNewEvent({ title: "", date: "", time: "", location: "", description: "",price:""  });
      setIsModalVisible(false);
    } catch (error) {
      console.log('Error sending data to database',error);
    }
  };

  useEffect(() => {
    const fetchEvents=async()=>{
      try {
        const response = await axios.get(`${BASE_URL}/api/events`);
        const eventsData = response.data;

        // Filter out events that have already occurred
        const upcomingEvents = eventsData.filter(event => {
          const eventDate = new Date(event.date);
          const currentDate = new Date();
          return eventDate >= currentDate;
        });

        // Sort upcoming events by date
        const sortedUpcomingEvents = upcomingEvents.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        });
        setEvents(sortedUpcomingEvents);
      }
      catch(error){
        console.error('Error fetching events:', error);
        // Handle error (e.g., show error message to user)
      }
    }
    fetchEvents()
  }, [])
  

  //Rendering the events
  const renderEvent = ({ item }) => {
    // Split the description into words
    const descriptionWords = item.description.split(' ');
    // Extract the first 3-4 words
    const truncatedDescription = descriptionWords.slice(0, 3).join(' ')+'  .......';

    // Format date
    const eventDate = new Date(item.date);
    const formattedDate = eventDate.toDateString(); // Convert date to a readable string format

    // Format time
    const eventTime = new Date(item.time);
    const formattedTime = eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Convert time to a readable string format

    return(
      <TouchableOpacity onPress={()=>EventPressed(item)}>
        <View style={styles.eventItem} >
          <Text style={styles.eventTitle}>{item.title}</Text>
          <View style={{alignSelf:'flex-end'}}>
            <Image source={require('../ProfileScreen/assets/arrow.png')} style={{width:20,height:20,marginBottom:-32,marginRight:15,opacity:0.4}}/>
          </View>
          <Text>{`Date: ${formattedDate}, Time: ${formattedTime}`}</Text>
          <Text>{`Location: ${item.location}`}</Text>
          <Text>{`Description: ${truncatedDescription}`}</Text> 
          <Text>{`Amount: ${item.price}`}</Text> 
        </View>
      </TouchableOpacity>
    )}

  //redirecting to another page for payments and all
  const EventPressed =(event)=>{
    const { title, date, time, location, description,price } = event;
    navigation.navigate('PaymentPage', { title, date, time, location, description,price });
    console.log("Event Pressed4")
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item, index) => item._id || index.toString()}
      />

      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Event</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Event Title"
            value={newEvent.title}
            onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
          />

          {/* Date Picker */}
          <TouchableOpacity onPress={() => {setDatePickerMode("date"); setDatePickerVisibility(true)}}>
            <Text style={{ fontSize: 18,paddingBottom:8}} >
              <Fontisto name="date" size={24} color="black" />
              {newEvent.date ? newEvent.date.toDateString() : "Select Date"}
            </Text>
          </TouchableOpacity>
          {isDatePickerVisible && (
            <DateTimePicker
              value={newEvent.date ? newEvent.date : new Date()}
              mode={datePickerMode}
              display="default"
              onChange={handleDateConfirm}
            />
          )}

          {/* Time Picker */}
          <TouchableOpacity onPress={() => {setDatePickerMode("time"); setTimePickerVisibility(true)}}>
            <Text style={{ fontSize: 18,paddingBottom:8}}>
              <AntDesign name="clockcircleo" size={24} color="black"/>
              {newEvent.time ? newEvent.time.toLocaleTimeString() : "Select Time"}
            </Text>
          </TouchableOpacity>
          {isTimePickerVisible && (
            <DateTimePicker
              value={newEvent.time ? newEvent.time : new Date()}
              mode="time"
              display="default"
              onChange={handleTimeConfirm}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Location"
            value={newEvent.location}
            onChangeText={(text) =>
              setNewEvent({ ...newEvent, location: text })
            }
          />
          
          {/* Description Input */}
          <TextInput
            style={styles.inputdescription}
            placeholder="Description"
            value={newEvent.description}
            onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
            multiline={true} // Set multiline to true
          />

          <TextInput
            style={styles.input}
            placeholder="Amount You want to keep 💲"
            value={newEvent.price}
            onChangeText={(text) =>
              setNewEvent({ ...newEvent, price: text })
            }
          />

          <View style={{ flexDirection: "row", gap: 40 }}>
            <Button title="Add Event" onPress={handleAddEvent} />
            <Button
              title="Cancel"
              color="#841584"
              onPress={() => setIsModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  eventItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderBottomWidth:1,
    borderBottomColor:'lightgray',
  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: "tomato",
    padding: 10,
    // marginTop: 60,
    width: 60,
    height: 60,
    borderRadius: 50,
    alignSelf: "flex-end",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    // color:'tomato'
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: "80%",
  },
  inputdescription:{
    height:140,
    width:"80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top', // Align placeholder text to the top
  },
});

export default EventsManager;
