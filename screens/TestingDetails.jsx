import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LogEvent } from '../analytics';
import HeaderComp from '../components/HeaderComp';
import { colors } from '../theme';
import { openLink } from '../utilis/link';

import TestDetailsIcon from '../components/Svg/testDetails';

const TestingDetails = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { shopLink } = useSelector((s) => s.app);
  const eCommerce = useSelector((s) => s.app.eCommerce);

  useEffect(() => {
    LogEvent('TGTP_screen');
  }, []);

  const handleClose = () => {
    LogEvent('TGTP_click_Close');
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1 }}>
      <View style={styles.header}>
        <HeaderComp
          center={[t('screens.testingDetails.title'), styles.headerTitle]}
          right={['x', handleClose]}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.headerSubtitle}>{t('screens.testingDetails.question')}</Text>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              LogEvent('TGTP_click_Personal');
              if (eCommerce) {
                navigation.navigate('BrowseList');
              } else {
                openLink(navigation, false, { url: shopLink, useWebView: true });
              }
            }}
          >
            <View style={styles.iconContainer}>
              <TestDetailsIcon personal />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{t('screens.testingDetails.personal.title')}</Text>
              <Text style={styles.cardSubtitle}>
                {t('screens.testingDetails.personal.subtitle')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              LogEvent('TGTP_click_Event');
              navigation.navigate('CreateEvent');
            }}
          >
            <View style={styles.iconContainer}>
              <TestDetailsIcon />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{t('screens.testingDetails.event.title')}</Text>
              <Text style={styles.cardSubtitle}>{t('screens.testingDetails.event.subtitle')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TestingDetails;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  container: {
    flex: 1,
    marginTop: 10,
  },
  headerSubtitle: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 21,
    color: colors.greyMed,
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Museo_700',
    lineHeight: 30,
    marginLeft: -15,
  },
  cardContainer: {
    paddingHorizontal: 24,
    marginTop: 30,
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    marginVertical: 8,
    borderRadius: 16,
  },
  cardTitle: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
  },
  cardSubtitle: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 16,
    color: colors.greyMed,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.primaryPavement,
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 16,
  },
});
