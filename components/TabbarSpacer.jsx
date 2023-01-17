import React from 'react';
import { View, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TabbarSpacer = () => <View style={styles.container} />;

export default TabbarSpacer;

const styles = StyleSheet.create({
  container: {
    height: hp('8%'), // same height as tabbar
  },
});
