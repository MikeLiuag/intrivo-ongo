import React, { useState } from 'react';
import { View, Image, Platform, StyleSheet } from 'react-native';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';

const MaskedView =
  Platform.OS !== 'web'
    ? require('@react-native-community/masked-view').default
    : View;

const Icon = ({ type, name, localIcon, url, size, isGradient, color }) => {
  const [didLoaded, setLoaded] = useState(type !== 'url');
  const getIcon = () => {
    switch (type) {
      case 'MaterialCommunityIcons':
        return (
          <MaterialCommunityIcons
            name={name}
            size={size}
            color={color || colors.greyGrey}
          />
        );
      case 'MaterialIcons':
        return (
          <MaterialIcons
            name={name}
            size={size}
            color={color || colors.greyGrey}
          />
        );
      case 'Ionicons':
        return (
          <Ionicons name={name} size={size} color={color || colors.greyGrey} />
        );
      case 'url':
        return (
          <Image
            source={{ uri: url }}
            style={styles.icon}
            onLoad={() => setLoaded(true)}
          />
        );
      default:
        return localIcon;
    }
  };
  if (isGradient && didLoaded) {
    return (
      <MaskedView style={{ width: size, height: size }} maskElement={getIcon()}>
        <LinearGradient
          colors={[
            colors.iconGradientStart,
            colors.iconGradientMiddle,
            colors.iconGradientEnd,
          ]}
          locations={[0, 0.51, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </MaskedView>
    );
  }
  return getIcon();
};
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
export default Icon;
