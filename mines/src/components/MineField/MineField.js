import React from 'react';
import {View} from 'react-native';

import styles from './styles';
import Field from '../Field';

export default props => {
  const rows = props.board.map((row, rowIndex) => {
    const columns = row.map((fieldInformation, fieldIndex) => {
      return <Field {...fieldInformation} key={fieldIndex} />;
    });
    return (
      <View key={rowIndex} style={styles.columnStyle}>
        {columns}
      </View>
    );
  });
  return <View style={styles.container}>{rows}</View>;
};
