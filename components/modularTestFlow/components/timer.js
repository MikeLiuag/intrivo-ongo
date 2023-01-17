import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { getTimerFormatted } from '../utils/functions';

const Timer = ({
  remainingTime,
  onEndTimer = () => null,
  containerStyle = {},
  textStyle = {}
}) => {
  const [timer, setTimer] = useState(remainingTime);
  const remaining = useRef();
  const [isEnded, setIsEnded] = useState(false);

  let intervalRef = useRef();

  useEffect(()=> {
    setTimer(remainingTime);
  }, [remainingTime])

  const tick = () => {
    remaining.current = remaining.current > 0 ? remaining.current - 1 : 0;
    setTimer(t => t > 0 ? t-1 : 0);
  };

  const getColor = () => {
    if(timer <= 60) return '#EC7A7D';
    if(timer <= 120) return '#F28749';
    return 'black';
  }

  useEffect(() => {
    remaining.current = remainingTime;
    intervalRef.current = setInterval(tick, 1000);
    return () => {
      onEndTimer(remaining.current);
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    timer === 0 && !isEnded && (onEndTimer(0) || setIsEnded(true) || clearInterval(intervalRef.current));
  },[timer]);

  return (
    <View style={containerStyle}>
      <Text allowFontScaling={false} style={[{textAlign: 'center', color: getColor()}, textStyle]}>{getTimerFormatted(timer, timer)}</Text>
    </View>
  );
};

export default Timer;