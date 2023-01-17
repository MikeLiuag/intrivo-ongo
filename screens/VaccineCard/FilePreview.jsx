import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Platform, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Pdf from 'rn-pdf-reader-js';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Background from '../../components/Background';
import HeaderComp from '../../components/HeaderComp';
import { LogEvent } from '../../analytics';
import DotsIcon from '../../components/Svg/dotsIcon';

const GestureHandler = Platform.OS !== 'web' ? require('react-native-gesture-handler') : {};

const { PinchGestureHandler = View } = GestureHandler;

const FilePreview = ({ navigation, route }) => {
  const { media, analyticName, onGoBack } = route.params;
  const { t } = useTranslation();

  const [needToRotate] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isPDF, setIsPDF] = useState(false);
  const scale = new Animated.Value(needToRotate ? 1.9 : 1);

  useEffect(() => {
    LogEvent(`${analyticName}_screen`);
    if (media?.mime_type?.includes('image')) {
      // if you don't need to rotate it, don't use it
      // Image.getSize(`data:image/jpeg;base64,${image}`, (width, height) => {
      //   setNeedToRotate(width > height);
      // });
    } else {
      setIsPDF(true);
    }
  }, [analyticName, media?.mime_type]);

  const onPinchEvent = Animated.event([{ nativeEvent: { scale } }]);

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === GestureHandler.State.ACTIVE) {
      Animated.spring(scale, {
        toValue: needToRotate ? 1.9 : 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleBack = () => {
    LogEvent(`${analyticName}_click_Back`);
    navigation.goBack();
    onGoBack?.();
  };

  const handleMenu = () => {
    LogEvent(`${analyticName}_click_Menu`);
    setShowMenu(!showMenu);
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <HeaderComp
        center={[route.params.header ? route.params.header : t('vaccine.header'), styles.textStyle]}
        left='arrow'
        onLeftClick={handleBack}
        right={
          route.params.type === 'insurance' ? [<DotsIcon />, handleMenu, { marginRight: 20 }] : []
        }
        addStyle={[styles.headerContainer, { marginTop: Platform.OS === 'ios' ? 20 : 40 }]}
      />
      <PinchGestureHandler onGestureEvent={onPinchEvent} onHandlerStateChange={onPinchStateChange}>
        <View style={styles.mainContainer}>
          <Background />
          {isPDF ? (
            <Pdf source={{ uri: media.uri }} style={styles.container} />
          ) : (
            <Animated.Image
              source={{
                uri: media.uri,
              }}
              resizeMode='contain'
              style={[
                styles.normalImage,
                {
                  transform: [
                    {
                      scale,
                    },
                    {
                      rotate: needToRotate ? '90deg' : '0deg',
                    },
                  ],
                },
              ]}
            />
          )}
        </View>
      </PinchGestureHandler>
      <Modal isVisible={showMenu} style={{ margin: 0 }} onBackdropPress={() => setShowMenu(false)}>
        <View style={styles.menuModal}>
          <TouchableOpacity
            onPress={() => {
              setShowMenu(false);
              navigation.goBack();
              route.params.openImagePicker();
            }}
            style={styles.menuRow}
          >
            <Text allowFontScaling={false} style={styles.redText}>
              {t('vaccine.button.reupload')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              route.params.removeCard();
              setShowMenu(false);
              navigation.goBack();
            }}
            style={styles.menuSecondRow}
          >
            <Text allowFontScaling={false} style={styles.redText}>
              {t('vaccine.button.remove')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowMenu(false)} style={styles.menuSecondRow}>
            <Text allowFontScaling={false} style={styles.rowTextCancel}>
              {t('vaccine.button.cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default FilePreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F2F7F9',
  },
  textStyle: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Museo_700',
  },
  normalImage: {
    width: '100%',
    height: '100%',
  },
  wrappedImage: {
    transform: [{ rotate: '90deg' }],
    width: '100%',
    height: '100%',
  },
  menuModal: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    height: 'auto',
    bottom: 0,
  },
  menuRow: {
    marginRight: 24,
    marginLeft: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderColor: '#D6D6D6',
    borderWidth: 1,
  },
  menuSecondRow: {
    marginRight: 24,
    marginLeft: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderColor: '#D6D6D6',
    borderWidth: 1,
  },
  redText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EB5757',
  },
  rowTextCancel: {
    fontSize: 16,
    fontWeight: '500',
  },
});
