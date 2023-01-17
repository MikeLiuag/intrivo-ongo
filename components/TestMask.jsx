import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import TestCameraMask from './Svg/TestCameraMask';

const TestMask = () => (
  <View style={styles.container}>
    <TestCameraMask />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
});

export default TestMask;
