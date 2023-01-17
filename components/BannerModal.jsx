import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { setAppBannerModalData } from '../store/app/slice';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import CloseIcon from './Svg/close';
import InfoSVG from './Svg/info';

function BannerModal() {
  const dispatch = useDispatch();
  const {
    app: { isAuthed, appBannerModalData = null },
  } = useSelector(({ app, user }) => ({ app, user }));
  const isShow = useMemo(() => isAuthed && !!appBannerModalData, [isAuthed, appBannerModalData]);

  const handleClose = () => {
    dispatch(setAppBannerModalData(null));
  };

  const handleCTAPress = () => {
    handleClose();
    if (appBannerModalData.cta) appBannerModalData.cta.callback();
  };

  return (
    isShow && (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <InfoSVG />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{appBannerModalData.title}</Text>
          <Text style={styles.body}>{appBannerModalData.body}</Text>
          <Text style={styles.link} onPress={handleCTAPress}>
            {appBannerModalData.cta?.text || 'Go'}
          </Text>
        </View>
        <Pressable
          style={styles.validationBoxClose}
          hitSlop={{
            top: 20,
            bottom: 20,
            left: 50,
            right: 50,
          }}
          onPress={handleClose}
        >
          <CloseIcon width={wp('3%')} height={wp('3%')} />
        </Pressable>
      </View>
    )
  );
}

export default BannerModal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
    zIndex: 999,
    marginTop: 80,
    borderColor: colors.primaryBlue,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    width: wp('90%'),
    padding: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyBold,
    lineHeight: 20,
  },
  body: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyNormal,
    lineHeight: 20,
    color: colors.greyDark,
  },
  validationBoxClose: {
    justifyContent: 'center',
  },
  link: {
    fontSize: fonts.sizeNormal,
    fontFamily: fonts.familyNormal,
    lineHeight: 20,
    color: colors.primaryBlue,
  },
  iconContainer: {
    justifyContent: 'center',
    marginRight: 16,
  },
});
