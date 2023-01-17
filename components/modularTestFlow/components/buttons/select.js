import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckmarkSvg from '../../../Svg/checkMarkExtraThinSvg';
import { colors } from '../../../../theme';
import FormattedText from '../formattedText';
import parseForVars from '../../utils/parser';

const Select = ({
  title,
  subTitle,
  action,
  error,
  active,
  checkmark,
  disableLeftBackground = false,
  titleStyle = {},
  subTitleStyle = {},
  vars,
  boxContainer,
  containerStyle,
  icon,
}) => {
  const getBorderColor = () => {
    if (active) {
      if (icon) {
        return colors.primaryBlue;
      }
      return colors.secondaryButtonBorder;
    }
    return colors.greyExtraLight2;
  };
  if (boxContainer) {
    return (
      <TouchableOpacity
        style={[
          styles.boxContainer,
          { borderColor: active ? colors.secondaryButtonBorder : colors.greyExtraLight2 },
        ]}
        onPress={action ? () => action() : null}
      >
        <View style={{ flex: 2 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.boxSubtitle}>{subTitle}</Text>
        </View>
        <View style={{ fledx: 1, alignItems: 'flex-end' }}>
          <CheckmarkSvg
            width={Number(wp('8%'))}
            height={Number(wp('5%'))}
            color={active ? '#2A4D98' : '#F3F6FC'}
          />
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      key={title}
      style={[
        styles.button,
        containerStyle,
        {
          backgroundColor: active && !disableLeftBackground ? '#2A4D98' : '#fff',
          borderColor: getBorderColor(),
        },
      ]}
      onPress={action ? () => action() : null}
    >
      <View style={[styles.buttonContainer, {}]}>
        {icon && (
          <View style={styles.iconContainer}>
            <Image source={icon} style={{ width: 16, height: 16 }} />
          </View>
        )}
        <View style={styles.titleContainer}>
          <FormattedText style={{ ...styles.title, ...titleStyle }}>
            {parseForVars(title, vars)}
          </FormattedText>
          {subTitle && (
            <FormattedText style={[styles.subTitle, subTitleStyle]}>
              {parseForVars(subTitle, vars)}
            </FormattedText>
          )}
          {active && error && (
            <Text paddings={`${hp('1%')}px 0`} textColor='#B00020' fontSize={Number(wp('3.8%'))}>
              {error}
            </Text>
          )}
        </View>
        {checkmark ? (
          <View style={styles.checkContainer}>
            <CheckmarkSvg
              width={Number(wp('8%'))}
              height={Number(wp('5%'))}
              color={active ? '#2A4D98' : '#F3F6FC'}
            />
          </View>
        ) : (
          <View style={styles.ring}>
            <View style={[styles.innerRing, { backgroundColor: active ? '#2A4D98' : '#FFF' }]} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: hp('1%'),
    borderRadius: Number(wp('3%')),
    borderWidth: 1,
    borderColor: '#EFEFEF',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('3%'),
    borderTopRightRadius: wp('2.5%'),
    borderBottomRightRadius: wp('2.5%'),
    backgroundColor: colors.greyWhite,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: wp('4%'),
    paddingLeft: hp('1.5%'),
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Museo_700',
    lineHeight: 19,
  },
  subTitle: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Museo_500',
    lineHeight: 17,
  },
  checkContainer: {
    margin: wp('6%'),
    height: Number(wp('10%')),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    width: Number(wp('10%')),
    height: Number(wp('10%')),
    margin: wp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: Number(wp('100%')),
  },
  innerRing: {
    width: Number(wp('6%')),
    height: Number(wp('6%')),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
    shadowRadius: 2.22,
    shadowOpacity: 0.22,
    borderRadius: Number(wp('100%')),
  },
  boxContainer: {
    flex: 1,
    height: Number(hp('17%')),
    backgroundColor: colors.greyWhite,
    marginBottom: 16,
    marginHorizontal: 8,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
  },
  boxSubtitle: {
    fontFamily: 'Museo_300',
    fontSize: 13,
    lineHeight: 19,
    color: colors.greyDark2,
    marginTop: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.primaryPavement,
  },
});

export default Select;
