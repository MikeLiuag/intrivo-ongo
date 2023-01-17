import React, { useState, useRef } from 'react';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useKeepAwake } from 'expo-keep-awake';
import { LinearGradient } from 'expo-linear-gradient';
import CountdownTimer from '../components/countdownTimer/countdown';
import { colors } from '../../../theme';
import ContentsBlock from '../components/ContentsBlock';
import parseForVars from '../utils/parser';
import FormattedText from '../components/formattedText';

const TimerV1 = ({ args, vars, onAction = () => null }) => {
  useKeepAwake();
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [totalTime] = useState(parseForVars(args.timer.ttl, vars));
  const remainingTime = useRef(0);

  const timerSize = 270;

  const fillColor = args.timer.settings[args.timer.settings.length - 1].filling_color;
  const textColor = args.timer.settings[args.timer.settings.length - 1].font_color;

  return (
    <>
      <View style={styles.container}>
        {!timerCompleted ? (
          <View style={Platform.OS === 'ios' ? styles.roundIOS : styles.roundAndroid}>
            <CountdownTimer
              duration={totalTime}
              // onComplete={onFinish}
              isPlaying={args.timer.auto_start}
              size={timerSize}
              settings={args.timer.settings}
              onChanged={(_remainingTime) => {
                if (_remainingTime !== remainingTime.current) {
                  onAction({
                    timer: { completed: _remainingTime <= 0, remaining: _remainingTime },
                  });
                  if (_remainingTime <= 0) setTimerCompleted(true);
                  remainingTime.current = _remainingTime;
                }
              }}
            />
          </View>
        ) : (
          <View style={styles.complete}>
            <LinearGradient
              colors={Array.isArray(fillColor) ? fillColor : [fillColor, fillColor]}
              start={{ x: 0, y: 0 }}
              style={styles.gradient}
            >
              <FormattedText
                allowFontScaling={false}
                style={{
                  fontWeight: '700',
                  color: textColor,
                  fontSize: 32,
                  lineHeight: 38,
                  alignSelf: 'center',
                }}
              >
                {args.timer.ended_text}
              </FormattedText>
            </LinearGradient>
          </View>
        )}
        <ScrollView>
          <ContentsBlock
            contents={args.contents}
            vars={{ ...vars, timer: { remaining: remainingTime.current } }}
          />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  link: {
    fontFamily: 'Museo_700',
    color: '#2A4D9B',
  },
  bold: {
    fontFamily: 'Museo_700',
  },
  container: {
    alignItems: 'center',
    padding: Platform.isPad ? hp('12%') : hp('3%'),
  },
  roundAndroid: {
    borderRadius: Number(wp('100%')),
    backgroundColor: '#0000001A',
    margin: 20,
  },
  roundIOS: {
    borderRadius: Number(wp('100%')),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginVertical: 35,
  },
  complete: {
    margin: 20,
  },
  description: {
    marginTop: wp('5%'),
    alignSelf: 'flex-start',
    fontFamily: 'Museo_300',
    fontSize: 16,
    color: colors.greyDark,
    lineHeight: 25,
  },
  warningContainer: {
    borderWidth: 1,
    borderColor: '#B00020',
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'rgba(176, 0, 32, 0.1)',
    marginHorizontal: 3,
    marginTop: 16,
  },
  warning: {
    color: '#B00020',
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 24,
  },
  gradient: {
    borderColor: '#fff',
    borderWidth: Number(wp('3.5%')),
    width: Number(wp('70%')),
    height: Number(wp('70%')),
    borderRadius: Number(wp('35%')),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TimerV1;
