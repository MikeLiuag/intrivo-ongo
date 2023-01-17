import React, { useEffect, useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComp from '../components/HeaderComp';
import { colors } from '../theme';
import { BlueButton } from '../components/Buttons/BlueButton';
import CompletedScreen from '../components/CompletedScreen';
import { deleteAccount } from '../store/app/slice';
import { deleteDependent, fetchActivities } from '../store/user/slice';
import { LogEvent, SetCurrentScreen } from '../analytics';

export default ({ route }) => {
  const { isMainUser } = route.params;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { users, usersLookup } = useSelector((s) => s.user);

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    SetCurrentScreen('ProfileSettingsDelete_screen');
    LogEvent('ProfileSettingsDelete_screen');
  }, []);

  const onSubmit = async () => {
    const user = usersLookup[users[0]];
    let response;
    LogEvent('ProfileSettingsDelete_click_Submit');
    if (isMainUser) {
      response = await dispatch(deleteAccount({ uuid: user.uuid, email: user.email }));
    } else {
      response = await dispatch(deleteAccount({ uuid: route.params.uuid, email: user.email }));
      dispatch(fetchActivities());
    }
    if (response?.type.includes('fulfilled')) {
      setModalVisible(true);
    }
  };

  const navigate = () => {
    setModalVisible(false);
    if (isMainUser) {
      navigation.navigate('AccSettingsScreen', { isFromDeleteAccount: true });
    } else {
      navigation.pop(3);
    }
  };

  const goBack = () => {
    LogEvent('ProfileSettingsDelete_click_Back');
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <HeaderComp
        center={[t('screens.deleteAccount.title'), styles.headerTitle]}
        left='arrow'
        onLeftClick={goBack}
        addStyle={styles.header}
      />
      <View style={styles.content}>
        <Text style={styles.contentRegular}>
          {t('screens.deleteAccount.content1')}
          <Text style={styles.contentBold}>{t('screens.deleteAccount.content2')}</Text>
          {t('screens.deleteAccount.content3')}
          <Text style={styles.contentRegular}>{t('screens.deleteAccount.content4')}</Text>
          {t('screens.deleteAccount.content5')}
          <Text style={styles.contentBold}>{t('screens.deleteAccount.content6')}</Text>
        </Text>
      </View>
      <View style={styles.footer}>
        <BlueButton
          style={styles.buttonSecondary}
          styleText={styles.buttonSecondaryTitle}
          title={t('screens.deleteAccount.cancel')}
          action={() => {
            LogEvent('ProfileSettingsDelete_click_Cancel');
            navigation.goBack();
          }}
        />
        <BlueButton
          style={styles.buttonPrimary}
          styleText={styles.buttonPrimaryTitle}
          title={t('screens.deleteAccount.submit')}
          action={onSubmit}
        />
      </View>
      {isModalVisible && (
        <CompletedScreen
          title={t('screens.deleteAccount.submittedTitle')}
          descr={' '}
          visible={isModalVisible}
          animated
          result={2}
          setModal={navigate}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('2.5%'),
    marginHorizontal: wp('3.5%'),
  },
  headerTitle: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Museo_700',
  },
  content: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  contentRegular: {
    fontSize: 16,
    fontFamily: 'Museo_300',
    color: colors.greyMed,
    lineHeight: 24,
  },
  contentBold: {
    fontSize: 16,
    fontFamily: 'Museo_700',
    color: colors.greyMed,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    marginVertical: hp('5%'),
    alignItems: 'center',
    lineHeight: 24,
  },
  buttonPrimary: {
    flex: 1,
    marginLeft: 10,
    marginRight: 20,
  },
  buttonPrimaryTitle: {
    fontSize: 16,
    fontFamily: 'Museo_700',
    color: colors.greyWhite,
  },
  buttonSecondary: {
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
    backgroundColor: colors.greyWhite,
    borderColor: colors.secondaryButtonBorder,
  },
  buttonSecondaryTitle: {
    fontSize: 16,
    fontFamily: 'Museo_700',
    color: colors.greyDark2,
  },
});
