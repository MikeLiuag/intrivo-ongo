import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import HeaderComp from './HeaderComp';
import { colors } from '../theme';

import CloseIcon from './Svg/close';
import BackgroundCircleTopRight from './Svg/backgroundCircleTopRight';
import BackgroundRectTopLeft from './Svg/backgroundRectTopLeft';
import { BlueButton } from './Buttons/BlueButton';
import WarningSVG from './Svg/WarningSvg';
import { getSolutions } from '../store/sniffles/slice';
import { DEEPLINK_SCHEME } from '../utilis/axios';
import { openLink } from '../utilis/link';
import { fonts } from '../theme/fonts';
import { LogEvent } from '../analytics';
import CompletedSaveSvg from './Svg/CompletedSaveSvg';

// const translationsPath = 'templates.timeslots';

export default ({ buttonTitle, onPressButton, propsCareOptionsType, propsTranslationsPath }) => {
  const { params } = useRoute();
  const {
    careOptionsType = propsCareOptionsType,
    translationsPath = propsTranslationsPath,
    analyticsName,
    type,
  } = params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { pop } = navigation;
  const { t } = useTranslation();

  const { solutions = [] } = useSelector((state) => state.sniffles);
  const sniffleNegativeResultTile = useSelector((state) => state.app.sniffleNegativeResultTile);

  useEffect(() => {
    LogEvent(`${analyticsName}_screen`);
    if (careOptionsType) dispatch(getSolutions({ type: careOptionsType }));
  }, [analyticsName, careOptionsType, dispatch]);

  const handleClose = () => {
    LogEvent(`${analyticsName}_click_Close`);
    pop(2);
  };

  const onItemPress = (item) => {
    if (item.url.includes('sniffles-telehealth-intro')) {
      LogEvent(`${analyticsName}_Click_Expert`);
    } else if (item.url.includes('https://www.amazon.com')) {
      LogEvent(`${analyticsName}_Click_OTC_medication`);
    } else if (item.url.includes('member/vaccine-landing')) {
      LogEvent(`${analyticsName}_Click_Vaccines`);
    } else if (item.url.includes('https://www.letsongo.com/shop')) {
      LogEvent(`${analyticsName}_Click_Purchase`);
    } else if (item.url.includes('https://www.letsongo.com/resources')) {
      LogEvent(`${analyticsName}_Click_Resources`);
    } else {
      LogEvent(`${analyticsName}_click_option`, item.title);
    }
    if (item.subtype === 'deeplink') {
      Linking.openURL(`${DEEPLINK_SCHEME}://${item.url}`);
    } else if (item.subtype === 'webview') {
      openLink(navigation, false, { url: item.url, useWebView: true });
    } else if (item.subtype === 'link') {
      openLink(navigation, true, { url: item.url, useWebView: false });
    }
  };

  return (
    <SafeAreaView style={styles.backStyle}>
      <HeaderComp
        right={[<CloseIcon width={14} height={14} />, handleClose]}
        addStyle={styles.header}
      />
      <>
        <View style={styles.containerBackground1}>
          <BackgroundCircleTopRight />
        </View>
        <View style={styles.containerBackground2}>
          <BackgroundRectTopLeft />
        </View>
      </>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={styles.contentStyle}>
          <View style={styles.imageContainer}>
            {type !== 'Other' ? <WarningSVG fill={colors.primaryBlue} /> : <CompletedSaveSvg />}
          </View>
          <Text style={styles.titleStyle}>{t(`${translationsPath}.title`)}</Text>
          {type !== 'Other' && (
            <Text style={styles.descStyle}>{t(`${translationsPath}.description`)}</Text>
          )}
          <View style={{ flexDirection: 'column', width: '100%' }}>
            {(
              solutions?.filter((i) => sniffleNegativeResultTile || !i.url.includes('sniffles')) ||
              []
            ).map((item) => (
              <TouchableOpacity
                key={item.title}
                style={styles.actionContainer}
                onPress={() => onItemPress(item)}
              >
                <View style={styles.iconContainer}>
                  <Image source={{ uri: item.icon }} resizeMode='center' style={styles.icon} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.text}>{item.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {buttonTitle && onPressButton && (
        <BlueButton title={buttonTitle} style={styles.button} action={onPressButton} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backStyle: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  header: {
    paddingHorizontal: 24,
  },
  titleStyle: {
    color: colors.greyMidnight,
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    marginTop: 40,
    marginHorizontal: 24,
    textAlign: 'center',
  },
  descStyle: {
    color: colors.greyMed,
    fontSize: fonts.sizeNormal,
    fontFamily: 'Museo_300',
    textAlign: 'center',
    lineHeight: 24,
    margin: 24,
  },
  contentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBackground1: { position: 'absolute', top: 0, right: 0, zIndex: -5 },
  containerBackground2: { position: 'absolute', top: 10, left: 0 },
  containerBackground3: { position: 'absolute', left: 80, bottom: 0 },
  imageContainer: {
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
  },
  button: {
    width: '80%',
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: fonts.familyBold,
    fontSize: 24,
    paddingHorizontal: 24,
    marginTop: 20,
    textAlign: 'left',
  },
  actionContainer: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.primaryPavement,
    borderWidth: 1,
    marginVertical: 8,
    marginHorizontal: 24,
    borderRadius: 16,
    borderColor: colors.greyExtraLight,
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    height: 40,
    width: 40,
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 16,
  },
  title: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    lineHeight: 21,
    color: colors.greyMidnight,
  },
  text: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeSmall,
    lineHeight: 21,
    color: colors.greyGrey,
  },
});
