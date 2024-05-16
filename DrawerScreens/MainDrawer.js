import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import About from './About';

const MainDrawer = () => {
    const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
    <Drawer.Screen name="About" component={About} />
    {/* <Drawer.Screen name="Article" component={Article} /> */}
  </Drawer.Navigator>
  )
}

export default MainDrawer

const styles = StyleSheet.create({})