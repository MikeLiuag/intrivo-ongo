import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import InputLabel from '../../components/InputLabel';
import { BlueButton } from '../../components/Buttons/BlueButton';
// Svg-s
import LeftArrow from '../../components/Svg/arrowLeft';
import { LogEvent } from '../../analytics';

export default ({ navigation }) => {
  const { t } = useTranslation();

  useEffect(() => {
    LogEvent('ProfileSettingsEditPassword_screen');
  }, []);

  const handleBack = () => {
    LogEvent('ProfileSettingsEditPassword_click_Back');
    navigation.goBack();
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={{ flex: 1, backgroundColor: '#ffffff' }}
    >
      <View style={styles.profileHeader}>
        <TouchableOpacity style={styles.headerBtn} onPress={handleBack}>
          <LeftArrow />
        </TouchableOpacity>
        <View />
      </View>
      <LinearGradient
        colors={['#ffffff', '#F3F6FC']}
        start={{ x: 0, y: 0 }}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: hp('3%'),
                marginLeft: wp('4%'),
              }}
            >
              Change Your Password:
            </Text>
            <View style={styles.box}>
              <InputLabel label="Old Password" value="" />
              <InputLabel label="New Password" value="" />
              <InputLabel label="Confirm Password" value="" />
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 13,
                lineHeight: 25,
                marginVertical: hp('2%'),
                marginHorizontal: wp('4%'),
              }}
            >
              {t('passwordRequirment')}
            </Text>
            <View style={{ marginVertical: hp('3%') }}>
              <BlueButton
                title="Save Password"
                action={() => alert('pressed')}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerBtn: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  avatarBtn: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('2%'),
    backgroundColor: '#f4f4f4',
  },
  imageWrapper: {
    borderRadius: 100,
    width: wp('22%'),
    height: wp('22%'),
  },
  cameraIconWrapper: {
    position: 'absolute',
    backgroundColor: '#26A9E0',
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 0,
  },
  box: {
    backgroundColor: '#fff',
    padding: wp('4%'),
    borderRadius: wp('3%'),
    marginVertical: hp('1%'),
  },
  firstText: {
    fontSize: hp('2%'),
    color: '#949DB5',
  },
  secondText: {
    fontSize: hp('2.4%'),
    color: '#2D3142',
    paddingVertical: hp('0.5%'),
  },
});
