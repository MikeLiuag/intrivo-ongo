import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { LogEvent } from '../../../analytics';
import HeaderComp from '../../../components/HeaderComp';
import OtherTheCounterSVG from '../../../components/Svg/Solutions/OtherTheCounterSVG';
import RequestMedicationSVG from '../../../components/Svg/Solutions/RequestMedicationSVG';
import TalkToMedicalSVG from '../../../components/Svg/Solutions/TalkToMedicalSVG';
import TestForFLuSVG from '../../../components/Svg/Solutions/TestForFLuSVG';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';
import { openLink } from '../../../utilis/link';
import { BlueButton } from '../../../components/Buttons/BlueButton';
import {
  resetSnifflesInProgress,
  setSnifflesState,
  snifflesFieldNames,
} from '../../../store/sniffles/slice';
import { setMedicationState } from '../../../store/medicationFlow/slice';

const translationPath = 'screens.sniffles.solutions';

const solutions = [
  {
    title: 'Request medication online',
    subtitle: 'for Flu or Strep',
    icon: <RequestMedicationSVG />,
    action: 'navigate',
    to: 'MedicationIntro',
    analytic: 'treat',
  },
  {
    title: 'Talk virtually to a medical expert',
    subtitle: 'to get help now',
    icon: <TalkToMedicalSVG />,
    action: 'navigate',
    to: 'SnifflesTelehealthIntro',
    analytic: 'virtual',
  },
  {
    title: 'In-home testing with medical pro',
    subtitle: 'for Flu, Strep and RSV',
    icon: <TestForFLuSVG />,
    action: 'navigate',
    to: 'SnifflesIntro',
    analytic: 'poc',
  },
  {
    title: 'Over the counter treatment',
    subtitle: 'deliver to your door',
    icon: <OtherTheCounterSVG />,
    action: 'link',
    to: 'https://www.amazon.com/ideas/amzn1.account.AGLI6I7VGYYDRGRFEI3AE6XC2JFA?ref=idea_yil_tab',
    analytic: 'otc',
  },
];

const IntroToSolutions = () => {
  const { users } = useSelector((s) => s.user);
  const { promoCode, isRedeemed } = useSelector(({ sniffles }) => sniffles);
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const flowName = route.params.flow;
  const { showReset, flow } = route.params;

  useEffect(() => {
    LogEvent(`Sniffles_Quiz${flowName}_MenuA_screen`);
    // if we are coming from flow B, then we don't want to change the entry point for flow A from the home screen
    if (flow !== 'B')
      dispatch(setSnifflesState({ value: true, fieldName: snifflesFieldNames.INPROGRESS }));
  }, [dispatch, flowName, flow]);

  const onBackPress = () => {
    LogEvent(`Sniffles_Quiz${flowName}_MenuA_click_Back`);
    navigation.goBack();
  };

  const onClosePress = () => {
    LogEvent(`Sniffles_Quiz${flowName}_MenuA_click_Close`);
    navigation.navigate('Home');
  };

  const onItemPress = ({ action, to, analytic }) => {
    LogEvent(`Sniffles_Quiz${flowName}_MenuA_click_${analytic}`);
    if (action === 'navigate') {
      if (to === 'MedicationIntro') {
        dispatch(setMedicationState({ value: promoCode, fieldName: 'promoCode' }));
        dispatch(setMedicationState({ value: isRedeemed, fieldName: 'isRedeemed' }));
      }
      navigation.navigate(to, {
        userId: users[0],
      });
    }

    if (action === 'link') openLink(navigation, true, { url: to, useWebView: false });
  };

  const onReset = () => {
    LogEvent(`Sniffles_Quiz${flowName}_Reset_click`);
    dispatch(resetSnifflesInProgress());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }, { name: 'TestRulingOut' }],
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComp
        left={showReset ? undefined : 'arrow'}
        onLeftClick={onBackPress}
        right={['x', onClosePress]}
        addStyle={styles.header}
      />
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.subtitle}>{t(`${translationPath}.title2`)}</Text>
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={solutions}
          key={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.actionContainer} onPress={() => onItemPress(item)}>
              <View style={styles.iconContainer}>{item.icon}</View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {showReset && (
        <BlueButton
          style={styles.secondaryButton}
          styleText={styles.secondaryButtonText}
          title={t(`${translationPath}.button`)}
          action={onReset}
        />
      )}
    </SafeAreaView>
  );
};

export default IntroToSolutions;

const styles = StyleSheet.create({
  header: {
    paddingRight: 24,
    paddingLeft: 12,
    paddingTop: 12,
  },
  container: {
    flex: 1,
  },
  subtitle: {
    fontFamily: fonts.familyBold,
    fontSize: 24,
    textAlign: 'left',
  },
  actionContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    marginVertical: 8,
    marginHorizontal: 24,
    borderRadius: 16,
    borderColor: colors.greyExtraLight,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.primaryPavement,
    borderRadius: 8,
    height: 40,
    width: 40,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 16,
  },
  title: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    lineHeight: 21,
    color: colors.greyMidnight,
  },
  text: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeSmall,
    lineHeight: 18,
    color: colors.greyGrey,
  },
  infoContainer: {
    paddingHorizontal: 24,
    marginVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderColor: colors.greyLight,
    marginHorizontal: 24,
    marginBottom: 24,
    marginTop: 12,
  },
  secondaryButtonText: {
    color: colors.greyDark2,
    fontFamily: 'Museo_700',
    fontSize: 16,
  },
});
