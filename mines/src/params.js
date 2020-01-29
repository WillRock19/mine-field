import {Dimensions} from 'react-native';

const params = {
  blockSize: 30,
  borderSize: 5,
  fontSize: 15,
  percentageHeaderHeightOnScreen: 0.15,
  percentageOfMinesOnBattlefield: 0.1,
  getColumnAmount() {
    const screenWidth = Dimensions.get('window').width;
    return Math.floor(screenWidth / this.blockSize);
  },
  getRowAmount() {
    const screenHeight = Dimensions.get('window').height;
    const percentagemScreenWithoutHeader = (1 - this.percentageHeaderHeightOnScreen);
    const boardHeight = screenHeight * percentagemScreenWithoutHeader;
    return Math.floor(boardHeight / this.blockSize);
  },
};

export default params;
