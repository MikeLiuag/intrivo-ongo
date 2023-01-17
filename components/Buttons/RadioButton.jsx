import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { colors } from '../../theme';

const RadioButton = ({ title, action, active, activeColor, style }) => (
  <Pressable
    onPress={action ? () => action() : null}
    style={[styles.button, active && { backgroundColor: activeColor }, style]}
  >
    <View style={styles.ring}>
      <View style={[styles.innerRing, { backgroundColor: active ? activeColor : '#fff' }]} />
    </View>
    <Text style={active ? styles.activeTitle : styles.title}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 120,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryPavement,
  },
  activeButton: {
    borderColor: colors.primaryBlue,
  },
  isNone: {
    width: '100%',
  },
  title: {
    color: colors.greyDark2,
    fontFamily: 'Museo_700',
    lineHeight: 24,
    fontSize: 16,
  },
  activeTitle: {
    color: '#fff',
    fontFamily: 'Museo_700',
    lineHeight: 24,
    fontSize: 16,
  },
  ring: {
    width: 34,
    height: 34,
    padding: 6,
    borderRadius: 34,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  innerRing: {
    width: 22,
    height: 22,
    borderRadius: 22,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2.22,
    shadowOpacity: 0.22,
  },
});

export default RadioButton;
