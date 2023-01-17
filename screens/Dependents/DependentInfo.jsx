import React, { useEffect, } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ProfileIcon from '../../components/Svg/profileIcon';
import ArrowIcon from '../../components/Svg/arrowRightIcon';
import BuildingIcon from '../../components/Svg/buildingIcon';

import CheckMarkIcon from '../../components/Svg/checkMarkIcon';

import { colors } from '../../theme/index';

import HeaderComp from '../../components/HeaderComp';
import { LogEvent } from '../../analytics';

export default ({ navigation, route }) => {
  const { uuid } = route.params || {};
  const { usersLookup } = useSelector((s) => s.user);

  const {t} = useTranslation();

  const user = usersLookup[uuid] || {};

  useEffect(() => {
    LogEvent('ProfileDependentsEntry_screen');
  },[])

  const handleBack = () => {
    LogEvent('ProfileDependentsEntry_click_Close');
    navigation.goBack()
  }

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={{ flex: 1, backgroundColor: colors.primaryGhost }}
    >
      <HeaderComp
        center={[`${user?.first_name} ${user?.last_name}`, styles.headerTitle]}
        left="arrow"
        onLeftClick={handleBack}
        addStyle={styles.profileHeader}
      />
      <View style={{ paddingTop: 40 }}>
        <TouchableOpacity
          onPress={() => {
            LogEvent('ProfileDependentsEntry_click_Info');
            navigation.navigate('DependentEdit', {
              uuid,
            });
          }}
        >
          <View
            style={[
              styles.profileRowFirst,
              !user.is_member_of_organization ? styles.profileRowLast : {},
            ]}
          >
            <View style={styles.iconBackground}>
              <ProfileIcon color={colors.primaryYellow} />
            </View>
            <View style={styles.textSection}>
              <Text style={styles.profileText}>{t('screens.dependent.info.basic')}</Text>
            </View>
            <ArrowIcon color={colors.greyDark} />
          </View>
        </TouchableOpacity>
        {user.is_member_of_organization ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Routines', {
                uuid,
              });
            }}
          >
            <View style={styles.profileRow}>
              <View style={styles.iconBackground}>
                <CheckMarkIcon color={colors.primaryYellow} />
              </View>
              <View style={styles.textSection}>
                <Text style={styles.profileText}>{t('screens.dependent.info.routine')}</Text>
              </View>
              <ArrowIcon color={colors.greyDark} />
            </View>
          </TouchableOpacity>
        ) : null}
        {user.is_member_of_organization ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('OrganizationList', {
                uuid,
              });
            }}
          >
            <View style={styles.profileRowLast}>
              <View style={styles.iconBackground}>
                <BuildingIcon color={colors.primaryYellow} />
              </View>
              <View style={styles.textSection}>
                <Text style={styles.profileText}>{t('screens.dependent.info.org')}</Text>
              </View>
              <ArrowIcon color={colors.greyDark} />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerBtn: {
    marginRight: wp('4%'),
  },
  modalView: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    height: 'auto',
    bottom: 0,
  },
  modalRowFirst: {
    marginRight: wp('6.4%'),
    marginLeft: wp('6.4%'),
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('5%'),
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderColor: '#D6D6D6',
    borderWidth: 1,
  },
  rowText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  modalRow: {
    marginRight: wp('6.4%'),
    marginLeft: wp('6.4%'),
    borderRadius: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderColor: '#D6D6D6',
    borderWidth: 1,
  },
  rowTextCancel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EB5757',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primaryGhost,
    paddingVertical: hp('2.5%'),
    marginHorizontal: wp('3.5%'),
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textSection: {
    flex: 1,
  },
  profileText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.greyDark,
  },
  profileRowFirst: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    marginRight: wp('6.4%'),
    marginLeft: wp('6.4%'),
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 20,
    paddingBottom: 16,
  },
  profileRowLast: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    marginRight: wp('6.4%'),
    marginLeft: wp('6.4%'),
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 20,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderColor: colors.primaryGhost,
  },
  profileRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginRight: wp('6.4%'),
    marginLeft: wp('6.4%'),
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 20,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderColor: colors.primaryGhost,
  },
  iconBackground: {
    borderRadius: 50,
    backgroundColor: colors.tidePool,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('6.4%'),
  },
});
