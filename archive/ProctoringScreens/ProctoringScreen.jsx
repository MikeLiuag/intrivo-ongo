import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { colors } from '../../theme';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { useTranslation } from 'react-i18next';

const ProctoringScreen = ({ onContinue }) => {
  const cameraRef = useRef();
  const {t} = useTranslation();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: 'Museo_300',
            fontSize: 16,
            lineHeight: 24,
            color: colors.greyMed,
            marginTop: 10,
          }}
        >
          {t('screens.proctoring.cameraTitle')}
        </Text>
        <View
          style={{
            flex: 1,
            marginTop: 20,
            marginBottom: 20,
            overflow: 'hidden',
            borderColor: 'white',
            borderRadius: 10,
            borderWidth: 1,
            alignItems: 'center'
          }}
        >
          <Camera
            style={{
              height: '100%',
              width: Dimensions.get('window').width
            }}
            ref={cameraRef}
            type={Camera.Constants.Type.front}
            onMountError={(error) => {
              console.log('camera error', error);
            }}
          />
        </View>
      </View>
      <BlueButton title={t('screens.proctoring.live.button')} action={onContinue} />
    </View>
  );
};

export default ProctoringScreen;
