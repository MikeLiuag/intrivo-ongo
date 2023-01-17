import { createIconSetFromFontello } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { CAPTURE_SIZE, CAPTURE_CONTROL_SIZE } from '../../utils/constants';
import { getTimerFormatted } from '../../utils/functions';
import FormattedText from '../formattedText';

const ViewContainer = styled.View`
  position: absolute;
  bottom: 0;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding-bottom: ${CAPTURE_CONTROL_SIZE / 2 + 20};
  padding-top: ${CAPTURE_CONTROL_SIZE / 2};
  background-color: #000;
`;

const CaptureButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #f5f6f5;
  height: ${CAPTURE_SIZE};
  width: ${CAPTURE_SIZE};
  border-radius: ${Math.floor(CAPTURE_SIZE / 2)};
  border-color: #000000;
  border-width: 5;
  z-index: 10000;
  margin-top: ${(CAPTURE_SIZE * 0.1) / 2};
  margin-bottom: ${(CAPTURE_SIZE * 0.1) / 2};
`;
const CaptureButtonBackground = styled.View`
  flex: 1;
  background-color: #f5f6f5;
  height: ${CAPTURE_SIZE * 1.1};
  width: ${CAPTURE_SIZE * 1.1};
  border-radius: ${Math.floor((CAPTURE_SIZE * 1.2) / 2)};
  z-index: 0;
  align-items: center;
`;

const MESSAGE_OPACITY = 0.9;
const ANIMATION_DURATION = 500;
const MESSAGE_DELAY = 2000;

const CaptureControl = ({
  instructions = [],
  retryMessageOpacity,
  takePicture,
  setRetryMessageText,
  captureEnabled,
  setCaptureEnabled,
  mockScale,
  mockOpacity,
  mockRotate,
  remainingLabel = '',
}) => {
  const [captureButtonOpacity] = useState(new Animated.Value(1));
  const buttonOpacity = captureEnabled ? 1 : 0.5;
  const showAnimation = instructions.length > 0;

  useEffect(() => {
    const showInstructions = () => {
      if (!showAnimation) return setCaptureEnabled(true);

      setCaptureEnabled(false);
      const animationOpacity = 0.5;
      setRetryMessageText(instructions[0]);
      Animated.sequence([
        Animated.timing(retryMessageOpacity, {
          toValue: MESSAGE_OPACITY,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(retryMessageOpacity, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
          delay: MESSAGE_DELAY,
        }),
      ]).start(() => {
        if (instructions[1]) {
          setRetryMessageText(instructions[1]);
          Animated.sequence([
            Animated.timing(retryMessageOpacity, {
              toValue: MESSAGE_OPACITY,
              duration: ANIMATION_DURATION,
              useNativeDriver: true,
            }),
            Animated.timing(retryMessageOpacity, {
              toValue: 0,
              duration: ANIMATION_DURATION,
              useNativeDriver: true,
              delay: MESSAGE_DELAY,
            }),
          ]).start();
        }
      });
      Animated.sequence([
        Animated.timing(mockOpacity, {
          toValue: animationOpacity,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(mockRotate, {
          toValue: -1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(mockRotate, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(mockRotate, {
          toValue: -1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(mockRotate, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(mockRotate, {
          toValue: -1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(mockRotate, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.sequence([
          Animated.timing(mockScale, {
            toValue: 0.8,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(mockScale, {
            toValue: 1.2,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(mockScale, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
        ]).start(() => {
          Animated.sequence([
            Animated.loop(
              Animated.sequence([
                Animated.timing(captureButtonOpacity, {
                  toValue: 0.5,
                  duration: ANIMATION_DURATION / 5,
                  useNativeDriver: true,
                }),
                Animated.timing(captureButtonOpacity, {
                  toValue: 1,
                  duration: ANIMATION_DURATION / 5,
                  useNativeDriver: true,
                }),
              ]),
              { iterations: 5 }
            ),
            Animated.timing(mockOpacity, {
              toValue: 0,
              duration: ANIMATION_DURATION,
              useNativeDriver: true,
            }),
          ]).start(() => setCaptureEnabled(true));
        });
      });
      return true;
    };

    showInstructions();
  }, [
    captureButtonOpacity,
    instructions,
    mockOpacity,
    mockRotate,
    mockScale,
    retryMessageOpacity,
    setCaptureEnabled,
    setRetryMessageText,
    showAnimation,
  ]);

  return (
    <ViewContainer CAPTURE_CONTROL_SIZE={CAPTURE_CONTROL_SIZE} style={{ flexDirection: 'row' }}>
      {remainingLabel !== '' ? (
        <View style={{ flex: 1 }}>
          <FormattedText style={styles.remainingTime}>{remainingLabel}</FormattedText>
        </View>
      ) : (
        <View style={{ flex: 1 }} />
      )}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <CaptureButtonBackground style={{ opacity: buttonOpacity }}>
          <CaptureButton
            CAPTURE_SIZE={CAPTURE_SIZE}
            CAPTURE_CONTROL_SIZE={CAPTURE_CONTROL_SIZE}
            // disabled={!isCameraReady || !captureEnabled}
            onPress={takePicture}
          />
        </CaptureButtonBackground>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }} />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  remainingTime: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Museo_500',
  },
  remainingLabel: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Museo_500',
  },
});

export default CaptureControl;
