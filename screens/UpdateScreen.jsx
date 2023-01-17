import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Linking from 'expo-linking';
import { colors } from '../theme';
import BackgroundCircleTopRight from '../components/Svg/backgroundCircleTopRight';
import BackgroundRectTopLeft from '../components/Svg/backgroundRectTopLeft';
import AppIconSvg from '../components/Svg/AppIconSvg';
import { BlueButton } from '../components/Buttons/BlueButton';

const translationPath = 'screens.update';

const UpdateScreen = () => {
  const { t } = useTranslation();

  const link =
    Platform.OS === 'ios'
      ? 'itms-apps://apps.apple.com/updates'
      : 'market://details?id=com.ongo.live';

  const handleOnClick = () => Linking.openURL(link);
  const note = useSelector((state) => state.app.notes);

  return (
    <SafeAreaView style={styles.backStyle}>
      <View style={styles.containerBackground1}>
        <BackgroundCircleTopRight />
      </View>
      <View style={styles.containerBackground2}>
        <BackgroundRectTopLeft />
      </View>
      <View style={styles.backStyle}>
        <View style={styles.contentStyle}>
          <View
            style={{
              backgroundColor: 'white',
              width: 102,
              height: 102,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
            }}
          >
            <AppIconSvg />
          </View>
          <Text style={styles.titleStyle}>{t(`${translationPath}.title`)}</Text>
          <Text style={styles.descStyle}>{note || t(`${translationPath}.experience`)}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 24, flexDirection: 'row' }}>
        <BlueButton
          title={t(`${translationPath}.button`)}
          style={styles.button}
          action={handleOnClick}
          styleText={{ fontFamily: 'Museo_500' }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  titleStyle: {
    color: colors.greyMidnight,
    fontSize: 20,
    fontFamily: 'Museo_900',
    marginTop: 40,
    marginHorizontal: 24,
    textAlign: 'center',
  },
  descStyle: {
    color: colors.greyMed,
    fontSize: 14,
    fontFamily: 'Museo_300',
    marginTop: 24,
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 60,
  },
  contentStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBackground1: { position: 'absolute', top: 0, right: 0, zIndex: -5 },
  containerBackground2: { position: 'absolute', top: 10, left: 0 },
  button: {
    width: '100%',
    marginBottom: 20,
  },
});

export default UpdateScreen;
