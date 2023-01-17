import { Dimensions, Platform } from 'react-native';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
// const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.09);
const CAPTURE_SIZE = 60;
const CAPTURE_CONTROL_SIZE = CAPTURE_SIZE / 1.5;
const SCREEN_RATIO = WINDOW_HEIGHT / WINDOW_WIDTH;

export {
  WINDOW_HEIGHT, WINDOW_WIDTH, CAPTURE_SIZE, CAPTURE_CONTROL_SIZE, SCREEN_RATIO
};
