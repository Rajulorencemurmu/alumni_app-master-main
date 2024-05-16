import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import BASE_URL from "../apiConfig";
import { UserType } from "../userContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Map_feature = () => {
  const { userId } = useContext(UserType); // Access userId from the context

  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      // Fetch the locations of all users including the current user
      const response = await fetch(`${BASE_URL}/api/location`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentUserId: userId, // Access userId from the context
        }),
      });
      const data = await response.json();
      setAllLocations(data);
      // console.log('showing location of users in mapfeature.js',data)
    };

    getLocation();
  }, [userId]); // Add userId to dependencies to re-fetch when user changes

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="My Marker"
              description="This is my marker."
            />
          )}
          {Array.isArray(allLocations) &&
            allLocations.map((location, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: location.coordinates[1],
                  longitude: location.coordinates[0],
                }}
                title="User Location"
              />
            ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: windowWidth,
    height: windowHeight,
  },
});

export default Map_feature;
