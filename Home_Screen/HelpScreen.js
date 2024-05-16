import { useNavigation } from '@react-navigation/native';
import React,{useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const HelpScreen = () => {
   const navigation=useNavigation();
   useEffect(() => {
      navigation.setOptions({
        headerTitle: "Need Help?",
      });
    }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.sectionText}>Email: rajulorence4321@gmail.com</Text>
        <Text style={styles.sectionText}>Phone: +91 7488926331</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FAQs</Text>
        <Text style={styles.sectionText}>Q: How do I reset my password?</Text>
        <Text style={styles.sectionText}>A: You can reset your password by...</Text>
        <Text style={styles.sectionText}>Q: How do I update my account information?</Text>
        <Text style={styles.sectionText}>A: To update your account information...</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Terms and Conditions</Text>
        <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</Text>
        <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</Text>
        {/* Add more terms and conditions */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default HelpScreen;
