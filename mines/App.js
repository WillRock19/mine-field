import React, {Component} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';

import params from './src/params';
import MineField from './src/components/MineField';
import {
  createMinedBoard,
  cloneBoard,
  openField,
  playerWonGame,
  showAllMines,
  hadExplosion,
} from './src/services/boardManagerService';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.createState();
  }

  minesAmount = () => {
    const columns = params.getColumnAmount();
    const rows = params.getRowAmount();
    return Math.ceil(columns * rows * params.percentageOfMinesOnBattlefield);
  };

  createState = () => {
    const columns = params.getColumnAmount();
    const rows = params.getRowAmount();

    return {
      board: createMinedBoard(rows, columns, this.minesAmount()),
      playerWon: false,
      playerLost: false,
    };
  };

  onOpenField = (row, column) => {
    const boardClone = cloneBoard(this.state.board);
    openField(boardClone, row, column);

    const playerLost = hadExplosion(boardClone);
    const playerWon = playerWonGame(boardClone);

    if (playerLost) {
      Alert.alert('You snease, you lose!', 'Poor little sunshine...');
    }

    if (playerWon) {
      Alert.alert('It seems we underestimated you...', 'Damn you Nappa!!!');
    }

    this.setState({board: boardClone, playerLost, playerWon});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading Mine's game...</Text>
        <Text style={styles.instructions}>
          Size of the battlefield: {params.getRowAmount()}x
          {params.getColumnAmount()}
        </Text>
        <View style={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
});
