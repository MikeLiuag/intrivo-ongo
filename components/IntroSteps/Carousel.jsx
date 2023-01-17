import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../theme';

const Carousel = ({ currentStep, maxStep }) => {
  const stepWidth = `${parseInt((currentStep / maxStep) * 100, 10)}%`;
  const style = styles(stepWidth);
  return (
    <View style={style.main}>
      <View style={style.filled} />
    </View>
  );
};

Carousel.defaultProps = {
  currentStep: 1,
  maxStep: 7,
};

export default Carousel;

const styles = (stepWidth) =>
  StyleSheet.create({
    main: {
      position: 'relative',
      width: 120,
      height: 8,
      borderRadius: 100,
      marginTop: 20,
      backgroundColor: colors.greyExtraLight,
    },
    filled: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: stepWidth,
      height: '100%',
      borderRadius: 100,
      backgroundColor: colors.primaryBlue,
    },
  });
