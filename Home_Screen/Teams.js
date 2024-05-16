import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'

const Teams = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Raju Lorence Murmu',
      role: 'Student',
      bio: 'Hey, I am 3rd year Under Graduate passionate about learning new things, hobbies are reading mangas.',
      image: require('../ProfileScreen/assets/raju.jpeg'),
    },
    {
      id: 2,
      name: 'Roshan Raj',
      role: 'Student',
      bio: 'Hey, I am 3rd year Under Graduate passionate about learning new stuff like web dev, devops.',
      image: require('../ProfileScreen/assets/roshan.jpeg'),
    },
    // Add more team members as needed
  ];
  return (
    <ScrollView contentContainerStyle={styles.container}>
    {teamMembers.map((member) => (
      <TouchableOpacity key={member.id} style={styles.memberContainer}>
        <Image source={member.image} style={styles.image} />
        <View style={styles.memberInfo}>
          <Text style={styles.name}>{member.name}</Text>
          <Text style={styles.role}>{member.role}</Text>
          <Text style={styles.bio}>{member.bio}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
  )
}

export default Teams

const styles = StyleSheet.create({ container: {
  flexGrow: 1,
  alignItems: 'center',
  paddingVertical: 20,
},
memberContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
  paddingHorizontal: 10,
},
image: {
  width: 100,
  height: 100,
  borderRadius: 50,
  marginRight: 20,
},
memberInfo: {
  flex: 1,
},
name: {
  fontSize: 18,
  fontWeight: 'bold',
},
role: {
  fontSize: 16,
  color: '#888',
  marginBottom: 5,
},
bio: {
  fontSize: 14,
  lineHeight: 20,
},
});