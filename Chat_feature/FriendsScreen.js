import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

import { UserType } from "../userContext";
import FriendRequests from "../Components/FriendRequests";
import { useNavigation } from "@react-navigation/native";
// import Header from "./Header";
import BASE_URL from "../apiConfig";

const FriendsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [friendRequests, setFriendRequests] = useState([]);
const navigation=useNavigation()
  useEffect(() => {
    fetchFriendRequest();
  }, []);

  // Fetch friend requests for the current logged in user.
  const fetchFriendRequest = async () => {
    try {
      if (!userId) {
        console.log("UserId is not available");
        return;
      }
      console.log("Current UserId in React Native:", userId);
      const url = `${BASE_URL}/friendRequest/${userId}`;
    //  const url=` http://192.168.137.195:8000/friendRequest/${userId}`;
      console.log("Requesting friend requests from:", url);

      const response = await axios.get(url);

      if (Array.isArray(response.data)) {
        const friendRequestData = response.data.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.image,
        }));
        setFriendRequests(friendRequestData);
      } else {
        console.log("Invalid response data:", response.data);
      }
    } catch (error) {
      console.log("Error in Fetching Friend Requests:", error.message);
    }
  };

  console.log(friendRequests);

  return (
    <ScrollView>
    <View style={styles.topbar}><Text style={styles.friendreq}></Text>
    </View>
    {friendRequests.length === 0 ? (
        <Text style={styles.noRequests}>No friend requests</Text>
      ) : (

        <View style={{}}>
      {friendRequests.map((item, index) => (
        <FriendRequests
          key={index}
          item={item}
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
          />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  noRequests: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "gray",
  },
});
