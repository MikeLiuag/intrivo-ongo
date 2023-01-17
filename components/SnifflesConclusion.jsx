import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import { BlueButton } from './Buttons/BlueButton';
import RectanglSvg from './Svg/rectangl';

const SnifflesConclusion = ({ content, onPress }) => (
  <View style={styles.container}>
    <RectanglSvg />
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: content.image.url }}
        style={{ width: '100%', height: 90 }}
        resizeMode='center'
      />
      <View style={styles.descriptionContainer}>
        <Text style={styles.cardTitle}>{content.image.title}</Text>
        <Text style={styles.cardDescription}>{content.image.description}</Text>
      </View>
      <BlueButton
        title={content.button.description}
        action={() => onPress(content.subtype, content.url)}
      />
    </View>
  </View>
);

export default SnifflesConclusion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  cardContainer: {
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    position: 'absolute',
    width: '100%',
    padding: 16,
    borderRadius: 16,
    borderColor: colors.greyExtraLight,
    borderWidth: 1,
    marginVertical: 20,
  },
  cardTitle: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
    lineHeight: 16,
  },
  descriptionContainer: {
    marginVertical: 12,
  },
  cardDescription: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeNormal,
    lineHeight: 22,
  },
});
