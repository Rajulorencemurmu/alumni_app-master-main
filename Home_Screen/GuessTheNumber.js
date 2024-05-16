import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

const GuessTheNumber = () => {
  const [guess, setGuess] = useState('');
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [feedback, setFeedback] = useState('');

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function handleGuess() {
    const guessedNumber = parseInt(guess);
    if (isNaN(guessedNumber)) {
      Alert.alert('Invalid Input', 'Please enter a valid number.');
      return;
    }
    if (guessedNumber === randomNumber) {
      setFeedback('Congratulations! You guessed the number!');
      setRandomNumber(generateRandomNumber());
    } else if (guessedNumber < randomNumber) {
      setFeedback('Try a higher number.');
    } else {
      setFeedback('Try a lower number.');
    }
    setGuess('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Number Guessing Game</Text>
      <Text>Guess a number between 1 and 100:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setGuess(text)}
        value={guess}
        keyboardType="numeric"
      />
      <Button title="Guess" onPress={handleGuess} />
      {feedback !== '' && <Text style={styles.feedback}>{feedback}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 200,
    textAlign: 'center',
  },
  feedback: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GuessTheNumber;


