import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { format } from 'date-fns'
import { colors } from '../theme';
import SvgComponent from "./Svg/arrowRightIcon";
import Icon from "./Icon";

const DoseInfo = ({ dose, vaccine, date, onPress }) =>(
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Icon
          type="MaterialIcons"
          name="assignment-turned-in"
          size={24}
          isGradient
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Dose {dose}</Text>
        <Text style={styles.text}>
          {vaccine} - {format(new Date(date), 'MMMM dd, yyyy')}
        </Text>
      </View>
      <View>
        <SvgComponent color='black' />
      </View>
    </TouchableOpacity>
  );

export default DoseInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    padding: 16,
    borderRadius: 16,
    marginVertical: 8,
    backgroundColor: '#F2F7F9',
  },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: colors.greyWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  titleText: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
  },
  text: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 16,
    color: '#666666',
  },
});
