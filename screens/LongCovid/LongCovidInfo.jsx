import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { getLongCovidQuiz } from '../../store/modularTestFlow/slice';
import { colors } from '../../theme';
import { LogEvent } from '../../analytics';
import CloseIcon from '../../components/Svg/close';

const backgroundColor = require('../../assets/LongCovid.png');
const maskbackground = require('../../assets/LongCovidMaskBackground.png');

const BACKGROUND_HEIGHT = 2.4;
const ICON_SIZE = 65;
export const WINDOW_WIDTH = Dimensions.get('window').width;

const LongCovidInfo = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    LogEvent('LCOVID_Quiz_Intro_screen');
    dispatch(getLongCovidQuiz());
    Animated.parallel([
      Animated.timing(anim1, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(anim2, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [dispatch, anim1, anim2]);

  const handleNotNow = () => {
    LogEvent('LCOVID_Quiz_Intro_click_NotNow');
    navigation.goBack();
  };

  const navigateExit = (results = {}) =>
    Object.keys(results).length
      ? navigation.replace('LongCovidResult', {
          data: {
            ...results,
          },
          from: 'modular',
        })
      : navigation.navigate('Home');

  const handleStart = () => {
    LogEvent('LCOVID_Quiz_Intro_click_Start');
    navigation.navigate('ModularTestFlow', { navigateExit });
  };

  const translateX = anim2.interpolate({
    inputRange: [0, 1],
    outputRange: [WINDOW_WIDTH, 0],
  });

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.imageContainer]}>
        <Animated.View
          style={{
            width: '100%',
            height: '100%',
            transform: [{ scale: anim1 }],
          }}
        >
          <Image source={maskbackground} style={[styles.image]} resizeMode='cover' />
        </Animated.View>
        <Animated.View
          style={[
            styles.mastImage,
            {
              transform: [
                {
                  translateX,
                },
              ],
            },
          ]}
        >
          <Image source={backgroundColor} style={styles.image} resizeMode='cover' />
        </Animated.View>
      </View>
      <View style={styles.closeIcon}>
        <TouchableOpacity onPress={handleNotNow}>
          <CloseIcon width={14} height={14} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }} />
      <ScrollView style={{ flex: 1, marginTop: 100 }} contentContainerStyle={styles.textContainer}>
        <Text style={styles.title}>{t('screens.longCovid.info.title')}</Text>
        <Text style={[styles.description, { marginBottom: 20 }]}>
          {t('screens.longCovid.info.description1')}
        </Text>

        <View style={styles.buttonContainer}>
          <BlueButton
            title={t('screens.longCovid.info.buttons.start')}
            styleText={styles.buttonText}
            action={handleStart}
            style={styles.button}
          />
        </View>

        <Text style={styles.disclaimer}>
          {t('screens.longCovid.info.disclaimer.title')}
          <Text style={{ fontFamily: 'Museo_300' }}>
            {t('screens.longCovid.info.disclaimer.description')}
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LongCovidInfo;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / BACKGROUND_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  mastImage: { position: 'absolute', width: '100%', height: '100%', top: 110, right: 0 },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 24,
    color: colors.greyGrey,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  whiteButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: colors.greyLight,
    marginRight: 8,
  },
  button: {
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 19,
  },
  virusContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryBlue,
    borderRadius: 13,
    position: 'absolute',
    left: 26,
    top: Dimensions.get('screen').height / BACKGROUND_HEIGHT - ICON_SIZE / 2,
  },
  footerText: {
    fontFamily: 'Museo_300',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    color: colors.greyDark,
  },
  link: {
    color: colors.primaryBlue,
    fontFamily: 'Museo_500',
  },
  disclaimer: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    color: colors.greyGrey,
    marginTop: 32,
  },
  closeIcon: { alignSelf: 'flex-end', marginRight: 30, top: 25, zIndex: 999 },
});
