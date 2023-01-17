import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import RightIconSvg from '../Svg/ResultScreen/RightIconSvg';

const HomeButton = ({ onPress, icon, title, subtitle, renderFooter }) => (
  <View
    style={{
      ...styles.initialSection,
      marginTop: 20,
    }}
  >
    <TouchableOpacity onPress={onPress}>
      <View style={styles.modalRow}>
        <View style={styles.imageBackground}>{icon()}</View>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <Text style={styles.rowHeader}>{title}</Text>
          <Text style={styles.secondText}>{subtitle}</Text>
        </View>
        <View style={styles.arrowIcon}>
          <RightIconSvg />
        </View>
      </View>
    </TouchableOpacity>
    {renderFooter && renderFooter()}
  </View>
);

export default HomeButton;

const styles = StyleSheet.create({
  initialSection: {
    marginLeft: 24,
    marginRight: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  modalRow: {
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageBackground: {
    backgroundColor: colors.primaryPavement,
    height: 40,
    width: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  rowHeader: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    color: colors.greyDark2,
  },
  secondText: {
    fontSize: 14,
    color: colors.greyMed,
    fontFamily: 'Museo_500',
  },
  arrowIcon: {
    alignItems: 'flex-end',
  },
});
