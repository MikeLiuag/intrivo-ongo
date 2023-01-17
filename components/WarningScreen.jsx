import React from 'react';
import { Modal, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComp from './HeaderComp';
import CloseIcon from './Svg/close';
import BackgroundCircleTopRight from './Svg/backgroundCircleTopRight';
import BackgroundRectTopLeft from './Svg/backgroundRectTopLeft';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import WarningSVG from './Svg/WarningSvg';
import { BlueButton } from './Buttons/BlueButton';

const WarningScreen = ({
  onClose = null,
  onBack = null,
  title,
  descr,
  question,
  warningColor,
  blueButtonTitle,
  onBlueButtonPress,
  whiteButtonTitle,
  onWhiteButtonPress,
  linkTitle,
  onLinkPress,
  linkStyle,
}) => {
  const handleClose = () => {
    onClose?.();
  };
  const handleBack = () => {
    onBack?.();
  };
  return (
    <Modal visible>
      <SafeAreaView style={styles.container}>
        {(onClose || onBack) && (
          <HeaderComp
            left={onBack && 'arrow'}
            onLeftClick={handleBack}
            right={onClose ? [<CloseIcon width={14} height={14} />, handleClose] : []}
            addStyle={styles.header}
          />
        )}
        <View style={styles.containerBackground1}>
          <BackgroundCircleTopRight />
        </View>
        <View style={styles.containerBackground2}>
          <BackgroundRectTopLeft />
        </View>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <WarningSVG fill={warningColor} />
          </View>
          {title && <Text style={styles.titleStyle}>{title}</Text>}
          {descr && <Text style={styles.descStyle}>{descr}</Text>}
          {question && <Text style={styles.descStyle}>{question}</Text>}
        </View>
        <View style={styles.buttonsContainer}>
          {whiteButtonTitle && (
            <BlueButton
              title={whiteButtonTitle}
              action={onWhiteButtonPress}
              style={styles.whiteButton}
              styleText={styles.whiteButtonText}
            />
          )}
          {whiteButtonTitle && blueButtonTitle && <View style={styles.spacer} />}
          {blueButtonTitle && (
            <BlueButton
              title={blueButtonTitle}
              action={onBlueButtonPress}
              style={styles.blueButton}
            />
          )}
        </View>
        {linkTitle && (
          <Text style={[styles.link, linkStyle]} onPress={() => onLinkPress()}>
            {linkTitle}
          </Text>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default WarningScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    zIndex: 2,
  },
  containerBackground1: { position: 'absolute', top: 0, right: 0, zIndex: -5 },
  containerBackground2: { position: 'absolute', top: 10, left: 0 },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: colors.greyMidnight,
    fontSize: 20,
    fontFamily: fonts.familyExtraBold,
    marginTop: 40,
    textAlign: 'center',
  },
  descStyle: {
    color: colors.greyMed,
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyLight,
    marginTop: 24,
    textAlign: 'center',
    lineHeight: 28,
  },
  iconContainer: {
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
  buttonsContainer: {
    flexDirection: 'row',
  },
  whiteButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderColor: colors.greyLight,
  },
  blueButton: {
    flex: 1,
  },
  whiteButtonText: {
    color: colors.greyMidnight,
  },
  spacer: {
    marginHorizontal: 8,
  },
  link: {
    textAlign: 'center',
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    lineHeight: 21,
    color: colors.primaryBlue,
    marginTop: 25,
  },
});
