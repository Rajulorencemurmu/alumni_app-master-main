

import { ScrollView, StyleSheet, Text, View ,TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Games = () => {
  const navigation=useNavigation();
  return (
      <ScrollView>
          <TouchableOpacity style={{paddingLeft:16,marginTop:25,paddingRight:16}} onPress={()=>navigation.navigate('GuessTheNumber')}>
          <Image source={require('../ProfileScreen/assets/guessnumber.png')} style={{width:46,height:46, alignSelf:'flex-end',marginBottom:-30}}/>
          <Text style={{fontSize:20,borderBottomWidth:0.3,paddingBottom:13,fontWeight:400}}>Guess the Number</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{paddingLeft:16,marginTop:25,paddingRight:16}} onPress={()=>navigation.navigate('TicTacToe')}>
          <Image source={require('../ProfileScreen/assets/tictactoe.png')} style={{width:46,height:46, alignSelf:'flex-end',marginBottom:-29}}/>
          <Text style={{fontSize:20,borderBottomWidth:0.3,paddingBottom:13,fontWeight:400}}>Tic Tac Toe</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{paddingLeft:16,marginTop:25,paddingRight:16}} onPress={()=>navigation.navigate('Game2048')}>
          <Image source={require('../ProfileScreen/assets/game2048.png')} style={{width:46,height:46, alignSelf:'flex-end',marginBottom:-29}}/>
          <Text style={{fontSize:20,borderBottomWidth:0.3,paddingBottom:13,fontWeight:400}}>2048</Text>
          </TouchableOpacity>
      </ScrollView>
  )
}

export default Games

const styles = StyleSheet.create({})