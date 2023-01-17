import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { LogEvent } from '../../../analytics';
import HeaderComp from '../../../components/HeaderComp';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';
import { openLink } from '../../../utilis/link';
import { setMedicationState } from '../../../store/medicationFlow/slice';
import { BlueButton } from '../../../components/Buttons/BlueButton';
import {
  resetSnifflesInProgress,
  saveAndCleanSnifflesAssessment,
  setSnifflesState,
  snifflesFieldNames,
} from '../../../store/sniffles/slice';

const solutionAppointment = require('../../../assets/solutionAppointment.png');
const solutionTelehealth = require('../../../assets/solutionTelehealth.png');
const solutionMedication = require('../../../assets/solutionMedication.png');

const translationPath = 'screens.sniffles.solutionsOptionB';

const options = [
  {
    flow: 'medication',
    title: `${translationPath}.medication.title`,
    description: `${translationPath}.medication.description`,
    image: solutionMedication,
    price: '$19.99',
  },
  {
    flow: 'telehealth',
    title: `${translationPath}.telehealth.title`,
    description: `${translationPath}.telehealth.description`,
    image: solutionTelehealth,
    price: '$49.99',
  },
  {
    flow: 'appointment',
    title: `${translationPath}.appointment.title`,
    description: `${translationPath}.appointment.description`,
    image: solutionAppointment,
    price: '$99.99',
  },
  {
    flow: 'otcMedication',
    title: `${translationPath}.otcMedication.title`,
    description: `${translationPath}.otcMedication.description`,
    price: 'Prices vary',
    deeplink: '/',
  },
];

const IntroToSolutionsOptionB = ({ navigation, route }) => {
  const { users } = useSelector((s) => s.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isRedeemed, promoCode } = useSelector(({ sniffles }) => sniffles);

  const flowName = route.params.result;
  const { flow } = route.params;
  const { showReset } = route.params;

  const headerTitle = useMemo(() => {
    if (flowName === 'medication') return t(`${translationPath}.medication.headerTitle`);
    if (flowName === 'telehealth') return t(`${translationPath}.telehealth.headerTitle`);
    if (flowName === 'appointment') return t(`${translationPath}.appointment.headerTitle`);
    return null;
  }, [flowName, t]);

  const itemEvent = useMemo(() => {
    if (flowName === 'medication') return `TreatResultB`;
    if (flowName === 'telehealth') return `VirtualResultB`;
    if (flowName === 'appointment') return `POCResultB`;
    return null;
  }, [flowName]);

  const option = options.find((o) => o.flow === flowName) || {};
  const additionalOptions = options.filter((o) => o.flow !== flowName);

  useEffect(() => {
    LogEvent(`Sniffles_Quiz${flow}_${itemEvent}_screen`);
    // if we are coming from flow B, then we don't want to change the entry point for flow A from the home screen
    if (flow !== 'B')
      dispatch(setSnifflesState({ value: true, fieldName: snifflesFieldNames.INPROGRESS }));
  }, [dispatch, flow, itemEvent]);

  const onBackPress = () => {
    LogEvent(`Sniffles_Quiz${flow}_${itemEvent}_click_Back`);
    navigation.goBack();
  };

  const onReset = () => {
    LogEvent(`Sniffles_Quiz${flow}_${itemEvent}_click_Reset`);
    dispatch(saveAndCleanSnifflesAssessment());
    dispatch(resetSnifflesInProgress());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }, { name: 'TestRulingOut' }],
    });
  };

  const onClosePress = () => {
    LogEvent(`Sniffles_Quiz${flow}_${itemEvent}_click_Clos`.slice(0, 40));
    navigation.navigate('Home');
  };

  const onItemPress = async ({ flow: flowType }) => {
    if (flowType === 'telehealth') {
      LogEvent(`Sniffles_Quiz${flow}_${itemEvent}_click_Virtual`.slice(0, 40));
      navigation.navigate('SnifflesTelehealthIntro');
    }
    if (flowType === 'medication') {
      await dispatch(setMedicationState({ value: promoCode, fieldName: 'promoCode' }));
      await dispatch(setMedicationState({ value: isRedeemed, fieldName: 'isRedeemed' }));
      LogEvent(`Sniffles_Quiz${flow}_${itemEvent}_click_Treat`.slice(0, 40));
      navigation.navigate('MedicationIntro', { userId: users[0] });
    }
    if (flowType === 'appointment') {
      LogEvent(`Sniffles_Quiz${flow}_${itemEvent}_click_POC`);
      navigation.navigate('SnifflesIntro');
    }
    if (flowType === 'otcMedication') {
      LogEvent(`Sniffles_Quiz${flow}_${itemEvent}_click_OTC`);
      openLink(navigation, true, {
        url: 'https://www.amazon.com/ideas/amzn1.account.AGLI6I7VGYYDRGRFEI3AE6XC2JFA?ref=idea_yil_tab',
        useWebView: false,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComp
        left={showReset ? undefined : 'arrow'}
        onLeftClick={onBackPress}
        right={['x', onClosePress]}
        addStyle={styles.header}
      />
      <ScrollView style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
        </View>
        <TouchableOpacity style={styles.actionContainer} onPress={() => onItemPress(option)}>
          <View style={styles.textContainer}>
            <Image source={option?.image} style={styles.image} />
            <Text style={styles.title}>{t(option?.title)}</Text>
            <Text style={styles.description}>{t(option.description)}</Text>
            <Text style={{ ...styles.price, fontFamily: fonts.familyBold, marginTop: 12 }}>
              {option.price}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.subtitle}>{t(`${translationPath}.otherOptions`)}</Text>
        {additionalOptions.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.actionContainer}
            onPress={() => onItemPress(item)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>{t(item.title)}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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

export default IntroToSolutionsOptionB;

const styles = StyleSheet.create({
  header: {
    paddingRight: 24,
    paddingLeft: 12,
    paddingTop: 12,
  },
  container: {
    flex: 1,
  },
  headerTitle: {
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
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    lineHeight: 21,
    color: colors.greyMidnight,
  },
  description: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeNormal,
    lineHeight: 21,
    color: colors.greyMidnight,
  },
  price: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeSmall,
    lineHeight: 18,
    color: colors.lightGreen,
  },
  infoContainer: {
    paddingHorizontal: 24,
    marginVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 17,
    color: colors.greyGrey,
    marginLeft: 24,
    marginTop: 24,
  },
  image: {
    width: '100%',
    height: 93,
    marginBottom: 20,
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
