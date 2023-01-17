import React from 'react';
import { View, Pressable, Text, Image, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../../theme';

const TestButton = ({ action, title, subtitle, logo, selected, oldType }) => (
  <Pressable
    onPress={action}
    style={{flex: 1}}
  >
    <View style={
      [oldType 
          ? styles.buttonTypeOld 
          : styles.buttonType, 
        selected 
          ? {borderColor: colors.primaryBlue} 
          : {borderColor: '#D6D6D6'}
      ]}
    >
      <View style={oldType ? styles.imageBackgroundOld : styles.imageBackground}>
        <Image source={logo} 
          style={oldType 
            ? { width: 48, height: 48 } 
            : { width: 80, height: 130 }} 
        />
      </View>
      <View style={{ flexDirection: 'column'}}>
        <Text style={styles.rowHeader}>{title}</Text>
        <Text style={styles.rowText}>{subtitle}</Text>
      </View>
    </View>
  </Pressable>
);

export default TestButton;

const styles = StyleSheet.create({
  buttonType: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 6,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 16,
  },
  buttonTypeOld: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderRadius: 16,
    padding: 16,
    
  },
  imageBackgroundOld: {
    backgroundColor: colors.primaryPavement,
    height: 48,
    width: 48,
    marginRight: 16,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imageBackground: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowImage: {
    width: 48,
    height: 48,
  },
  rowHeader: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    color: colors.greyDark2,
  },
  rowText: {
    fontSize: 14,
    fontFamily: 'Museo_500',
    color: colors.greyMed,
  },
});
