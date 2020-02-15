import React from 'react';
import {View} from 'react-native';

import styles from './styles';
import Field from '../Field';

const renderColumns = (row, rowIndex, onOpenField) => {
  const columns = row.map((fieldInformation, fieldIndex) => {
    return (
      <Field
        {...fieldInformation}
        key={fieldIndex}
        onOpen={() => onOpenField(rowIndex, fieldIndex)}
      />
    );
  });

  return (
    <View key={rowIndex} style={styles.columnStyle}>
      {columns}
    </View>
  );
};

const renderRowsWithColumns = (board, onOpenField) => {
  return board.map((row, rowIndex) => {
    return renderColumns(row, rowIndex, onOpenField);
  });
};

const renderField = props => {
  const rowsWithColumns = renderRowsWithColumns(props.board, props.onOpenField);
  return <View style={styles.container}>{rowsWithColumns}</View>;
};

export default props => {
  return renderField(props);
};
