import React from 'react';
import {View} from 'react-native';

import styles from './style';

export default props => {
  return (
    <View style={styles.container}>
      <View style={styles.flag} />
      <View style={styles.flagpole} />
      <View style={styles.smallerBase} />
      <View style={styles.largerBase} />
    </View>
  );
};
