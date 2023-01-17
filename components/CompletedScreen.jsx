import React, { useEffect, useRef } from 'react';
import { Modal, View, StyleSheet, Text, Animated, Easing, TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

import CompletedSaveSvg from './Svg/CompletedSaveSvg';
import CompletedSvgArrow from './Svg/CompletedSvgArrow';
import HeartSvg from './Svg/HeartSvg';
import CloseIcon from './Svg/close';
import BackgroundCircleTopRight from './Svg/backgroundCircleTopRight';
import BackgroundRectTopLeft from './Svg/backgroundRectTopLeft';
import BackgroundRectBottom from './Svg/backgroundRectBottom';
import { BlueButton } from './Buttons/BlueButton';
import WarningSVG from './Svg/WarningSvg';
import { fonts } from '../theme/fonts';
import { LogEvent } from '../analytics';

export default ({
  title,
  descr,
  visible,
  loading,
  animated,
  setModal,
  result,
  background = false,
  onClose = null,
  buttonTitle,
  onPressButton,
  withoutCloseIcon,
  warningType = false,
  titleStyle,
  whiteCTAButton,
  link = null,
  onLinkPress = null,
  warningColor,
  checkmark = false,
  analyticName,
}) => {
  const size = useRef(new Animated.Value(animated ? 0.45 : 1)).current;
  const opacity1 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const opacity3 = useRef(new Animated.Value(0)).current; // texts

  const opacity4 = useRef(new Animated.Value(0)).current;
  const opacity5 = useRef(new Animated.Value(0)).current; // icons

  const titles = [
    {
      title: 'You’ve done your part!',
      desc: 'Congratulations on making the world just a little bit healthier, happier, and safer. ',
    },
    {
      title: 'Test complete',
      desc: 'We hope you feel better soon. We’ve emailed you resources to give you peace of mind.',
    },
    {
      title: 'Test complete',
      desc: 'Get a new result in 10 minutes or less, or purchase more tests from our online store.',
    },
  ];

  // const [animTitle, setAnimTitle] = useState({
  //   title: 'You’ve done your part!',
  //   desc: 'Congratulations on making the world just a little bit healthier, happier, and safer. ',
  // });

  const endAnim = (time) => {
    setTimeout(() => {
      setModal?.(false, result === 0);
      onClose?.();
    }, time || 2000);
  };

  useEffect(() => {
    LogEvent(`${analyticName}_screen`);
    const animSizeStart = () => {
      Animated.parallel([
        Animated.timing(size, {
          toValue: 1,
          delay: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.bounce,
        }),
        Animated.timing(opacity1, {
          duration: 500,
          useNativeDriver: true,
          toValue: 1,
        }),
        Animated.timing(opacity2, {
          duration: 500,
          useNativeDriver: true,
          toValue: 1,
        }),
        Animated.timing(opacity3, {
          duration: 500,
          useNativeDriver: true,
          toValue: 1,
        }),
        Animated.timing(opacity4, {
          duration: 500,
          useNativeDriver: true,
          toValue: 1,
        }),
        Animated.timing(opacity5, {
          duration: 500,
          useNativeDriver: true,
          toValue: 1,
        }),
      ]).start(() => {
        if (result !== 0) {
          endAnim(2500);
        }
      });
    };
    if (animated) {
      animSizeStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    onClose?.();
  };
  const renderCTAButton = () => {
    const backgroundColor = whiteCTAButton ? colors.white : colors.primaryBlue;
    const borderColor = whiteCTAButton ? colors.greyLight : colors.primaryBlue;
    const textColor = whiteCTAButton ? colors.greyMidnight : colors.white;

    return (
      buttonTitle &&
      onPressButton && (
        <BlueButton
          title={buttonTitle}
          action={onPressButton}
          styleText={{ color: textColor }}
          style={[styles.button, { backgroundColor, borderColor }]}
        />
      )
    );
  };

  const returnView = () => {
    const returnOpacity = () => {
      if (result === 0) return opacity1;
      if (result === 1) return opacity2;
      if (result >= 2) return opacity3;
      return 0;
    };
    if (result >= 0) {
      return (
        <Animated.View
          style={{
            alignItems: 'center',
            position: 'absolute',
            opacity: returnOpacity(),
          }}
        >
          <Text style={styles.titleStyle}>{title || titles[result >= 2 ? 2 : result].title}</Text>
          <Text style={styles.descStyle}>{descr || titles[result >= 2 ? 2 : result].desc}</Text>
        </Animated.View>
      );
    }
    return null;
  };

  return (
    <Modal visible={visible}>
      <SafeAreaView style={styles.backStyle}>
        {onClose && !withoutCloseIcon && (
          <TouchableOpacity style={styles.header} onPress={handleClose}>
            <CloseIcon width={14} height={14} />
          </TouchableOpacity>
        )}
        {background && (
          <>
            <View style={styles.containerBackground1}>
              <BackgroundCircleTopRight />
            </View>
            <View style={styles.containerBackground2}>
              <BackgroundRectTopLeft />
            </View>
            <View style={styles.containerBackground3}>
              <BackgroundRectBottom />
            </View>
          </>
        )}
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
              {!warningType ? (
                <CompletedSaveSvg loading={loading} />
              ) : (
                <WarningSVG fill={warningColor} />
              )}
              {result !== 1 && (
                <Animated.View
                  style={{
                    transform: [{ scale: size }],
                    position: 'absolute',
                    opacity: opacity4,
                  }}
                >
                  <CompletedSvgArrow />
                </Animated.View>
              )}
              {result === 1 && (
                <Animated.View style={{ position: 'absolute', opacity: opacity5 }}>
                  <HeartSvg />
                </Animated.View>
              )}
              {checkmark && (
                <View
                  style={{
                    position: 'absolute',
                  }}
                >
                  <CompletedSvgArrow />
                </View>
              )}
            </View>
            {!animated && <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>}
            {!animated && <Text style={styles.descStyle}>{descr}</Text>}
            {!animated && link && (
              <Text style={styles.descStyle}>
                {link.text}
                <Text style={styles.linkStyle} onPress={() => onLinkPress()}>
                  {link.linkName}
                </Text>
              </Text>
            )}
            {/* {!!animated && <Text style={styles.descStyle}>{animTitle.desc}</Text>} */}
            {!!animated && (
              <View
                style={{
                  alignItems: 'center',
                  minHeight: 150,
                  paddingHorizontal: 24,
                }}
              >
                {returnView()}
              </View>
            )}
          </View>
        </View>
        {renderCTAButton()}
        {animated && result === 0 && (
          <ConfettiCannon
            count={150}
            explosionSpeed={350}
            fallSpeed={3000}
            autoStartDelay={0}
            origin={{ x: -10, y: 0 }}
            onAnimationEnd={endAnim}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 24,
    alignSelf: 'flex-end',
    minHeight: 35,
    minWidth: 35,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleStyle: {
    color: colors.greyMidnight,
    fontSize: 20,
    fontFamily: fonts.familyExtraBold,
    marginTop: 40,
    marginHorizontal: 24,
    textAlign: 'center',
  },
  descStyle: {
    color: colors.greyMed,
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyLight,
    marginTop: 24,
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 24,
  },
  linkStyle: {
    color: colors.primaryBlue,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
  },
  contentStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBackground1: { position: 'absolute', top: 0, right: 0, zIndex: -5 },
  containerBackground2: { position: 'absolute', top: 10, left: 0 },
  containerBackground3: { position: 'absolute', left: 80, bottom: 0 },
  button: {
    width: '80%',
    marginBottom: 20,
  },
});
