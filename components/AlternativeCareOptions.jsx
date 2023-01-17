import React, { useEffect } from 'react';
import { Modal, View, StyleSheet, Text, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComp from './HeaderComp';
import { colors } from '../theme';
import CloseIcon from './Svg/close';
import BackgroundCircleTopRight from './Svg/backgroundCircleTopRight';
import BackgroundRectTopLeft from './Svg/backgroundRectTopLeft';
import { BlueButton } from './Buttons/BlueButton';
import { LogEvent } from '../analytics';

export default ({
  title,
  descr,
  visible,
  background = false,
  onClose = null,
  onBack = null,
  buttonTitle,
  onPressButton,
  withoutCloseIcon,
  SvgComponent,
  ContentComponent,
  analyticName,
}) => {
  useEffect(() => {
    LogEvent(`${analyticName}_screen`);
  }, [analyticName]);

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Modal visible={visible}>
      <SafeAreaView style={styles.backStyle}>
        <HeaderComp
          right={
            onClose && !withoutCloseIcon
              ? [<CloseIcon width={14} height={14} />, handleClose]
              : undefined
          }
          addStyle={styles.header}
          left={onBack && 'arrow'}
          onLeftClick={onBack}
        />
        {background && (
          <>
            <View style={styles.containerBackground1}>
              <BackgroundCircleTopRight />
            </View>
            <View style={styles.containerBackground2}>
              <BackgroundRectTopLeft />
            </View>
          </>
        )}
        <ScrollView>
          <View style={styles.backStyle}>
            <View style={styles.contentStyle}>
              <View style={styles.imageContainer}>
                <SvgComponent />
              </View>
              <Text style={styles.titleStyle}>{title}</Text>
              <Text style={styles.descStyle}>{descr}</Text>
              {ContentComponent && <ContentComponent />}
            </View>
          </View>
        </ScrollView>
        {buttonTitle && onPressButton && (
          <View style={{ paddingHorizontal: 24, flexDirection: 'row' }}>
            <BlueButton
              title={buttonTitle}
              style={styles.button}
              action={onPressButton}
              styleText={{ fontFamily: 'Museo_500' }}
            />
          </View>
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
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
    zIndex: 2,
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
    marginVertical: 24,
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
  containerBackground3: { position: 'absolute', left: 80, bottom: 0 },
  button: {
    width: '100%',
    marginBottom: 20,
  },
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
});
