import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fetchAppConfigs } from '../store/app/slice';
import { colors } from '../theme';
import LogoSvg from '../assets/logo';
import Loader from '../components/Svg/LoaderSVGs/Loader5';

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const minimumVersion = useSelector((s) => s.app.minimumVersion);
  const isPending = useSelector((state) => state.app.pending);

  useEffect(() => {
    dispatch(fetchAppConfigs());
  }, [dispatch, minimumVersion]);

  const anim1 = useRef(new Animated.Value(1)).current;
  const anim2 = useRef(new Animated.Value(1)).current;
  const anim3 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim1, {
          toValue: 2.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(anim1, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
          delay: -300,
        }),
        Animated.timing(anim2, {
          toValue: 2.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(anim2, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
          delay: -300,
        }),
        Animated.timing(anim3, {
          toValue: 2.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(anim3, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
          delay: -300,
        }),
      ])
    ).start();
  }, [anim1, anim2, anim3, isPending]);

  return (
    <View style={styles.container}>
      <LogoSvg width={wp('75%')} height={wp('20%')} />
      <View style={styles.bottom}>
        <View style={styles.containerLoader}>
          <Animated.View style={{ transform: [{ scale: anim1 }] }}>
            <Loader />
          </Animated.View>
          <Animated.View style={{ transform: [{ scale: anim2 }] }}>
            <Loader />
          </Animated.View>
          <Animated.View style={{ transform: [{ scale: anim3 }] }}>
            <Loader />
          </Animated.View>
        </View>
        <Text style={styles.updateText}>{t('screens.updateCheck.loading')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  containerLoader: {
    width: wp('17%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
    marginBottom: 10,
  },
  updateText: {
    fontFamily: 'Museo_500',
    fontSize: 18,
    color: colors.greyWhite,
    textAlign: 'center',
    lineHeight: 28,
  },
});
