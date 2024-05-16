import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useEffect,useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,ActivityIndicator, Image,
  Pressable
} from "react-native";
import { UserType } from "../userContext";
import { useContext } from "react";
import jwtDecode from "jwt-decode";
import { decode as base64decode } from "base-64";
import BASE_URL from "../apiConfig";


const AdminLogin = () => {
    global.atob = base64decode;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // State variable to manage loading state
  
    const navigation = useNavigation();
    const { setUserId } = useContext(UserType);
    const handleSubmitRequest=async()=>{
        const user = {
            email: email,
            password: password,
          };
          setLoading(true);

          try {
            const response = await axios.post(`${BASE_URL}/admin/login`, user);
            console.log("Server response =",response)
            if (response.data) {
                // Log the entire response data to inspect its structure
                console.log("Response data:", response.data);

                await new Promise(resolve => setTimeout(resolve, 2000));

        
                // Check if 'token' is present in the response data
                if ("token" in response.data) {
                  const token = response.data.token;
        
                  console.log('Token is =',token);
                  // Decode the Base64 token to get the user ID
                  const decodedToken = JSON.parse(atob(token.split(".")[1]));
        
                  if (decodedToken.userId) {
                    // Extract user name from the decoded token
                    const userName = decodedToken.name;
        
                    // Set the user ID in the context after successful login
                    setUserId(decodedToken.userId);
                    console.log("UserId set to:", decodedToken.userId);
                      // Generate route parameters with the user name
              const routeParameters = {
                user: {
                  id: decodedToken.userId,
                  name: userName,
                },
              };

            AsyncStorage.setItem("authToken", token);
            // navigation.navigate("Home_Screen",routeParameters);
            navigation.navigate("Admin");
          } else {
            console.log("Error: userId not found in the decoded token");
            Alert.alert("Login Error", "Invalid response from the server");
          }
        } else {
          console.log("Error: token not found in the response data");
          Alert.alert("Login Error", "Invalid response from the server");
        }
      } else {
        console.log("Error: Empty response data");
        Alert.alert("Login Error", "Invalid response from the server");
      }

          }catch(error){
            console.log("Error during login:", error.message);
            Alert.alert(
                "Login Error",
                "An error occurred while processing your request"
            );
          }
          setLoading(false);
    }

      

  return (
    <View style={styles.container}>
    {/* <Image src="connecting.png" style={{height:54,width:44,}}/> */}
      <KeyboardAvoidingView behavior="position" enabled>
        <Text style={styles.title2}>ADMIN</Text>
        <Text style={styles.title3}>LOGIN</Text>
        
        <Text style={styles.title4}>Let's get Started</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email*"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password*"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          autoCapitalize="none"
        />
            {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="tomato" />
          </View>
        )}  
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            handleSubmitRequest();
          }}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignSelf:'flex-end',marginTop:14,borderBottomWidth:1,borderBottomColor:'blue'}} onPress={()=>{navigation.navigate('Login_Screen')}}>
          <Text style={{color:'blue'}}>User Login</Text>
        </TouchableOpacity>

        </KeyboardAvoidingView>
        </View>
  )
}

export default AdminLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 30,
        paddingTop: 50,
      },
      loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255,255,255,0.7);",
        justifyContent: "center",
        alignItems: "center",
      },
      title2: {
        fontSize: 50,
        fontWeight: "800",
       alignSelf:'center',
        color:'tomato',
        
        marginTop: 130,
      },
      title3: {
        fontSize: 38,
        color: "#000",
        alignSelf:'center',
      },
      title4: {
        fontSize: 25,
        color: "#000",
        fontWeight: "bold",
        marginTop: 60,
        alignSelf:'center',
      },
      subtitle: {
        fontSize: 18,
        color: "#666",
        marginTop: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 20,
      },
      submitButton: {
        backgroundColor: "tomato",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        marginTop: 20,
        width: 150,
        height: 50,
        alignSelf:'center',
      },
      submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
      loginwithpass: {
        backgroundColor: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
      },
      loginwithpass1: {
        color: "#007BFF",
        fontWeight: "bold",
        fontSize: 15,
      },
      btnlogin: {
        backgroundColor: "none",
      },
      googleButton: {
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        borderWidth: 1,
        padding: 15,
        marginTop: 20,
      },
      googleButtonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
      },
})