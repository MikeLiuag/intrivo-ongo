import React, { createElement } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getNativeSourceAndFullInitialStatusForLoadAsync } from 'expo-av/build/AV';
import CheckmarkSvg from '../Svg/checkMarkExtraThinSvg';
import { colors } from '../../theme';
import { parseHtmlForTags } from '../../helpers/functions';

const SelectButton = ({
  title,
  subTitle,
  action,
  error,
  active,
  checkmark,
  withIndicator,
  buttonStyle = {},
  titleStyle = {},
  subTitleStyle = {},
  showBottomLink = false,
  bottomLinkText = '',
  bottomLinkClick,
  disableLeftBackground = true,
  borders = false,
}) => {
  const tagStyleObj = {
    blue: styles.blue,
    purple: styles.purple,
  };
  return (
    <View
      style={[
        styles.button,
        buttonStyle,
        !borders && {
          backgroundColor: active && !disableLeftBackground ? '#2A4D98' : '#fff',
          borderColor: active ? '#D5D5D5' : '#EFEFEF',
        },
      ]}
    >
      <TouchableOpacity style={[styles.buttonContainer]} onPress={action ? () => action() : null}>
        {active && withIndicator && <View style={styles.indicator} />}
        <View style={[styles.titleContainer, { paddingLeft: !disableLeftBackground ? 15 : 0 }]}>
          <Text style={[styles.title, titleStyle]}>
            {parseHtmlForTags(title, tagStyleObj).map((e) =>
              createElement(Text, { style: e.style }, e.child)
            )}
          </Text>
          {subTitle && (
            <Text style={[styles.subTitle, subTitleStyle]}>
              {parseHtmlForTags(subTitle, tagStyleObj).map((e) =>
                createElement(Text, { style: e.style }, e.child)
              )}
            </Text>
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
      </TouchableOpacity>
      {showBottomLink && active ? (
        <TouchableOpacity onPress={bottomLinkClick} style={styles.bottomLink}>
          <Text style={styles.bottomLinkText}>{bottomLinkText}</Text>
        </TouchableOpacity>
      ) : (
        getNativeSourceAndFullInitialStatusForLoadAsync
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: hp('1%'),
    borderRadius: Number(wp('3%')),
    borderBottomColor: colors.secondaryButtonBorder,
    position: 'relative',
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: wp('3%'),
    borderTopRightRadius: wp('3.3%'),
    borderBottomRightRadius: wp('3.3%'),
    backgroundColor: colors.greyWhite,
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
    width: 32,
    height: 32,
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
    width: 20,
    height: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
    shadowRadius: 2.22,
    shadowOpacity: 0.22,
    borderRadius: Number(wp('100%')),
  },
  blue: {
    color: 'blue',
  },
  purple: {
    color: 'purple',
  },
  bottomLink: { marginBottom: 15, marginLeft: wp('3%') },
  bottomLinkText: {
    color: colors.primaryBlue,
    fontSize: 14,
    fontFamily: 'Museo_500',
  },
});

export default SelectButton;
