import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import params from './src/params';
import Field from './src/components/Field';

export default class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading Mine's game...</Text>
        <Text style={styles.instructions}>
          Size of the battlefield: {params.getRowAmount()}x
          {params.getColumnAmount()}
        </Text>
        <Field />
        <Field opened />
        <Field opened nearMines={1} />
        <Field opened nearMines={2} />
        <Field opened nearMines={3} />
        <Field opened nearMines={6} />
        <Field isMined opened />
        <Field isMined opened exploded />
        <Field hasFlag />
        <Field hasFlag opened />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
  },
});
