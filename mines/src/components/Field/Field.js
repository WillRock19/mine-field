import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import Mine from '../Mine';

const prepareStyles = (fieldOpened, exploded) => {
  const componentStyles = [styles.field];

  if (fieldOpened) componentStyles.push(styles.opened);
  if (exploded) componentStyles.push(styles.exploded);
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

const renderNumberInsideField = (isMined, opened, nearMines) => {
  return showNumberForNearMines(isMined, opened, nearMines) ? (
    <Text style={[styles.label, {color: getMineColor(nearMines)}]}>
      {nearMines}
    </Text>
  ) : (
    false
  );
};

const renderMineInsideField = (isMined, opened) => {
  return isMined && opened ? <Mine /> : false;
};

export default props => {
  const {isMined, opened, nearMines, exploded} = props;
  const componentStyles = prepareStyles(opened, exploded);
  return (
    <View style={componentStyles}>
      {renderNumberInsideField(isMined, opened, nearMines)}
      {renderMineInsideField(isMined, opened)}
    </View>
  );
};
