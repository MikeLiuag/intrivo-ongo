import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../theme';
import CheckMarkExtraThinSvg from '../Svg/checkMarkExtraThinSvg';

const ChipsButton = ({ title, action, active, checkmark }) => (
  <Pressable
    onPress={action ? () => action() : null}
    style={[styles.button, active && styles.activeButton]}
  >
    {checkmark ? (
      <View style={[styles.buttonContainer, active && styles.activeButtonConainer]}>
        <CheckMarkExtraThinSvg
          width={8}
          height={8}
          color={active ? colors.white : colors.secondaryButtonBorder}
        />
      </View>
    ) : (
      <View style={styles.ring}>
        <View style={[styles.innerRing, { backgroundColor: active ? '#2A4D98' : '#FFF' }]} />
      </View>
    )}
    <Text style={active ? styles.activeTitle : styles.title}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: colors.greyExtraLight2,
    backgroundColor: colors.greyWhite,
    borderRadius: 100,
    padding: 16,
    marginRight: 10,
    marginBottom: 16,
    flexDirection: 'row',
    width: 'auto',
  },
  activeButton: {
    borderColor: colors.primaryBlue,
  },
  isNone: {
    width: '100%',
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: colors.greyExtraLight2,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 6,
    marginRight: 10,
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  activeButtonConainer: {
    backgroundColor: colors.primaryBlue,
  },
  indicator: {
    width: 15,
    height: '100%',
    marginRight: 15,
    backgroundColor: colors.primaryBlue,
    borderTopLeftRadius: wp('3.3%'),
    borderBottomLeftRadius: wp('3.3%'),
    marginLeft: -wp('3%'),
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: wp('4%'),
  },
  title: {
    color: colors.greyMed,
    fontFamily: 'Museo_500',
    lineHeight: 21,
  },
  activeTitle: {
    color: colors.primaryBlue,
    fontFamily: 'Museo_700',
    lineHeight: 21,
  },
  checkContainer: {
    margin: wp('6%'),
    height: Number(wp('10%')),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: colors.white,
    borderRadius: Number(wp('100%')),
    marginRight: 10,
  },
  innerRing: {
    width: 10,
    height: 10,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2.22,
    shadowOpacity: 0.22,
    borderRadius: Number(wp('100%')),
  },
});

export default ChipsButton;
