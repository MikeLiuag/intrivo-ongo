import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectorComponent from '../../components/SelectorComponent';

import { LogEvent } from '../../analytics';

import HeaderComp from '../../components/HeaderComp';
import useIsFloatingKeyboard from '../../utilis/keyboard';
import { useTranslation } from 'react-i18next';

export default ({ navigation, route }) => {
  const { uuid } = route.params;
  const { usersLookup, organizationsLookup } = useSelector((s) => s.user);
  const {t} = useTranslation();
  const user = usersLookup[uuid] || null;

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  useEffect(() => {
    LogEvent('ProfileOrganizations_screen');
  }, []);

  const handleBack = () => {
    LogEvent('ProfileOrganizations_click_Back');
    navigation.goBack();
  }

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={{ flex: 1, backgroundColor: '#F8F8FC' }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingBottom: hp('2%'), backgroundColor: '#F8F8FC' }}
        enabled={!floating}
      >
        <HeaderComp
          center={[t('screens.org.listHeader'), styles.headerTitle]}
          left="arrow"
          onLeftClick={handleBack}
          addStyle={styles.profileHeader}
        />
        <LinearGradient
          colors={['#F8F8FC', '#F8F8FC']}
          start={{ x: 0, y: 0 }}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={styles.container}>
              <SelectorComponent
                style={{ paddingLeft: 24, fontSize: 14 }}
                type="image"
                data={user.organizations?.map(({ uuid: orgId }) => {
                  const { image, name } = organizationsLookup[orgId];
                  return {
                    title: name,
                    icon: (
                      <View style={styles.iconBackground}>
                        <Image style={styles.image} source={{ uri: image }} />
                      </View>
                    ),
                    onClick: () => {
                      LogEvent('ProfileOrganizations_click_Org');
                      navigation.navigate('Organization', { id: orgId });
                    },
                  };
                })}
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: '100%',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  indicatorView: {
    height: '100%',
    width: '100%',
    marginTop: '50%',
  },
  image: {
    width: 36,
    height: 36,
  },
  iconBackground: {
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: wp('6.4%'),
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
    borderColor: '#D8E1F8',
  },
  profileRowMiddle: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginRight: wp('6.4%'),
    marginLeft: wp('6.4%'),
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 20,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderColor: '#D8E1F8',
  },
  profileRowOne: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginRight: wp('6.4%'),
    marginLeft: wp('6.4%'),
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 20,
    paddingBottom: 16,
  },
  textSection: {
    width: wp('42%'),
    marginRight: wp('13%'),
  },
  profileText: {
    fontSize: 14,
    fontWeight: '700',
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
    borderColor: '#D8E1F8',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8FC',
    paddingVertical: hp('2.5%'),
    marginHorizontal: wp('6.4%'),
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 30,
  },
});
