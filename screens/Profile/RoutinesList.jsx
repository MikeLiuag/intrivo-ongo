import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { getRoutines, getTasks } from '../../store/user/slice';
import { LogEvent } from '../../analytics';
import Routine from '../../components/Routine';
import HeaderComp from '../../components/HeaderComp';
import useIsFloatingKeyboard from '../../utilis/keyboard';

export default ({ navigation, route }) => {
  const { uuid } = route.params || {};
  const { routines: routineArray = [] } = useSelector((s) => s.user);

  const routines = routineArray.filter((r) => r.userId === uuid) || [];

  // fix for keyboard
  const floating = useIsFloatingKeyboard();

  useEffect(() => {
    LogEvent('ProfileRoutines_screen');
  }, []);

  const handleBack = () => {
    LogEvent('ProfileRoutines_click_Back');
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
          center={['Routines', styles.headerTitle]}
          left="arrow"
          onLeftClick={handleBack}
          addStyle={styles.profileHeader}
        />
        <LinearGradient
          colors={['#ffffff', '#ffffff']}
          start={{ x: 0, y: 0 }}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={styles.container}>
              {routines?.map((item) => (
                <Routine navigation={navigation} color="#F2F7F9" item={item} />
              ))}
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: wp('6.4%'),
    marginRight: wp('6.4%'),
    alignItems: 'center',
    height: '100%',
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
  indicatorView: {
    height: '100%',
    width: '100%',
    marginTop: '50%',
  },
  image: {
    width: 36,
    height: 36,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: hp('2.5%'),
    marginHorizontal: wp('6.4%'),
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 30,
  },
});
