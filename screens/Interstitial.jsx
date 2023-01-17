import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { resetToDashboard } from '../utilis/navigationHelper';

const icon = require('../assets/icon.png');

export default function Interstitial({
  route: {
    params: { target, url, title, useWebView = true },
  },
}) {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      if (url) {
        if (useWebView) {
          navigation.replace('WebViewHandler', {
            url,
            title: target,
          });
        } else {
          Linking.openURL(url);
          resetToDashboard(navigation);
        }
      }
    }, 2000);
  }, [navigation, target, url, useWebView]);

  return (
    <SafeAreaView
      // edges={['right', 'left']}
      style={{ flex: 1, backgroundColor: '#ffffff' }}
    >
      <View style={styles.viewContainer}>
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} />
        </View>
        <Text style={styles.title}>{title || 'See you later!'}</Text>
        <Text style={styles.description}>{`Shortly, you will be redirected to \n${
          target || 'an external site'
        }`}</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  iconContainer: {
    width: 102,
    height: 102,
    shadowColor: colors.greyMed,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.16,
    borderRadius: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 67,
    height: 67,
  },
  viewContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 34,
    textAlign: 'center',
    marginTop: 33,
  },
  description: {
    fontSize: 16,
    lineHeight: 28,
    color: colors.greyMed,
    marginTop: 16,
    textAlign: 'center',
  },
});
