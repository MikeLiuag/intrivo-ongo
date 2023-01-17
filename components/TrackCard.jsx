import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LogEvent } from '../analytics';
import { colors } from '../theme';
import Icon from './Icon';

const TrackCard = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.trackContainer}>
        <View style={styles.iconContainer}>
          <Icon
            type='MaterialCommunityIcons'
            name='white-balance-sunny'
            color={colors.greyDark3}
            size={24}
            isGradient
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {t('screens.home.testTrack', { test: 'Vitamin D test' })}
          </Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              LogEvent('Home_click_Track');
              navigation.navigate('OrderDetail');
            }}
          >
            <Text style={styles.trackText}>{t('screens.home.track')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.checklistContainer}>
        <Text style={styles.text}>{t('orderDetail.startPrep')}</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            LogEvent('Home_click_View');
            navigation.navigate('PretestChecklist');
          }}
        >
          <Text style={styles.trackText}>{t('orderDetail.viewChecklist')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TrackCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 20,
    backgroundColor: colors.greyWhite,
    padding: 16,
    borderRadius: 16,
  },
  trackContainer: {
    flexDirection: 'row',
    borderBottomColor: colors.secondaryButtonBorder,
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F7F9',
  },
  titleText: {
    fontSize: 16,
    lineHeight: 19,
    width: '100%',
    fontFamily: 'Museo_700',
  },
  trackText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Museo_700',
    color: colors.primaryBlue,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Museo_500',
    color: '#1D1D1D',
  },
  checklistContainer: {
    marginTop: 16,
  },
  titleContainer: {
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  buttonContainer: {
    marginTop: 2,
  },
});
