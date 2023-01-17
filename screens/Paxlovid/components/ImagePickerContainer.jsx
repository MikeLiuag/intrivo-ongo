import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../../theme';

const plus = require('../../../assets/plus.png');
const arrow = require('../../../assets/arrowRight.png');

const ImagePickerContainer = ({ image, onPress, title }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={{ flex: 1, overflow: 'hidden' }}>
      {image ? (
        <Image
          source={{ uri: image.thumbUri || image.uri }}
          style={styles.image}
          resizeMode='contain'
        />
      ) : (
        <View style={styles.iconContainer}>
          <Image source={plus} style={styles.icon} />
        </View>
      )}
    </View>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.arrowContainer}>
      <Image source={arrow} style={styles.arrow} />
    </View>
  </TouchableOpacity>
);

export default ImagePickerContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.greyLight,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryPavement,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 14,
    height: 14,
  },
  arrow: {
    width: 15,
    height: 24,
  },
  image: {
    width: 70,
    height: 50,
  },
  title: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 10,
    flex: 4,
  },
  arrowContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
