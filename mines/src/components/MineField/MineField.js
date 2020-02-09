import React from 'react';
import {View} from 'react-native';

import styles from './styles';
import Field from '../Field';

const renderColumns = (row, rowIndex) => {
  const columns = row.map((fieldInformation, fieldIndex) => {
    return <Field {...fieldInformation} key={fieldIndex} />;
  });

  return (
    <View key={rowIndex} style={styles.columnStyle}>
      {columns}
    </View>
  );
};

const renderRowsWithColumns = board => {
  return board.map((row, rowIndex) => {
    return renderColumns(row, rowIndex);
  });
};

const renderField = board => {
  const rowsWithColumns = renderRowsWithColumns(board);
  return <View style={styles.container}>{rowsWithColumns}</View>;
};

export default props => {
  return renderField(props.board);
};
