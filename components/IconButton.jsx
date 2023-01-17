import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { colors } from '../theme';

// feel free to add new types, or add custom props to make custom enums
export default ({ icon, title, onClick, style = {}, iconStyle = {}, textStyle = {} }) => (
  <TouchableOpacity
    key={title}
    onPress={onClick}
    style={{
      backgroundColor: 'white',
      paddingHorizontal: 5,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.greyExtraLight,
      height: 143,
      ...style,
    }}
  >
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: colors.primaryPavement,
          width: 40,
          height: 40,
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
          ...iconStyle,
        }}
      >
        {icon}
      </View>
      <Text
        style={{
          color: colors.greyDark2,
          fontSize: 14,
          fontFamily: 'Museo_700',
          lineHeight: 16,
          textAlign: 'center',
          marginTop: 16,
          ...textStyle,
        }}
      >
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);
