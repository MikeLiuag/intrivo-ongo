import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { colors } from '../theme';
import { BlueButton } from './Buttons/BlueButton';

const backImg = require('../assets/HomeScreen/background.png');

const HomeCard = ({
  title,
  titleStyle = {},
  description,
  buttonTitle,
  image,
  onClick,
  style = {},
}) => (
  <View
    style={{
      ...styles.initialSection,
      marginTop: 30,
      ...style,
    }}
  >
    <ImageBackground source={backImg} style={styles.backImage} resizeMode='stretch'>
      <View style={styles.container}>
        <View style={styles.boxImageContainer}>
          <Image source={image} resizeMode='contain' style={styles.boxImage} />
        </View>
        <View style={styles.modalRow}>
          <View style={{ flexDirection: 'column', flex: 0.4 }}>
            <Text style={[styles.rowHeader, titleStyle]}>{title}</Text>
            {description && <Text style={styles.rowText}>{description}</Text>}
          </View>
          <View style={styles.buttonWrapper}>
            <BlueButton
              action={onClick}
              title={buttonTitle}
              styleText={{ fontSize: 16, fontFamily: 'Museo_700', lineHeight: 18 }}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  </View>
);

export default HomeCard;

const styles = StyleSheet.create({
  backImage: {},
  initialSection: {
    marginHorizontal: 24,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
    shadowColor: colors.greyMed,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 6,
  },
  boxImageContainer: { flex: 1, marginBottom: 20 },
  boxImage: {
    flex: 1,
    width: '100%',
    height: undefined,
    aspectRatio: 2,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rowHeader: {
    fontFamily: 'Museo_700',
    fontSize: 18,
    lineHeight: 19,
    color: colors.greyDark2,
  },
  rowText: {
    fontSize: 14,
    lineHeight: 17,
    marginTop: 5,
    fontFamily: 'Museo_500',
    color: colors.greyMed,
  },
  buttonWrapper: {
    flex: 0.6,
  },
});
