import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { formatTimer } from '../../utils/functions';

export default ({
  remainingTime,
  onChanged = () => {},
  fillColor,
  textColor,
}) => {
  useEffect(() => {
    onChanged(remainingTime);
  }, [onChanged, remainingTime]);

  return (
    <Animated.View
      style={{
        borderRadius: 130,
        width:270,
        height: 270,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:fillColor
      }}
    >
      <Animated.Text
        allowFontScaling={false}
        style={{
          fontSize: Number(hp('6.5%')),
          fontWeight: 'bold',
          color: textColor,
        }}
      >
        {formatTimer(remainingTime)}
      </Animated.Text>
    </Animated.View>
  );
};
