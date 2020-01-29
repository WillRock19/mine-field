import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

const prepareStyles = fieldOpened => {
  const componentStyles = [styles.field];

  if (fieldOpened) componentStyles.push(styles.opened);
  if (componentStyles.length === 1) componentStyles.push(styles.regular);

  return componentStyles;
};

const getMineColor = nearMines => {
  if (nearMines === 1) return '#2A28D7';
  if (nearMines === 2) return '#2B520F';
  if (nearMines > 2 && nearMines < 6) return '#F9060A';
  if (nearMines >= 6) return '#F221A9';
};

const showNumberForNearMines = (isMined, opened, nearMines) => {
  return !isMined && opened && nearMines > 0;
};

export default props => {
  const {isMined, opened, nearMines} = props;
  const componentStyles = prepareStyles(opened);
  return (
    <View style={componentStyles}>
      {showNumberForNearMines(isMined, opened, nearMines) ? (
        <Text style={[componentStyles.label, {color: getMineColor(nearMines)}]}>
          {nearMines}
        </Text>
      ) : (
        false
      )}
    </View>
  );
};
