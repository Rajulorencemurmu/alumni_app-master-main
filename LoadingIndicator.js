import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const LoadingIndicator = ({ visible }) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]); // Update visibility state when prop changes

  if (!isVisible) return null;

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color="tomato" size="large"/>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
    // marginTop:10,
  },
});

export default LoadingIndicator;
