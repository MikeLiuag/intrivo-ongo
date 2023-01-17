import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ModalWrapper from './ModalWrapper';
import { setFeedbackModalData, setFeedbackModalVisible } from '../../store/app/slice';
import { colors } from '../../theme';
import { BlueButton } from '../Buttons/BlueButton';
import { fonts } from '../../theme/fonts';
import RateHeader from '../Svg/RateHeader';
import CheckIcon from '../Svg/checkIcon';

const MODAL_WINDOW_WIDTH = Dimensions.get('window').width - 80;

const translationPath = 'rate';

const FeedbackModal = ({ navRef }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    feedbackModalData: { title = '', category = '', subtype = '' },
    isFeedbackModalVisible,
    isAuthed,
  } = useSelector(({ app }) => app);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const closeModalWindow = () => {
    dispatch(setFeedbackModalVisible(false));
    dispatch(setFeedbackModalData({}));
    setIsSubmitted(false);
  };

  const onPressLeftButton = () => {
    closeModalWindow();
    navRef.current.navigate('Feedback', {
      subtype,
      category,
      showReview: false,
    });
  };

  const onPressRightButton = () => {
    setIsSubmitted(true);
    setTimeout(closeModalWindow, 1000);
  };

  const renderInputContent = () => (
    <>
      <RateHeader />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title || t(`${translationPath}.popUpTitle`)}</Text>
        <View style={styles.buttonsContainer}>
          <BlueButton
            showLoading={false}
            title={t(`${translationPath}.buttons.notReally`)}
            style={[styles.whiteButton, styles.button]}
            styleText={styles.whiteButtonText}
            action={onPressLeftButton}
          />
          <BlueButton
            showLoading={false}
            title={t(`${translationPath}.buttons.yes`)}
            style={styles.button}
            styleText={styles.buttonText}
            action={onPressRightButton}
          />
        </View>
      </View>
    </>
  );

  const renderResultContent = () => (
    <View style={styles.thanksContainer}>
      <View style={styles.iconContainer}>
        <CheckIcon width={67} height={67} />
      </View>
      <Text style={styles.thanksText}>{t(`${translationPath}.popUpThanks`)}</Text>
    </View>
  );

  const renderContent = () => (
    <>
      <View style={styles.container}>
        <View style={styles.popUpContainer}>
          {(isSubmitted ? renderResultContent : renderInputContent)()}
        </View>
      </View>
    </>
  );

  const isShow = useMemo(
    () => isAuthed && isFeedbackModalVisible,
    [isAuthed, isFeedbackModalVisible]
  );

  return isShow ? (
    <ModalWrapper onPressBackground={closeModalWindow}>{renderContent()}</ModalWrapper>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUpContainer: {
    height: '30%',
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
    maxWidth: MODAL_WINDOW_WIDTH - 40,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  whiteButton: {
    backgroundColor: colors.white,
    borderColor: colors.greyLight,
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
    width: MODAL_WINDOW_WIDTH,
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

export default FeedbackModal;
