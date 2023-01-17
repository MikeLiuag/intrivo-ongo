import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BackGroundIcon from '../assets/svgs/avatar_placeholder.svg';
import { colors } from '../theme';

const UserAvatar = ({ fullname }) => {
  const initials = fullname
    .split(' ')
    .map((name) => name[0])
    .join('');

  return (
    <View>
      <BackGroundIcon />
      <Text style={styles.text}>{initials}</Text>
    </View>
  );
};

export default UserAvatar;

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    alignSelf: 'center',
    color: colors.white,
    fontFamily: 'Museo_700',
    fontSize: 10,
    lineHeight: 24,
  },
});
