import React, { useState, useEffect } from 'react';
import { Platform, View } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { colors } from '../../theme';

import CompletedScreen from '../../components/CompletedScreen';
import { proctorSessionCompleted } from '../../store/app/slice';
import { LogEvent } from '../../analytics';
// import AgoraUIKit, { layout, VideoRenderMode } from 'agora-rn-uikit';
// const {
//   default: AgoraUIKit = View,
//   layout = View,
//   VideoRenderMode = View,
// } = Platform.OS !== 'web' ? require('agora-rn-uikit') : {};

const TeleHealthScreen = ({ onContinue }) => {
  useKeepAwake();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { proctorSession } = useSelector((s) => s.app) || {};

  // const rtcProps = {
  //   layout: layout.pin,
  //   enableAudio: true,
  // };

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal) {
      setTimeout(() => {
        onContinue();
      }, 2000);
    }
  }, [modal, onContinue]);

  const endSession = async () => {
    await dispatch(proctorSessionCompleted());
    setModal(true);
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            marginBottom: 20,
            marginTop: 20,
            // borderColor: 'white',
            // borderWidth: 3,
            // borderRadius: 250,
          }}
        >
          {/* <AgoraUIKit
            rtcProps={{ ...rtcProps, ...proctorSession }}
            styleProps={{
              localBtnContainer: {
                display: 'none',
                opacity: 0,
                height: 0,
                width: 0,
              },
              remoteBtnContainer: {
                display: 'none',
                opacity: 0,
                height: 0,
                width: 0,
              },
              UIKitContainer: {
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 15,
                overflow: 'hidden',
              },
              videoMode: {
                max: VideoRenderMode.Hidden,
                min: VideoRenderMode.Hidden,
              },
              minViewContainer: {
                height: 100,
                width: 100,
                left: 20,
                top: 20,
                borderWidth: 3,
                borderColor: colors.greyExtraLight,
                backgroundColor: colors.greyExtraLight,
                overflow: 'hidden',
              },
              minViewStyles: {
                height: 94,
                width: 94,
                // left: 150,
                // top: 70,
                // borderWidth: 3,
                // borderColor: 'white',
              },
            }}
          /> */}
        </View>
        <BlueButton
          title={t('screens.proctoring.end')}
          action={() => {
            LogEvent('Call_End');
            endSession();
          }}
        />
      </View>

      {modal && (
        <CompletedScreen
          title={t('screens.proctoring.modal.title')}
          descr={t('screens.proctoring.modal.descr')}
          visible={modal}
          result={2}
          animated
          setModal={() => {}}
        />
      )}
    </>
  );
};

export default TeleHealthScreen;
