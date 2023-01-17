import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../../../theme';
import Icon from '../../../Icon';

// feel free to add new types, or add custom props to make custom enums
export default ({ item, onClick }) => (
  <TouchableOpacity
    key={item.title}
    onPress={onClick}
    style={{
      backgroundColor: colors.primaryPavement,
      padding: 16,
      paddingRight: 32,
      borderRadius: 16,
      flexDirection: 'row',
      marginBottom: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
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
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.greyWhite,
          borderRadius: 8,
        }}
      >
        <Icon size={24} isGradient={false} type="url" url={item.icon} />
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text
          style={{
            color: colors.greyDark2,
            fontSize: 16,
            fontFamily: 'Museo_500',
          }}
        >
          {item.text}
        </Text>
        {item.description ? (
          <Text
            style={{
              fontFamily: 'Museo_300',
              fontSize: 14,
              color: colors.greyDark,
            }}
          >
            {item.description}
          </Text>
        ) : null}
      </View>
    </View>
  </TouchableOpacity>
);
