import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import params from './src/params';
import MineField from './src/components/MineField';
import {createMinedBoard} from './src/services/boardManagerService';

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
    };
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
          <MineField board={this.state.board} />
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
