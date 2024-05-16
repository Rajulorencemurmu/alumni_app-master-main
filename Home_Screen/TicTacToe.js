import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    checkWinner();
  }, [board]);

  const handlePress = (index) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        Alert.alert('Game Over', `Player ${board[a]} wins!`);
        break;
      }
    }
  };

  const renderSquare = (index) => {
    return (
      <TouchableOpacity style={styles.square} onPress={() => handlePress(index)}>
        <Text style={styles.squareText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer('X');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.board}>
        {board.map((value, index) => (
          <View key={index}>{renderSquare(index)}</View>
        ))}
      </View>
      <Text style={styles.turn}>Player {currentPlayer}'s turn</Text>
      <Button title="Reset Game" onPress={resetGame} />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 180,
  },
  square: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  turn: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TicTacToe;