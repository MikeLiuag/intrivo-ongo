import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { colors } from '../theme';
import RightIconSvg from './Svg/ResultScreen/RightIconSvg';

export default ({ title, icon, onClick, style = {}, iconStyle = {}, titleStyle = {} }) => (
  <TouchableOpacity
    key={title}
    onPress={onClick}
    style={{
      backgroundColor: '#ffffff',
      padding: 16,
      paddingRight: 32,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: colors.greyExtraLight2,
      ...style,
    }}
  >
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: colors.primaryPavement,
          width: 40,
          height: 40,
          borderRadius: 8,
          marginRight: 16,
          alignItems: 'center',
          justifyContent: 'center',
          ...iconStyle,
        }}
      >
        {icon}
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={[
            {
              color: colors.greyDark2,
              fontSize: 16,
              fontFamily: 'Museo_500',
            },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      </View>
    </View>
    <RightIconSvg />
  </TouchableOpacity>
);
