import React, { useState, useEffect } from 'react';
import { Vibration, View, Animated } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import TimeView from './timeView';

const CountdownTimer = ({
  duration,
  isPlaying,
  onComplete,
  size,
  initialRemainingTime = null,
  settings,
  onChanged,
}) => {
  const [currentSetting, setCurrentSetting] = useState(settings[0]);
  const [sound, setSound] = useState();

  useEffect(() => (sound ? sound.unloadAsync() : undefined), [sound]);

  const onChangedTime = (remainingTime) => {
    settings.forEach((item) => {
      if (
        remainingTime < item.ttl_range[0] &&
        remainingTime > item.ttl_range[1]
      ) {
        if (currentSetting !== item) {
          setCurrentSetting(item);
        }
      } else if (remainingTime === item.ttl_range[1] && item.ending_actions) {
        item.ending_actions.forEach((item) => {
          if (item === 'vibrate') {
            Vibration.vibrate(1000);
          } else if (item === 'sound') {
            playSound();
          }
        });
      }
    });
    onChanged(remainingTime);
  };

  const playSound = async () => {
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('../../../../assets/sounds/beep-01a.mp3')
    );
    setSound(newSound);
    await newSound.playAsync();
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <LinearGradient
        colors={
          Array.isArray(currentSetting.counter_bg_color)
            ? currentSetting.counter_bg_color
            : [currentSetting.counter_bg_color, currentSetting.counter_bg_color]
        }
        start={{ x: 0, y: 0 }}
        style={{
          borderRadius: size / 2 - 15,
          width: size - 25,
          height: size - 25,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}
      />
      <CountdownCircleTimer
        duration={duration}
        rotation="counterclockwise"
        colors={currentSetting.ring_color}
        strokeWidth={15}
        trailStrokeWidth={0}
        initialRemainingTime={initialRemainingTime || duration}
        // isLinearGradient
        trailColor="white"
        strokeLinecap="square"
        isPlaying={isPlaying}
        onComplete={onComplete}
        size={size}
      >
        {({ remainingTime }) => (
          <TimeView
            remainingTime={remainingTime}
            onChanged={onChangedTime}
            fillColor={currentSetting.filling_color}
            textColor={currentSetting.counter_color}
          />
        )}
      </CountdownCircleTimer>
    </View>
  );
};

export default CountdownTimer;
