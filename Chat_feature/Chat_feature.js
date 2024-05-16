import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Users from "../Components/Users";
import LoadingIndicator from "../LoadingIndicator"; // Import LoadingIndicator

import { decode as base64decode } from 'base-64';

import BASE_URL from '../apiConfig'

const Chat_feature = () => {
  //instead of jwtDecode i have used atob and it works fine
  global.atob = base64decode;

  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft:10,}}>USERS & FRIENDS</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 ,marginRight:10,}}>
          <Ionicons
            onPress={() => navigation.navigate("Chats")} 
            name="chatbox-ellipses-outline" size={24} color="black" />
          <MaterialIcons
            onPress={() => navigation.navigate("Friend Requests")}
            name="people-outline"
            size={24}
            color="black"
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      console.log(token);
      const [, payload] = token.split('.');
      const decodedPayload = atob(payload);

      const parsedPayload = JSON.parse(decodedPayload);
      const userId = parsedPayload.userId;

      axios
        .get(`${BASE_URL}/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("error retrieving users", error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching users
        });
    };

    fetchUsers();
  }, []);

  console.log("users", users);

  return (
    <View>
      {loading ? (
        <LoadingIndicator visible={loading} />
      ) : (
        <View style={{ padding: 10 }}>
          {users.map((item, index) => (
            <Users key={index} item={item} />
          ))}
        </View>
      )}
    </View>
  );
};

export default Chat_feature;

const styles = StyleSheet.create({});