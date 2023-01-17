import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
  ScrollView,
  Text,
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
import { useTranslation } from 'react-i18next';
import Routine from '../../components/Routine';
import HeaderComp from '../../components/HeaderComp';
import useIsFloatingKeyboard from '../../utilis/keyboard';
import { LogEvent } from '../../analytics';

export default ({ route, navigation }) => {
  const uuid = route?.params?.id;
  const {t} = useTranslation();
  const { organizationsLookup, routineStatuses: routinesArray = [] } =
    useSelector((s) => s.user);

  const organizationDetails = organizationsLookup[uuid];

  useEffect(() => {
    LogEvent('ProfileOrganizationsDetails_screen')
  },[])

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  const routines = routinesArray?.filter((r) => r.orgId === uuid);

  const handleBack = () => {
    LogEvent('ProfileOrganizationsDetails_click_Back');
    navigation.goBack();
  }

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={{ flex: 1, backgroundColor: '#ffffff' }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingBottom: hp('2%'), backgroundColor: '#ffffff' }}
        enabled={!floating}
      >
        <HeaderComp
          center={[organizationDetails.name, styles.headerTitle]}
          left="arrow"
          onLeftClick={handleBack}
          // right={[<DotsIcon />]}
          addStyle={styles.profileHeader}
        />
        <LinearGradient
          colors={['#ffffff', '#FFFFFF']}
          start={{ x: 0, y: 0 }}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: organizationDetails.image,
                  }}
                />
              </View>
              {/* <View style={styles.descriptionContainer}>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionLabel}>Contact name</Text>
                  <Text style={styles.descriptionText}>
                    {organizationDetails.contact_name}
                  </Text>
                </View>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionLabel}>Contact email</Text>
                  <Text style={styles.descriptionText}>
                    {organizationDetails.contact_email}
                  </Text>
                </View>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionLabel}>Contact phone</Text>
                  <Text style={styles.descriptionText}>
                    {organizationDetails.contact_phone}
                  </Text>
                </View>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionLabel}>Help and Support</Text>
                  <Text style={styles.descriptionText}>View the FAQ</Text>
                </View>
              </View>
              <View style={styles.seperatorLine} /> */}
              <Text style={styles.routinesHeader}>{t('screens.org.activeRout')}</Text>
              {routines && (
                <View style={styles.routinesContainer}>
                  <View>
                    {routines.map(({ image, ...item }) => (
                      <Routine
                        color="#F2F7F9"
                        item={item}
                        navigation={navigation}
                      />
                    ))}
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: wp('7%'),
    marginRight: wp('7%'),
    flexDirection: 'column',
    height: '100%',
  },
  routinesContainer: {
    marginTop: 17,
    width: '100%',
  },
  routineContainer: {
    backgroundColor: '#F2F7F9',
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 10,
    paddingRight: 24,
    marginBottom: 16,
  },
  routineIcon: {
    width: '60%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 300,
    overflow: 'hidden',
    marginLeft: 5,
  },
  routineHeader: {
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: 0.005,
    color: '#333333',
  },
  routineDescription: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.005,
    color: '#999999',
  },
  routineAction: {
    width: 100,
    height: 45,
    borderRadius: 16,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routineActionText: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 17,
  },
  sectionHeading: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    lineHeight: 24,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#ADADAD',
  },
  routinesHeader: {
    marginTop: 30,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 40,
  },
  descriptionRow: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionLabel: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: '#5C5C5C',
  },
  descriptionText: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 14,
    color: '#ADADAD',
  },
  seperatorLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#EBEBEB',
    marginTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  patternSection: {
    marginTop: hp('14%'),
  },
  doneSection: {
    marginTop: hp('21.5%'),
    width: '100%',
    alignItems: 'center',
  },
  doneText: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: '500',
    color: '#2A4D9B',
  },
  rowText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  rowTextCancel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EB5757',
  },
  modalView: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    height: hp('23%'),
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
  heightPicker: {
    width: wp('46%'),
    maxHeight: hp('8.5%'),
    minHeight: hp('8.5%'),
    position: 'relative',
    textAlign: 'center',
    borderWidth: 2,
    paddingHorizontal: hp('0.5%'),
    paddingTop: hp('2.6%'),
    paddingBottom: 6,
    fontSize: 20,
    borderColor: '#D6D6D6',
    borderRadius: hp('2%'),

    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  measureContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  birthday: {
    position: 'relative',
  },
  inputContainer: {
    width: '100%',
    borderRadius: 16,
    height: Platform.OS === 'ios' ? 77 : 68,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D6D6D6',
    marginBottom: Number(hp('1%')),
    borderWidth: 2,
    backgroundColor: '#fff',
    marginVertical: hp('1%'),
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: hp('2.5%'),
    marginHorizontal: wp('3.5%'),
  },
  headerBtn: {
    marginLeft: wp('3.5%'),
    paddingVertical: hp('2%'),
    width: '7%',
  },
  headerBtn2: {
    marginRight: wp('3.5%'),
    paddingVertical: hp('2%'),
    width: '7%',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    width: '76%',
    textAlign: 'center',
  },
});
