import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { UserType } from "../userContext";
import { useNavigation } from "@react-navigation/native";
import BASE_URL from "../apiConfig";

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
    console.log("Image in friendRequest.js=",item.image);
    console.log("name in friendRequest.js=",item.name);
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const acceptRequest = async (friendRequestId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/friendRequest/accept`,
        // "http://192.168.137.195:8000/friendRequest/accept",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: friendRequestId,
            recipientId: userId,
          }),
        }
      );

      if (response.ok) {
        setFriendRequests(
          friendRequests.filter((request) => request._id !== friendRequestId)
        );
        navigation.navigate("Chats");
      }
    } catch (err) {
      console.log("error accepting the friend request", err);
    }
  };
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding:6,
      }}
    >
    
      <Image
        style={{ width: 45, height: 45, borderRadius: 25 }}
        source={{ uri: item.image }}
      />

      <Text
        style={{fontWeight:'bold',fontSize:15}}
      >
        {item?.name} sent you a friend request!!
      </Text>

      <Pressable
        onPress={() => acceptRequest(item._id)}
        style={{ backgroundColor: "tomato", padding: 10, borderRadius: 6 }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});