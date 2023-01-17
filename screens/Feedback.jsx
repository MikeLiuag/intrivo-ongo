import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Device from 'expo-device';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComp from '../components/HeaderComp';
import { colors } from '../theme';
import { BlueButton } from '../components/Buttons/BlueButton';
import CheckIcon from '../components/Svg/checkIcon';
import { LogEvent } from '../analytics';
import { ratingFeedback, setIsReviewScreenShown } from '../store/app/slice';

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const Feedback = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { params: { category = 'others', subtype = 'comments', showReview } = {} } = useRoute();
  const isReviewScreenShown = useSelector((state) => state.app.isReviewScreenShown);

  useEffect(() => {
    LogEvent('FeedbackForm_screen');
  }, []);

  useEffect(() => {
    const waitAndNavigate = async () => {
      await sleep(2000);
      navigation.navigate('Home');
    };
    if (showModal) {
      waitAndNavigate();
    }
  }, [showModal, navigation]);

  const handleSetReviewnScreen = () => {
    if (showReview) {
      const key = showReview === true ? 'main' : showReview;
      dispatch(
        setIsReviewScreenShown({
          ...isReviewScreenShown,
          [key]: true,
        })
      );
    }
  };

  const handleSubmit = async () => {
    LogEvent('FeedbackForm_click_Submit');
    const requestData = {
      data: {
        device: Device.modelName,
        content: feedback,
        category,
        subtype,
      },
    };

    const response = await dispatch(ratingFeedback(requestData));
    if (response?.type.includes('fulfilled')) {
      handleSetReviewnScreen();
      setShowModal(true);
    }
    // setShowModal(true);
  };

  const handleBack = () => {
    LogEvent('FeedbackForm_click_Back');
    navigation.goBack();
  };

  const getLeftCharacters = () => {
    if (700 - feedback.length < 0) {
      return 0;
    }
    return 700 - feedback.length;
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={{ flex: 1 }}>
      <HeaderComp
        center={[
          t('rate.feedback.header'),
          { fontSize: 16, color: 'black', fontFamily: 'Museo_700' },
        ]}
        left='arrow'
        addStyle={styles.header}
        onLeftClick={handleBack}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{t('rate.feedback.title')}</Text>
        <TextInput
          placeholder={t('rate.feedback.placeholder')}
          style={styles.textInput}
          multiline
          textAlignVertical='top'
          value={feedback}
          blurOnSubmit
          returnKeyType='done'
          onChangeText={(value) => setFeedback(value)}
        />
        <Text
          style={[
            styles.subtitle,
            {
              color: feedback.length > 699 ? colors.statusRed : colors.greyLight,
            },
          ]}
        >
          {t('rate.feedback.max')}
          {getLeftCharacters()}
        </Text>
        <BlueButton
          title={t('rate.feedback.button')}
          style={styles.button}
          styleText={styles.buttonText}
          action={handleSubmit}
          disabled={feedback.length === 0 || feedback.length > 699}
        />
      </View>
      <Modal visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <CheckIcon width={67} height={67} />
          </View>
          <Text style={styles.modalText}>{t('rate.feedback.thanks')}</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: colors.greyMed,
  },
  textInput: {
    backgroundColor: '#fff',
    height: hp('36%'),
    marginVertical: 26,
    borderWidth: 1,
    borderColor: colors.greyLight,
    padding: 24,
    borderRadius: 16,
    paddingTop: 24,
  },
  subtitle: {
    alignSelf: 'flex-end',
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 16,
  },
  button: {
    marginTop: 28,
  },
  buttonText: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    shadowColor: '#666666',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  modalText: {
    fontFamily: 'Museo_700',
    fontSize: 20,
    lineHeight: 24,
    marginTop: 50,
    textAlign: 'center',
  },
});
