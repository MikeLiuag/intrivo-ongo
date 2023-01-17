import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Modal, StyleSheet, Platform, Linking } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import * as StoreReview from 'expo-store-review';

import { setIsReviewScreenShown, setShowReviewScreen } from '../store/app/slice';
import { colors } from '../theme';
import { BlueButton } from './Buttons/BlueButton';
import RateHeader from './Svg/RateHeader';
import { LogEvent } from '../analytics';
import CheckIcon from './Svg/checkIcon';
import { fonts } from '../theme/fonts';
import { openLink } from '../utilis/link';

const feedbackOptions = {
  longCovidTelehealth: {
    analyticsName: 'LCOVID_',
    feedbackCategory: 'long_covid_telehealth',
    title: 'rate.carePopUpTitle',
  },
  negativeTest: {
    analyticsName: 'Negative_Test_',
    feedbackCategory: 'covid_negative',
    title: 'rate.popUpTitle',
  },
  snifflesPoc: {
    analyticsName: 'Sniffles_POC_',
    feedbackCategory: 'sniffles_testing',
    title: 'rate.snifflesTelehealthPopUpTitle',
  },
  snifflesTelehealth: {
    analyticsName: 'Sniffles_Virtual_',
    feedbackCategory: 'sniffles_telehealth',
    title: 'rate.snifflesTelehealthPopUpTitle',
  },
  snifflesMedication: {
    analyticsName: 'Sniffles_Async_',
    feedbackCategory: 'sniffles_medication',
    title: 'rate.snifflesMedicationPopUpTitle',
  },
  paxlovidDelivery: {
    analyticsName: 'Paxlovid_Delivery_',
    feedbackCategory: 'paxlovid_delivery',
    title: 'rate.paxlovidFeedBackDelivery',
  },
  paxlovidMedication: {
    analyticsName: 'Paxlovid_Medication_',
    feedbackCategory: 'paxlovid_medication',
    title: 'rate.paxlovidFeedBackMedication',
  },
};

const CustomRate = ({ navRef }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [showThanks, setShowThanks] = useState(false);
  const [showNativeReview, setShowNativeReview] = useState(false);
  const [requestThanks, setRequestThanks] = useState(false);

  const showReview = useSelector((state) => state.app.showReviewScreen);
  const customRate = useSelector((state) => state.app.customRate);
  const isReviewScreenShown = useSelector((state) => state.app.isReviewScreenShown);

  const {
    title = '',
    analyticsName = '',
    feedbackCategory = 'others',
  } = useMemo(() => feedbackOptions[showReview] || {}, [showReview]);

  useEffect(() => {
    if (isCustomModalShow) LogEvent(`${analyticsName}Ratings_screen`);
  });

  const isCustomModalShow = useMemo(
    () =>
      (customRate && showReview === true && !isReviewScreenShown.main) ||
      (showReview.length > 0 && typeof showReview === 'string' && !isReviewScreenShown[showReview]),
    [customRate, showReview, isReviewScreenShown]
  );

  // const isNativeModalShow = useMemo(
  //   () => !customRate && showReview === true && !isReviewScreenShown.main,
  //   [showReview, customRate, isReviewScreenShown]
  // );

  const handleSetReviewnScreen = useCallback(() => {
    if (showReview) {
      const key = showReview === true ? 'main' : showReview;
      dispatch(
        setIsReviewScreenShown({
          ...isReviewScreenShown,
          [key]: true,
        })
      );
    }
  }, [dispatch, showReview, isReviewScreenShown]);

  // call native rate popup
  useEffect(() => {
    const requestReview = async () => {
      //  useCallback(async () => {
      LogEvent(`${analyticsName}Ratings_click_Yes`);
      if (await StoreReview.hasAction()) {
        await StoreReview.requestReview();
        return;
      }

      // If StoreReview is unavailable then get the store URL from `app.config.js` or `app.json` and open the store
      const url = Platform.select({
        ios: 'https://apps.apple.com/in/app/on-go/id1565398009',
        android: 'https://play.google.com/store/apps/details?id=com.ongo.live',
      });

      if (url) {
        const supported = await Linking.canOpenURL(url);
        if (!supported) {
          // console.warn("Expo.StoreReview.requestReview(): Can't open store url: ", url);
        } else {
          openLink(null, true, { url, useWebView: false });
        }
      }
    };
    if (showNativeReview) {
      setShowNativeReview(false);
      requestReview();
    }
  }, [analyticsName, showNativeReview]);

  useEffect(() => {
    if (requestThanks) {
      if (!showThanks) {
        setRequestThanks(false);
        setShowThanks(true);
        setTimeout(() => {
          handleSetReviewnScreen();
          dispatch(setShowReviewScreen(false)); // After the user has evaluated the application, we show the thanks window and hide the entire component
          setShowThanks(false);
          setShowNativeReview(true);
        }, 2000);
      }
    }
  }, [requestThanks, showThanks, dispatch, handleSetReviewnScreen]);

  const handleNo = () => {
    LogEvent(`${analyticsName}Ratings_click_NotReally`);

    handleSetReviewnScreen();
    dispatch(setShowReviewScreen(false)); // hide custom rate popup
    navRef.current.navigate('Feedback', {
      showReview,
      subtype: 'feedbacks',
      category: feedbackCategory,
    });
  };

  // if (isNativeModalShow) {
  //   requestReview(true);
  //   handleSetReviewnScreen();
  //   dispatch(setShowReviewScreen(false));
  //   dispatch(setNagativeTestComplete(false));
  // }

  const popUpTitle = useMemo(() => {
    if (title) return t(title);

    return t('rate.popUpTitle');
  }, [title, t]);

  return (
    <Modal visible={isCustomModalShow} transparent>
      <View style={styles.screen}>
        <View style={styles.popUpContainer}>
          {!showThanks ? (
            <>
              <RateHeader />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{popUpTitle}</Text>
                <View style={styles.buttonsContainer}>
                  <BlueButton
                    title={t('rate.buttons.notReally')}
                    style={styles.whiteButton}
                    styleText={styles.whiteButtonText}
                    action={handleNo}
                  />
                  <BlueButton
                    title={t('rate.buttons.yes')}
                    style={styles.button}
                    styleText={styles.buttonText}
                    action={() => {
                      setRequestThanks(true);
                    }}
                  />
                </View>
              </View>
            </>
          ) : (
            <View style={styles.thanksContainer}>
              <View style={styles.iconContainer}>
                <CheckIcon width={67} height={67} />
              </View>
              <Text style={styles.thanksText}>{t('rate.popUpThanks')}</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomRate;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#29292999',
  },
  popUpContainer: {
    width: 303,
    height: hp('35%'),
    backgroundColor: colors.white,
    borderRadius: 14,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeLarge,
    marginTop: 16,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 19,
  },
  whiteButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: colors.white,
    borderColor: colors.greyLight,
  },
  button: {
    flex: 1,
    marginLeft: 10,
  },
  whiteButtonText: {
    color: colors.black,
    fontFamily: fonts.familyBold,
    fontSize: 16,
  },
  buttonText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
  },
  thanksContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 12,
    shadowColor: colors.greyMed,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  thanksText: {
    fontFamily: fonts.familyBold,
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 30,
  },
});
