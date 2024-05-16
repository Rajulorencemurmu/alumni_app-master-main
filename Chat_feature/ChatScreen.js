import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../userContext";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../Components/UserChat";
import BASE_URL from "../apiConfig";
import LoadingIndicator from '../LoadingIndicator'

const ChatScreen = () => {
  const [acceptedFriends, setAcceptedFriends ] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // State variable to manage loading

  useEffect(() => {
    const acceptedFriendsList = async () => {
    
      try {
        setLoading(true); // Set loading to true when data fetching starts
        const response = await fetch(
          `${BASE_URL}/acceptedFriends/${userId}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }  
          const data = await response.json();
          console.log("data", data);
          setAcceptedFriends(data);
      } catch (error) {
        console.log("error showing accepted friends", error);
      }
      finally {
        setLoading(false); // Set loading to false when data fetching finishes
      }
    };
    acceptedFriendsList();
  }, [userId]);
console.log('friends list',acceptedFriends);

  return (
    <View style={{ }}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {loading ? (
          <LoadingIndicator visible={loading} /> // Use LoadingIndicator component here
        ) : acceptedFriends.length === 0 ? (
          <Text style={styles.noFriendsText}>No accepted friends</Text>
        ) : (
          <Pressable>
            {acceptedFriends.map((item,index)=>(<UserChat key={index} item={item}/>))}
          </Pressable>
        )
      }
      </ScrollView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  noFriendsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "gray",
  },
});
