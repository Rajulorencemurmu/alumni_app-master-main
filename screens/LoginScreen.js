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


const LoginScreen = ({item}) => {
  global.atob = base64decode;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State variable to manage loading state

  const navigation = useNavigation();
  const { setUserId } = useContext(UserType);

  //to logged in from before
 // Function to retrieve token from AsyncStorage
const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.log('Error retrieving token:', error);
    return null;
  }
};

useEffect(() => {
  const checkLoginStatus = async () => {
    try {
      const token = await getTokenFromStorage();
      // console.log('Token while verifying is =',token);
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        if(decodedToken.userId){
          setUserId(decodedToken.userId);
          
        // Token found, navigate to Home_Screen
        navigation.replace('Home_Screen');
        }
        else{
           // Invalid token, navigate to Login_Screen
           navigation.navigate('Login_Screen');
        }
      } else {
        // Token not found, continue with login
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  checkLoginStatus();
}, []);

  // ...


  
  const handleSubmitRequest = async () => {
    const user = {
      email: email,
      password: password,
    };

    setLoading(true); // Set loading to true when login process starts

    try {
      const response = await axios.post(`${BASE_URL}/login`, user);
      // const response = await axios.post("http://192.168.137.195:8000/login", user);

      console.log("Server response", response);

       // Simulate login process delay (remove this line in actual implementation)
       await new Promise(resolve => setTimeout(resolve, 2000));

      if (response.data) {
        // Log the entire response data to inspect its structure
        console.log("Response data:", response.data);

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
            navigation.navigate("Home_Screen",routeParameters);
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
    } catch (error) {
      console.log("Error during login:", error.message);
      Alert.alert(
        "Login Error",
        "An error occurred while processing your request"
      );
    }
    setLoading(false); // Set loading to false when login process ends
  };



  
  return (
    <View style={styles.container}>
    {/* <Image src="connecting.png" style={{height:54,width:44,}}/> */}
      <KeyboardAvoidingView behavior="position" enabled>
        <Text style={styles.title1}>My</Text>
        <Text style={styles.title2}>ALUMNI</Text>
        <Text style={styles.title3}>NETWORK</Text>
        
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

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            handleSubmitRequest();
          }}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="tomato" />
          </View>
        )}

      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => {
          navigation.navigate("Register_Screen");
        }}
      >
        <Text style={styles.googleButtonText}>Create New Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{alignSelf:'flex-end',marginTop:14,borderBottomWidth:1,borderBottomColor:'blue'}} onPress={()=>{navigation.navigate('AdminLogin')}}>
          <Text style={{color:'blue'}}>Admin Login</Text>
        </TouchableOpacity>

      
    </View>
  );
};

export default LoginScreen;

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
  title1: {
    fontSize: 38,
    color: "#000",
    marginTop: 130,
  },
  title2: {
    fontSize: 40,
    fontWeight: "800",
    // color: "#000",
    color:'tomato',
  },
  title3: {
    fontSize: 38,
    color: "#000",
  },
  title4: {
    fontSize: 25,
    color: "#000",
    fontWeight: "bold",
    marginTop: 60,
    marginLeft: 50,
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
    // padding:10,
    marginTop: 20,
    width: 200,
    height: 50,
    marginLeft: 50,
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
});
