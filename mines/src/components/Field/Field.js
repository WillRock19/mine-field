import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';

import styles from './style';
import Mine from '../Mine';
import Flag from '../Flag';

const prepareStyles = (fieldOpened, exploded, hasFlag) => {
  const componentStyles = [styles.field];

  if (fieldOpened) componentStyles.push(styles.opened);
  if (exploded) componentStyles.push(styles.exploded);
  if (hasFlag) componentStyles.push(styles.flagged);
  if (!fieldOpened && !exploded) componentStyles.push(styles.regular);

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

const renderFlagInsideField = (hasFlag, opened) => {
  return hasFlag && !opened ? <Flag /> : false;
};

export default props => {
  const {isMined, opened, nearMines, exploded, hasFlag} = props;
  const componentStyles = prepareStyles(opened, exploded, hasFlag);
  return (
    <TouchableWithoutFeedback onPress={props.onOpen}>
      <View style={componentStyles}>
        {renderNumberInsideField(isMined, opened, nearMines)}
        {renderMineInsideField(isMined, opened)}
        {renderFlagInsideField(hasFlag, opened)}
      </View>
    </TouchableWithoutFeedback>
  );
};
