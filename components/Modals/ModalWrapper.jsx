import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme';

const ModalWrapper = ({ onPressBackground, children }) => (
  <TouchableOpacity onPress={onPressBackground} style={styles.container}>
    {children}
  </TouchableOpacity>
);

export default ModalWrapper;

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.greyOpacity,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
