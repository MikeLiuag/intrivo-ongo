import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import HeaderComp from '../../components/HeaderComp';
import { colors } from '../../theme';
import { BlueButton } from '../../components/Buttons/BlueButton';
import InputLeftLabel from '../../components/InputLeftLabel';
import { getEventPromoCodeUrl, getEventDetailsByCode } from '../../store/events/slice';
import { checkCodeType } from '../../store/app/slice';
import DependentsList from '../Dependents/DependentsList';
import { getOrganizationDetailsByCode } from '../../store/bulkTesting/slice';
import { LogEvent } from '../../analytics';
import { setSnifflesState } from '../../store/sniffles/slice';
import { setMedicationState } from '../../store/medicationFlow/slice';
import { openLink } from '../../utilis/link';

const EventCode = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [code, setCode] = useState('');

  const { t } = useTranslation();

  const currentEvent = useSelector((state) => state.events.currentEvent);
  const users = useSelector((state) => state.bulkTesting?.organizationDetails?.users) || [];
  const { users: userList } = useSelector((s) => s.user);
  const { shopLink } = useSelector((s) => s.app);

  // test stuff
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    LogEvent('EnterCode_screen');
  }, []);

  const onContinueWithSnifflesAssessmentCode = () => {
    dispatch(setSnifflesState({ value: code, fieldName: 'promoCode' }));
    dispatch(setSnifflesState({ value: true, fieldName: 'isRedeemed' }));
    return navigation.navigate('TestRulingOut');
  };

  const onContinueWithSnifflesTelehealthCode = () => {
    dispatch(setSnifflesState({ value: code, fieldName: 'promoCode' }));
    dispatch(setSnifflesState({ value: true, fieldName: 'isRedeemed' }));
    return navigation.navigate('SnifflesTelehealthIntro');
  };

  const onContinueWithSnifflesMedicationCode = async () => {
    await dispatch(setMedicationState({ value: code, fieldName: 'promoCode' }));
    await dispatch(setMedicationState({ value: true, fieldName: 'isRedeemed' }));
    navigation.navigate('MedicationIntro', {
      userId: userList[0],
    });
  };

  const onContinueWithShopifyCode = async () => {
    const { payload } = await dispatch(getEventPromoCodeUrl(code));
    const url = payload?.promo_code?.url;
    if (url) {
      return openLink(navigation, false, { url, useWebView: true });
    }
    return false;
  };

  const onContinueWithPOCCode = async () => {
    dispatch(setSnifflesState({ value: code, fieldName: 'promoCode' }));
    dispatch(setSnifflesState({ value: true, fieldName: 'isRedeemed' }));
    return navigation.navigate('SnifflesIntro');
  };

  const onContinue = async () => {
    LogEvent('EnterCode_click_Next');
    const { payload } = await dispatch(checkCodeType(code));
    const { subtype } = payload;

    switch (subtype) {
      case '2gather':
        navigation.navigate('CreateEvent', { promoCode: code });
        break;
      case 'event':
        dispatch(getEventDetailsByCode(code));
        break;
      case 'discount_code':
        openLink(navigation, false, {
          url: shopLink.concat('?discount_code=').concat(code),
          useWebView: true,
        });
        break;
      case 'org': {
        await dispatch(getOrganizationDetailsByCode(code));
        return setPressed(true);
      }
      case 'sniffles_discount':
        onContinueWithSnifflesAssessmentCode();
        break;
      case 'sniffles_medication':
        onContinueWithSnifflesMedicationCode();
        break;
      case 'sniffles_telehealth':
        onContinueWithSnifflesTelehealthCode();
        break;
      case 'sniffles_observation':
        onContinueWithPOCCode();
        break;
      case 'shopify':
        onContinueWithShopifyCode();
        break;
      default:
        return true;
    }

    return false;
  };

  useEffect(() => {
    if (route?.params?.codeCoupon) {
      setCode(route?.params?.codeCoupon.toUpperCase());
    }
    if (currentEvent?.code === code) {
      navigation.replace('EventInfo', { item: currentEvent });
    }
  }, [code, currentEvent, navigation, route?.params?.codeCoupon]);

  if (pressed) {
    return (
      <DependentsList
        title={t('event.dependentList.subtitle')}
        onSelectUser={(dependentUUID) => {
          navigation.navigate('OrganizationDetails', { code, dependentUUID });
        }}
        header={t('event.dependentList.title')}
        headerLeft={null}
        headerRight={[
          'x',
          () => {
            LogEvent('EnterCode_click_Close');
            navigation.navigate('Dashboard');
          },
        ]}
        hideArrows
        disabledUsers={users}
        addNewStyle='list'
        includeSelf
        from='InviteCode'
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <HeaderComp
          left='arrow'
          onLeftClick={() => {
            LogEvent(`EnterCode_click_Back`);
            navigation.goBack();
          }}
          right={[
            'x',
            () => {
              LogEvent('EnterCode_click_Close');
              navigation.goBack();
            },
          ]}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{t('event.eventCode.title')}</Text>
        <Text style={styles.subtitle}>{t('event.eventCode.subtitle')}</Text>
        <InputLeftLabel
          placeholder={t('event.eventCode.enter')}
          value={code}
          autoCapitalize='characters'
          action={(value) => setCode(value.toUpperCase())}
        />
      </View>
      <BlueButton
        title={t('event.eventCode.button')}
        style={{ marginHorizontal: 24, marginBottom: 10 }}
        styleText={styles.whiteText}
        disabled={code.length < 6}
        action={onContinue}
      />
    </SafeAreaView>
  );
};

export default EventCode;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  imageContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 14,
    backgroundColor: colors.primaryPavement,
    borderRadius: 16,
    marginVertical: 40,
  },
  whiteText: {
    fontFamily: 'Museo_500',
    fontSize: 16,
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 24,
    lineHeight: 36,
    color: colors.black,
  },
  subtitle: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    lineHeight: 22,
    color: colors.greyMed,
    marginTop: 6,
    marginBottom: 32,
  },
});
