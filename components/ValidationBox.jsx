import React, { createElement } from 'react';
import { Text, View, StyleSheet, Pressable, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import ErrorIcon from './Svg/errorIcon';
import CloseIcon from './Svg/close';
import CheckmarkIcon from './Svg/circleCheckmark';
import { clearGlobalErrors } from '../store/app/slice';
import { colors } from '../theme';
import { parseHtmlForTags } from '../helpers/functions';
import { openLink } from '../utilis/link';

export default ({ error, action, success, hideX }) => {
  const { message = 'Error', subtitle = '' } = error;
  const dispatch = useDispatch();

  const tagStyleObj = {
    a: styles.blue,
  };

  return (
    <View
      style={{
        position: 'absolute',
        marginTop: 80,
        zIndex: Platform.OS === 'ios' ? 99999 : undefined,
      }}
    >
      <View
        style={[
          success ? { borderColor: colors.statusGreen } : { borderColor: colors.statusRed },
          styles.validationBox,
        ]}
      >
        <View style={styles.validationBoxIcon}>
          {success ? (
            <CheckmarkIcon width={26} height={26} color={colors.statusGreen} />
          ) : (
            <ErrorIcon />
          )}
        </View>
        <View style={styles.validationBoxText}>
          <Text style={styles.validationTitle}>{message}</Text>
          <Text style={styles.validationSubtitle}>
            {parseHtmlForTags(subtitle, tagStyleObj).map((e) => {
              if (e.attributes) {
                return createElement(
                  Text,
                  {
                    style: e.style,
                    onPress: () => {
                      openLink(null, true, { url: e.attributes.href, useWebView: false });
                    },
                  },
                  e.child
                );
              }
              return createElement(Text, { style: e.style }, e.child);
            })}
          </Text>
        </View>
        {hideX ? (
          <View />
        ) : (
          <Pressable
            style={styles.validationBoxClose}
            hitSlop={{
              top: 20,
              bottom: 20,
              left: 50,
              right: 50,
            }}
            onPress={action ? () => action() : () => dispatch(clearGlobalErrors())}
          >
            <CloseIcon width={wp('3%')} height={wp('3%')} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  validationBox: {
    backgroundColor: colors.greyWhite,
    position: 'absolute',
    top: hp('-3%'),
    left: 0,
    width: wp('84%'),
    marginHorizontal: wp('8%'),
    borderWidth: 1,
    zIndex: 9999,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  validationBoxIcon: {
    width: '15%',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
  },
  validationBoxText: {
    width: '75%',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
  },
  validationBoxClose: {
    width: '10%',
    height: '100%',
    alignItems: 'flex-end',
    paddingVertical: hp('4%'),
    paddingHorizontal: wp('4%'),
  },
  validationTitle: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#333',
  },
  validationSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.greyDark,
  },
  blue: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.primaryBlue,
  },
});
