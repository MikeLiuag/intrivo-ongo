import { Dimensions, Platform, StyleSheet, Linking } from 'react-native';
import * as ExpoLinking from 'expo-linking';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

const isMobile =
  /iPhone|iPad|iPod|Android/i.test(Constants.platform?.web?.ua) || width < 1000;

// const getGuideLineBaseWith = () => {
//   if (isMobile && Platform.OS === 'web') return 375; // based on figma
//   if (Platform.OS === 'web') return 1440;
//   return 374;
// };

// const getGuideLineBaseHeight = () => {
//   if (isMobile && Platform.OS === 'web') return 812; // based on figma
//   if (Platform.OS === 'web') return 1024;
//   return 811;
// };

// const guidelineBaseWidth = getGuideLineBaseWith();
// const guidelineBaseHeight = getGuideLineBaseHeight();

// const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
// const verticalScale = (size) => (height / guidelineBaseHeight) * size;
// const moderateHorizontalScale = (size, factor = 0.5) =>
//   size + (horizontalScale(size) - size) * factor;
// const moderateVerticalScale = (size, factor = 0.5) =>
//   size + (verticalScale(size) - size) * factor;

const customPlatform = (func) => {
  const returnStyle = (main, obj = {}) => {
    const newStyleObj = {};
    Object.keys(main).forEach((key) => {
      newStyleObj[key] = {
        ...StyleSheet.flatten(main[key]),
        ...StyleSheet.flatten(obj[key]),
      };
    });
    Object.keys(obj).forEach((key) => {
      newStyleObj[key] = {
        ...StyleSheet.flatten(obj[key]),
        ...StyleSheet.flatten(newStyleObj[key]),
      };
    });

    return StyleSheet.create(newStyleObj);
  };
  if (Platform.OS === 'web') {
    const styleDepend = isMobile ? 'web-mobile' : 'web';
    return func(styleDepend, returnStyle);
  }
  return func('native', returnStyle);
};

const linkTo = (link) =>
  Platform.OS === 'web' ? Linking.openURL(link) : ExpoLinking.openURL(link);

export {
  // horizontalScale,
  // verticalScale,
  // moderateHorizontalScale,
  // moderateVerticalScale,
  customPlatform,
  linkTo,
};
