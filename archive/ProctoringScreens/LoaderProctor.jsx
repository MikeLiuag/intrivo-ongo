import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Animated,
  StyleSheet,
  Easing,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CompletedScreen from '../../components/CompletedScreen';

import Loader1 from '../../components/Svg/LoaderSVGs/Loader1';
import Loader2 from '../../components/Svg/LoaderSVGs/Loader2';
import Loader3 from '../../components/Svg/LoaderSVGs/Loader3';
import Loader4 from '../../components/Svg/LoaderSVGs/Loader4';
import {
  getProctorFailureContents,
  getProctorLoaderContents,
  proctorRequested,
} from '../../store/app/slice';
import { colors } from '../../theme';

const LoaderComp = ({ onContinue, uuid, title, anotherFlow }) => {
  const rotateAnim1 = useRef(new Animated.Value(0)).current;
  const rotateAnim2 = useRef(new Animated.Value(0)).current;
  const rotateAnim3 = useRef(new Animated.Value(0)).current;
  const rotateAnim4 = useRef(new Animated.Value(0)).current;

  const [modal, setModal] = useState({
    visible: false,
    result: null,
    animated: false,
    title: '',
    descr: '',
  });
  const questionOpacity = useRef(new Animated.Value(0)).current;
  const [questionIndex, setQuestionIndex] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { proctorSession, proctorLoaderContents } =
    useSelector((s) => s.app) || {};

  const { t } = useTranslation();

  const navigateRes = () => {
    onContinue();
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim1, {
          toValue: 100,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateAnim2, {
          toValue: 100,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateAnim3, {
          toValue: 100,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateAnim4, {
          toValue: 100,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateAnim4, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateAnim3, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateAnim2, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateAnim1, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ])
    ).start();

    let questionAnimationInterval = null;
    const contentsPromise = dispatch(getProctorLoaderContents(t));
    contentsPromise.then((res) => {
      if (res?.payload?.questions?.length > 0) {
        animateQuestions();
        questionAnimationInterval = setInterval(() => {
          animateQuestions();
          setTimeout(() => {
            setQuestionIndex((index) =>
              index < res.payload.questions.length - 1 ? index + 1 : 0
            );
          }, 1000);
        }, 6000);
      }
    });

    const promise = dispatch(proctorRequested({ uuid }));
    promise.then((res) => {
      const { meta: { requestStatus } = {}, payload: { skipError } = {} } = res;
      if (requestStatus === 'rejected' && skipError) {
        const failureContentsPromise = dispatch(getProctorFailureContents(t));
        failureContentsPromise.then((res) => {
          setModal({
            ...modal,
            visible: true,
            animated: false,
            title: res?.payload?.title,
            descr: res?.payload?.description,
          });
        });
        setTimeout(() => {
          navigation.navigate('Home');
        }, 4500);
        setTimeout(() => {
          setModal({ ...modal, visible: false, animated: false });
        }, 5500);
      } else if (requestStatus === 'fulfilled') {
        setModal({
          ...modal,
          visible: true,
          animated: true,
          result: 2,
          title: 'Connected!',
          descr: `Transfering...`,
        });
      }
    });

    return () => {
      promise.abort();
      clearInterval(questionAnimationInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (proctorSession && !anotherFlow) onContinue();
  }, [proctorSession, onContinue, anotherFlow]);

  const animateQuestions = () => {
    Animated.sequence([
      Animated.timing(questionOpacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(questionOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const transRotate1 = rotateAnim1.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '180deg'],
  });
  const transRotate2 = rotateAnim2.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '180deg'],
  });
  const transRotate3 = rotateAnim3.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '180deg'],
  });
  const transRotate4 = rotateAnim4.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="#F8F8FC"
        barStyle="dark-content"
      />
      <View style={styles.backModal}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            paddingHorizontal: '20%',
            marginBottom: 40,
          }}
        >
          <Animated.View style={{ transform: [{ rotateY: transRotate4 }] }}>
            <Loader1 />
          </Animated.View>
          <Animated.View style={{ transform: [{ rotateY: transRotate3 }] }}>
            <Loader2 />
          </Animated.View>
          <Animated.View
            style={{
              transform: [{ rotateY: transRotate2 }],
            }}
          >
            <Loader3 />
          </Animated.View>
          <Animated.View style={{ transform: [{ rotateY: transRotate1 }] }}>
            <Loader4 />
          </Animated.View>
        </View>
        {title ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          <View>
            <Text style={styles.title}>{proctorLoaderContents?.title}</Text>
            <Text style={styles.subTitle}>
              {proctorLoaderContents?.description}
            </Text>
            <Animated.Text
              style={[styles.question, { opacity: questionOpacity }]}
            >
              {proctorLoaderContents?.questions[questionIndex]}
            </Animated.Text>
          </View>
        )}
      </View>
      {modal.visible && (
        <CompletedScreen
          title={modal.title}
          descr={modal.descr}
          visible={modal.visible}
          result={modal.result}
          animated={modal.animated}
          setModal={navigateRes}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backModal: {
    // backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Museo_700',
    textAlign: 'center',
    color: colors.greyMidnight,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Museo_700',
    textAlign: 'center',
    color: colors.greyMidnight,
    lineHeight: 28,
    marginTop: 20,
  },
  question: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.greyGrey,
    lineHeight: 28,
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default LoaderComp;
