import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { fonts } from '../../theme/fonts';

const logo = require('../../assets/ongo-logo-big.png');

const SnifflesBox = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 102, height: 102 }} />
      <Text style={styles.title}>See you later!</Text>
      <Text style={styles.subtitle}>Shortly, you will be redirected to Home page</Text>
    </View>
  );
};

export default SnifflesBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: fonts.familyBold,
    fontSize: 20,
    lineHeight: 34,
  },
  subtitle: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeLarge,
    lineHeight: 28,
    textAlign: 'center',
  },
});
