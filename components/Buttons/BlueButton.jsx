import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { colors } from '../../theme';
import Loader from '../Svg/LoaderSVGs/Loader5';

// eslint-disable-next-line import/prefer-default-export
export const BlueButton = ({
  title,
  action,
  blank,
  style,
  styleText,
  disabled,
  loading,
  showLoading = true,
}) => {
  const isPending = useSelector((state) => state.app.pending);
  const disableButton = disabled;

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
  }, [isPending, anim1, anim2, anim3]);

  return !blank ? (
    <TouchableOpacity
      disabled={disableButton || isPending}
      style={[
        {
          backgroundColor: disableButton ? colors.greyExtraLight : colors.primaryBlue,
          borderColor: disableButton ? colors.greyLight : colors.primaryBlue,
        },
        styles.submitBtn,
        styles.center,
        style,
      ]}
      onPress={action ? () => action() : null}
    >
      {showLoading && isPending ? (
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
      ) : (
        <Text
          allowFontScaling={false}
          medium
          trunk
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[
            disableButton ? { color: colors.greyGrey } : { color: colors.greyWhite },
            styles.submitBtnText,
            styleText,
          ]}
        >
          {!loading ? title : <ActivityIndicator color='black' />}
        </Text>
      )}
    </TouchableOpacity>
  ) : (
    <TouchableWithoutFeedback disabled={disableButton || isPending}>
      <View
        style={[{ backgroundColor: colors.greyExtraLight }, styles.submitBtn, styles.center, style]}
      >
        <Text
          allowFontScaling={false}
          medium
          trunk
          style={{
            color: colors.greyGrey,
            fontSize: hp('2.3%'),
            alignItems: 'center',
            fontWeight: '600',
            justifyContent: 'center',
          }}
        >
          {!loading ? title : <ActivityIndicator color='black' />}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 55,
  },
  submitBtn: {
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('1.8%'),
    borderRadius: 16,
    borderWidth: 1,
  },
  submitBtnText: {
    fontSize: hp('2.3%'),
    alignItems: 'center',
    fontWeight: '600',
    justifyContent: 'center',
  },
  containerLoader: {
    width: wp('17%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
  },
});
