import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const BOARD_SIZE = 4;

const colors = {
  '2': '#eee4da',
  '4': '#ede0c8',
  '8': '#f2b179',
  '16': '#f59563',
  '32': '#f67c5f',
  '64': '#f65e3b',
  '128': '#edcf72',
  '256': '#edcc61',
  '512': '#edc850',
  '1024': '#edc53f',
  '2048': '#edc22e',
};

const Game2048 = () => {
  const [board, setBoard] = useState(Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0)));

  useEffect(() => {
    addRandomTile();
    addRandomTile();
  }, []);

  const addRandomTile = () => {
    const newBoard = [...board];
    const emptyTiles = [];
    newBoard.forEach((row, i) => {
      row.forEach((tile, j) => {
        if (tile === 0) {
          emptyTiles.push({ x: i, y: j });
        }
      });
    });
    const randomIndex = Math.floor(Math.random() * emptyTiles.length);
    const { x, y } = emptyTiles[randomIndex];
    newBoard[x][y] = Math.random() < 0.9 ? 2 : 4;
    setBoard(newBoard);
  };

  const swipeLeft = () => {
    const newBoard = [...board];
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 1; j < BOARD_SIZE; j++) {
        let k = j;
        while (k > 0) {
          if (newBoard[i][k - 1] === 0) {
            newBoard[i][k - 1] = newBoard[i][k];
            newBoard[i][k] = 0;
          } else if (newBoard[i][k - 1] === newBoard[i][k]) {
            newBoard[i][k - 1] *= 2;
            newBoard[i][k] = 0;
            break;
          } else {
            break;
          }
          k--;
        }
      }
    }
    setBoard(newBoard);
    addRandomTile();
  };

  // Implement swipeRight, swipeUp, and swipeDown functions similarly

  const renderBoard = () => {
    return board.map((row, i) => (
      <View key={i} style={styles.row}>
        {row.map((tile, j) => (
          <TouchableOpacity key={j} style={[styles.tile, { backgroundColor: colors[tile.toString()] }]}>
            <Text style={styles.tileText}>{tile !== 0 ? tile.toString() : ''}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>2048 Game</Text>
      <View style={styles.board}>{renderBoard()}</View>
      <TouchableOpacity style={styles.button} onPress={swipeLeft}>
        <Text style={styles.buttonText}>Swipe Left</Text>
      </TouchableOpacity>
      {/* Add buttons for other directions */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#faf8ef',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
  },
  tile: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#776e65',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#8f7a66',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Game2048;
