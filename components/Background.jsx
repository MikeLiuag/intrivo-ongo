import React from 'react';
import { View, StyleSheet } from 'react-native';
import BackGroundSVG from './Svg/background';

const Background = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <BackGroundSVG />
        <BackGroundSVG style={styles.svgStyle} />
      </View>
      <View style={styles.imageContainer}>
        <BackGroundSVG />
        <BackGroundSVG style={styles.svgStyle} />
      </View>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
  },
  imageContainer: {
    flexDirection: 'row'
  },
  svgStyle: {
    marginLeft: -24
  }
})
