import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useDispatch } from 'react-redux';
import { BlueButton } from '../../components/Buttons/BlueButton';
import { colors } from '../../theme';
import { LogEvent } from '../../analytics';
import { sendEmailForComingSoon } from '../../store/app/slice';

const alertIcon = require('../../assets/alert-icon.png');

const validateEmail = (email) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

const LongCovidCS = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [sended, setSended] = useState(false);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    LogEvent('LCOVID_Quiz_ComingSoon_screen');
  }, []);

  const handleBack = () => {
    LogEvent('LCOVID_Quiz_ComingSoon_click_Back');
    navigation.goBack();
  };

  const handleSend = () => {
    LogEvent('LCOVID_Quiz_ComingSoon_click_Submit');
    if (validateEmail(email)) {
      setShowError(false);
      dispatch(sendEmailForComingSoon(email));
      setSended(true);
    } else {
      setShowError(true);
    }
  };

  const SendIcon = () => (
    <Svg width={21} height={18} fill='none' xmlns='http://www.w3.org/2000/svg'>
      <Path d='M.01 18 21 9 .01 0 0 7l15 2-15 2 .01 7Z' fill='#2A4D9B' />
    </Svg>
  );

  const CompletedIcon = () => (
    <Svg width={20} height={20} fill='none' xmlns='http://www.w3.org/2000/svg'>
      <Path
        d='M14.59 5.58 8 12.17 4.41 8.59 3 10l5 5 8-8-1.41-1.42ZM10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Z'
        fill='#49C37C'
      />
    </Svg>
  );

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 24, backgroundColor: colors.greyWhite }}>
      <View style={styles.emojiContainer}>
        <Image source={alertIcon} style={styles.emoji} />
        <Text style={styles.title}>Coming Soon!</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.midContainer}>
        <Text style={styles.description}>
          We are working hard to introduce access to practitioners
          <Text style={{ fontFamily: 'Museo_700' }}> specializing in Long COVID.</Text>
        </Text>
        <View style={styles.sendEmailContainer}>
          <Text style={styles.sendTitle}>Want to be notified when available?</Text>
          {showError && (
            <Text style={[styles.sendTitle, { color: colors.statusRed }]}>Invalid email</Text>
          )}
          {!sended ? (
            <View style={styles.emailContainer}>
              <TextInput
                style={{ flex: 1 }}
                placeholder='Enter your email address'
                value={email}
                onChangeText={(value) => setEmail(value)}
              />
              <TouchableOpacity onPress={() => handleSend()}>
                <SendIcon />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.completedContainer}>
              <CompletedIcon />
              <Text style={[styles.sendTitle, { marginLeft: 10 }]}>
                Great! We will email you as soon as this become available.{' '}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          In the meantime, speak virtually with one of our
          <Text style={styles.link} onPress={() => navigation.navigate('CareList')}>
            {' '}
            existing physician partners.
          </Text>
        </Text>
      </View>
      <BlueButton
        title='Return to results'
        style={styles.button}
        styleText={styles.buttonText}
        action={handleBack}
      />
    </SafeAreaView>
  );
};

export default LongCovidCS;

const styles = StyleSheet.create({
  emoji: {
    width: 86,
    height: 76,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 18,
    lineHeight: 31,
  },
  emojiContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
  },
  line: {
    borderWidth: 1,
    borderColor: colors.greyExtraLight,
    marginVertical: 30,
  },
  midContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 16,
  },
  footerContainer: {
    flex: 1,
  },
  description: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    lineHeight: 28,
  },
  sendEmailContainer: {
    padding: 22,
    backgroundColor: colors.primaryPavement,
    borderRadius: 8,
    marginTop: 20,
  },
  emailContainer: {
    paddingHorizontal: 16,
    paddingVertical: 22,
    backgroundColor: colors.greyWhite,
    marginTop: 12,
    borderRadius: 16,
    flexDirection: 'row',
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  sendTitle: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 24,
    color: colors.greyDark,
  },
  footerText: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    lineHeight: 28,
  },
  link: {
    fontFamily: 'Museo_500',
    color: colors.primaryBlue,
  },
  button: {
    backgroundColor: colors.greyWhite,
    borderColor: colors.greyLight,
  },
  buttonText: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
    color: colors.black,
  },
});
