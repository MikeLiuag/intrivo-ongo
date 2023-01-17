import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';
// import Icon from '../../../components/Icon';

const Card = ({ title, subtitle, onAction, Icon }) => (
  <TouchableOpacity style={styles.cardContainer} onPress={onAction}>
    <View style={styles.imageContainer}>
      <Icon />
    </View>
    <View style={styles.textContent}>
      <Text style={styles.cardText}>{title}</Text>
      <Text style={styles.cardTextSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.primaryPavement,
    borderColor: colors.greyExtraLight,
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 20,
  },
  imageContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.greyWhite,
    borderRadius: 4,
    marginRight: 18,
  },
  cardText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    color: colors.greyMidnight,
  },
  cardTextSubtitle: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeSmall,
    color: colors.greyGrey,
  },
  textContent: {
    justifyContent: 'space-between',
  },
});
