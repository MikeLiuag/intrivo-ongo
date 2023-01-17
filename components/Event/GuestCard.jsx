import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../../theme';
import GuestIcon from '../Svg/guestSvg';

const GuestCard = ({ guest, translationTitle }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <GuestIcon />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {guest.first_name} {guest.last_name}
        </Text>
        {guest.latest_observation ? (
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.compText}>{t(`${translationTitle}.tested`)}</Text>
          </View>
        ) : (
          <Text style={styles.notTestedText}>{t(`${translationTitle}.notTested`)}</Text>
        )}
      </View>
    </View>
  );
};

export default GuestCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
    paddingVertical: 24,
    paddingHorizontal: 26,
    backgroundColor: colors.primaryPavement,
    borderRadius: 15,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 18,
  },
  compText: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 22,
    color: colors.statusGreen,
  },
  dateText: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyDark,
  },
  notTestedText: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyDark,
  },
});
