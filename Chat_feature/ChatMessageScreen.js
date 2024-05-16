import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, {
  useState,
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import { UserType } from "../userContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import BASE_URL from "../apiConfig";

const ChatMessageScreen = () => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [recipientData, setrecipientData] = useState();
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState("");
  const route = useRoute();
  const { recipientId } = route.params;
  const [message, setMessage] = useState("");
  const { userId, setUserId } = useContext(UserType);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const fetchMessages = async () => {
    console.log('I am inside chatmessagescreen.js');
    console.log('recipient Id is=',recipientId);
    try {
      const response = await fetch(
        `${BASE_URL}/messages/${userId}/${recipientId}`
        // `http://192.168.137.195:8000/messages/${userId}/${recipientId}`
      );
      if (!response.ok) {
        // Handle non-OK responses
        console.error(`Error fetching messages. Status: ${response.status}`);
        return;
      }
      const data = await response.json();
      // console.log("Full response:", data);
      if (response.ok) {
        console.log("Is response OK?", response.ok);
        // console.log("data=", data);
        setMessages(data);
      } else {
        console.log("error showing messags", response.status.message);
      }
    } catch (error) {
      console.log("error fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchrecipientData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/user/${recipientId}`
          // `http://192.168.137.195:8000/user/${recipientId}`
        );

        const data = await response.json();
        // console.log("Fetched messages after fetchingrecipientdata:", data); // Add this log
        setrecipientData(data);
      } catch (error) {
        console.log("error retrieving details", error);
      }
    };

    fetchrecipientData();
  }, [recipientId]);


  const handleSend = async (messageType, imageUri, imageName) => {
    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("recipientId", recipientId);

      //if the message type id image or a normal text
      if (messageType === "image") {
        formData.append("messageType", "image");

        const fileExtension = imageName ? imageName.split(".").pop() : "";

        const file = {
          uri: imageUri,
          name: imageName, // Use the same name obtained from the image picker
          type: `image/${fileExtension}`,
        };

        console.log("file is after file name", file);
        formData.append("imageFile", file);
      } else {
        formData.append("messageType", "text");
        formData.append("messageText", message);
      }

      const response = await fetch(`${BASE_URL}/messages`, {
        // const response=await fetch("http://192.168.137.195:8000/messages",{
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Handle errors
        if (response.status === 401) {
          console.log("Unauthorized");
        } else {
          console.log(
            "Error in sending the message from chatmessagescreen:",
            response.statusText
          );
        }
      } else {
        setMessage("");
        setSelectedImage("");
        fetchMessages();
      }
    } catch (error) {
      console.log("Error in sending the message:", error);
    }
  };

  // console.log("Message=", selectedMessages);


  const deleteMessages = async (messageIds) => {
    try {
      const response = await fetch(
        `${BASE_URL}/deleteMessages`,
        // "http://http://192.168.137.195:8000/deleteMessages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: messageIds }),
        }
      );

      if (response.ok) {
        setSelectedMessages((prevSelectedMessages) =>
          prevSelectedMessages.filter((id) => !messageIds.includes(id))
        );

        fetchMessages();
      } else {
        console.log("error deleting messages", response.status);
      }
    } catch (error) {
      console.log("error deleting messages", error);
    }
  };

  //for time function
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  //for image function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [16, 9],
      quality: 1,
    });

    console.log("image picker result", result);
    // console.log('image result uri',result.uri.file);
     // Check if 'assets' array exists in 'result' and has at least one item
  if (result && result.assets && result.assets.length > 0 && result.assets[0].uri) {
    const { uri, name } = result.assets[0];
    console.log("URI:", uri);
    const imageName = name || uri.split("/").pop(); // Use 'name' if available, otherwise extract from URI
    console.log("Image Name:", imageName);
    handleSend("image", uri, imageName);
  } else {
    console.error("No valid URI found in image picker result:", result);
  }
  };



  const handleSelectMessage = (message) => {
    //check if the message is already selected
    const isSelected = selectedMessages.includes(message._id);

    if (isSelected) {
      setSelectedMessages((previousMessages) =>
        previousMessages.filter((id) => id !== message._id)
      );
    } else {
      setSelectedMessages((previousMessages) => [
        ...previousMessages,
        message._id,
      ]);
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <View style={styles.topbar}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back-circle-sharp"
          size={35}
          color="black"
          style={{ marginTop: 18, paddingTop: 18 }}
        />
        {selectedMessages.length > 0 ? (
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              marginLeft: 150,
              gap: 10,
            }}
          >
            <Ionicons name="arrow-redo" size={24} color="black" />
            <Ionicons name="arrow-undo" size={24} color="black" />
            <FontAwesome name="star" size={24} color="black" />
            <MaterialIcons
              onPress={() => deleteMessages(selectedMessages)}
              name="delete"
              size={24}
              color="black"
            />
          </View>
        ) : null}

        {selectedMessages.length > 0 ? (
          <View>
            <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 30 }}>
              {selectedMessages.length}
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 18,
              paddingTop: 18,
              paddingLeft: 12,
              gap: 2,
            }}
          >
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: "cover",
              }}
              source={{ uri: recipientData?.image }}
              // onPress={() => navigation.navigate('Profile')}
            />

            <Text
              style={{ marginLeft: 5, fontSize: 18, fontWeight: "bold" }}
              // onPress={() => navigation.navigate('Profile',[recipientData.name,recipientData.email,recipientData._id],recipientData.image,recipientData.number,recipientData.occupation)}
              onPress={()=>console.log('You clicked  the author!')}
            >
              {recipientData?.name}
            </Text>
          </View>
        )}
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={handleContentSizeChange}
      >
        {messages.map((item, index) => {
          if (item.messageType === "text") {
            const isSelected = selectedMessages.includes(item._id);
            return (
              <Pressable
                onLongPress={() => handleSelectMessage(item)}
                key={index}
                style={[
                  item?.senderId?._id === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },

                  isSelected && { width: "100%", backgroundColor: "#F0FFFF" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 13,
                    textAlign: isSelected ? "right" : "left",
                  }}
                >
                  {item?.message}
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 9,
                    color: "gray",
                    marginTop: 5,
                  }}
                >
                  {formatTime(item.timeStamp)}
                </Text>
              </Pressable>
            );
          }

          if (item.messageType === "image") {
            const baseUrl = "/react/alumni_app/backend_api/files/";
            const imageUrl = item.imageUrl;
            const filename = imageUrl.split("/").pop();
            const fileExtension = filename.split(".").pop();
            
               const source = { uri: baseUrl + filename}; 
            
            // const source = {
            //   uri: `${baseUrl}${filename}`,
            //   type: `image/${fileExtension}`,
            // };
            return (
              <Pressable
                key={index}
                style={[
                  item?.senderId?._id === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },
                ]}
              >
                <View>
                  <Image
                    source={source}
                    style={{ width: 200, height: 200, borderRadius: 7 }}
                  />
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 9,
                      position: "absolute",
                      right: 10,
                      bottom: 7,
                      color: "white",
                      marginTop: 5,
                    }}
                  >
                    {formatTime(item?.timeStamp)}
                  </Text>
                </View>
              </Pressable>
            );
          }
        })}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: showEmojiSelector ? 0 : 15,
        }}
      >
        <Entypo
          onPress={handleEmojiPress}
          style={{ marginRight: 5 }}
          name="emoji-happy"
          size={24}
          color="gray"
        />

        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type Your message..."
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 8,
          }}
        >
          <Entypo onPress={pickImage} name="camera" size={24} color="gray" />

          <Feather name="mic" size={24} color="gray" />
        </View>

        <Pressable
          onPress={() => handleSend("text")}
          style={{
            backgroundColor: "#007bff",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
        </Pressable>
      </View>

      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          style={{ height: 250 }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatMessageScreen;

const styles = StyleSheet.create({
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
});
