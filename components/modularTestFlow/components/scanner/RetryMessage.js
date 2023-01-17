import React, { forwardRef, useImperativeHandle } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../utils/constants';

const View = styled.View`
  ${({ width }) => width};
  ${({ position }) => position};
  opacity: ${({ opacity }) => opacity || 1};
  ${({ marginTop }) => marginTop && ({ 'margin-top': marginTop })};
  ${({ marginLeft }) => marginLeft && ({ 'margin-left': marginLeft })};
  ${({ padding }) => padding};
  ${({ backgroundColor }) => backgroundColor && ({ 'background-color': backgroundColor })};
  ${({ borderRadius }) => borderRadius && ({ 'border-radius': borderRadius })};
`;
const Text = styled.Text`
  color: white;
  font-size: 25;
  text-align: center;
  margin: 5px;
`;

const MESSAGE_OPACITY = 0.9;
const ANIMATION_DURATION = 500;
const MESSAGE_DELAY = 2000;

const RetryMessage = forwardRef(({ retryMessageOpacity, retryMessageText }, ref) => {

  useImperativeHandle(ref, () => ({
    animateOpacity(callback) {
      Animated.sequence([
        Animated.timing(retryMessageOpacity, {
          toValue: MESSAGE_OPACITY,
          duration: ANIMATION_DURATION,
          useNativeDriver: true
        }),
        Animated.timing(retryMessageOpacity, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
          delay: MESSAGE_DELAY
        })
      ]).start(() => {
        callback();
      });
    }
  }));

  return (
    <View width="80%" position="absolute" marginTop={WINDOW_HEIGHT / 4} marginLeft={(WINDOW_WIDTH * 0.2) / 2}>
      <Animated.View style={{ opacity: retryMessageOpacity }}>
        <View backgroundColor="black" borderRadius="10" padding={10} opacity={0.7}>
          <Text>{retryMessageText}</Text>
        </View>
      </Animated.View>
    </View>
  );
});

export default RetryMessage;
