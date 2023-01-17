import React from 'react';
import { View, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { BlueButton } from '../../Buttons/BlueButton';

const Footer = ({
  onNext,
  nextEnabled,
  containerStyle,
  buttonStyle,
  overrideButtonText,
}) => (
    <View style={[styles.container, containerStyle]}>
      <BlueButton
        style={buttonStyle}
        title={overrideButtonText}
        action={onNext}
        disabled={!nextEnabled}
      />
    </View>
);

export default Footer;

const styles = StyleSheet.create({
  container: {
    padding: wp('5%'),
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});