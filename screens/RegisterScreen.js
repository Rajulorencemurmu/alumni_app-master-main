import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import BASE_URL from "../apiConfig";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker"; // Import Picker component
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const occupations = ["Student", "Professor", "Alumni"];

const batch = [
  "2011-2014",
  "2012-2015",
  "2013-2016",
  "2014-2017",
  "2015-2018",
  "2016-2019",
  "2017-2020",
  "2018-2021",
  "2019-2022",
  "2020-2023",
  "2021-2024",
];

const RegisterScreen = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState(null);
  const [occupation, setOccupation] = useState("Student");
  const [workingPlace, setWorkingPlace] = useState("");
  const [batches, setBatches] = useState([]); // Add state for batch selection
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  const handleRegister = async () => {
    setLoading(true);
    let location = await Location.getCurrentPositionAsync({});

    const user = {
      name: name,
      email: email,
      password: password,
      number: number,
      image: image,
      occupation: occupation,
      ...(occupation === "Alumni" && { workingPlace }), // Include working place for alumni
      // ...(occupation === "Alumni" && { batch }), // Include batch for alumni
      // ...(occupation === "Student" && {batch}),// include batch for student as well
      batches, // Include batch for all occupations
      location: {
        type: "Point",
        coordinates: [location.coords.longitude, location.coords.latitude],
      },
    };

    axios
      .post(`${BASE_URL}/register`, user)
      .then((response) => {
        console.log("Server response", response);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
        setNumber("");
        setImage(null);
        setWorkingPlace("");
        setBatches(""); // Clear batch selection after registration
        navigation.navigate("Login_Screen");
      })
      .catch((error) => {
        console.log("Axios Error", error);
        console.log("Axios Error Response", error.response);
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log("Image picked is=", result);

      if (!result.cancelled) {
        const pickedImageUri = result.assets[0].uri;
        setImage(pickedImageUri);
        console.log("Final image=", pickedImageUri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {/* <KeyboardAvoidingView behavior="position" enabled> */}
            <View
              style={{
                height: 280,
                width: 280,
                borderRadius: 150,
                backgroundColor: "#DCFFB7",
                position: "absolute",
                left: -130,
                top: -50,
              }}
            ></View>
            <View style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:25}}>
            <Text style={styles.title01}>Register</Text>
            <Text style={styles.title4}>Here</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your Name*"
              onChangeText={setName}
              value={name}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email*"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your Password*"
              onChangeText={setPassword}
              value={password}
              autoCapitalize="none"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              onChangeText={setNumber}
              value={number}
              placeholder="Your Phone number"
              keyboardType="numeric"
            />
            <Text style={styles.subtitle}>Select Occupation:</Text>
            <Picker
              selectedValue={occupation}
              style={{ height: 50, width: "100%", marginTop: 10 }}
              onValueChange={(itemValue) => setOccupation(itemValue)}
            >
              {occupations.map((occ) => (
                <Picker.Item key={occ} label={occ} value={occ} />
              ))}
            </Picker>

            {occupation === "Student" && (
              <>
                <Text style={styles.subtitle}>Select Batch:</Text>
                <Picker
                  selectedValue={batches}
                  style={{ height: 50, width: "100%", marginTop: 10 }}
                  onValueChange={(itemValue) => setBatches(itemValue)}
                >
                  <Picker.Item label="Select Batch" value="" />
                  {batch.map((b) => (
                    <Picker.Item key={b} label={b} value={b} />
                  ))}
                </Picker>
              </>
            )}

            {occupation === "Alumni" && (
              <>
                <Text style={styles.subtitle}>Select Batch:</Text>
                <Picker
                  selectedValue={batches}
                  style={{ height: 50, width: "100%", marginTop: 10 }}
                  onValueChange={(itemValue) => setBatches(itemValue)}
                >
                  <Picker.Item label="Select Batch" value="" />
                  {batch.map((b) => (
                    <Picker.Item key={b} label={b} value={b} />
                  ))}
                </Picker>
                <TextInput
                  style={styles.input}
                  onChangeText={setWorkingPlace}
                  value={workingPlace}
                  placeholder="Enter Working Place or Company"
                  autoCapitalize="none"
                />
              </>
            )}

            <TouchableOpacity style={styles.pickimgbtn} onPress={pickImage}>
              <Text style={styles.Pickimg}>Pick Image</Text>
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, marginTop: 10 }}
              />
            )}

            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="tomato" />
              </View>
            )}

            <TouchableOpacity
              style={styles.loginwithpass}
              onPress={() => {
                handleRegister();
              }}
            >
              <Text style={styles.otpButton}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:'flex-end',borderBottomWidth:1,borderBottomColor:'blue'}} onPress={()=>{navigation.navigate('Login_Screen')}}>
          <Text style={{color:'blue'}}>User Login</Text>
        </TouchableOpacity>
          {/* </KeyboardAvoidingView> */}
          <View
              style={{
                height: 250,
                width: 250,
                borderRadius: 150,
                backgroundColor: "#7BD3EA",
                // position: "absolute",
                // top: 50,
                left:180,
              }}
            ></View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 2,
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
    color: "#000",
  },
  title3: {
    fontSize: 38,
    color: "#000",
  },
  title01:{
    fontSize: 40,
    color: "tomato",
    fontWeight: "bold",
  },
  title4: {
    fontSize: 25,
    color: "#000",
    fontWeight: "bold",
    // marginTop: 60,
    // marginLeft: 60,
    // paddingBottom: 40,
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
    marginTop: 10,
  },
  pickimgbtn: {
    width: 100,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
    // backgroundColor: "tomato",
    borderWidth:1,
    padding: 7,
    marginTop: 8,
  },
  Pickimg: {
    // color: "white",
    fontWeight: "bold",
  },
  otpButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  otpButtonText: {
    // color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginwithpass: {
    backgroundColor: "tomato",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    // borderWidth:1,
    // padding:10,
    marginTop: 20,
    width: 200,
    height: 50,
    marginLeft: 50,
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
