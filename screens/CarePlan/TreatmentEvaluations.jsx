import React, { useEffect } from 'react';
import { StyleSheet, Alert, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { colors } from '../../theme';
import HeaderComp from '../../components/HeaderComp';
import CloseIcon from '../../components/Svg/close';
import { formats, iso8601ToFormatted } from '../../utilis/dateTime';
import { parseHtmlForTags } from '../../helpers/functions';
import { statusColors, statusText } from './constant';
import { LogEvent } from '../../analytics';
import { stitchArrayIntoCommaList } from '../../utilis/helpers';
import { resetToDashboard } from '../../utilis/navigationHelper';

const translationPath = 'profile.carePlan.treatmentEvaluation';

const TreatmentEvalutions = () => {
  const navigation = useNavigation();

  const { t } = useTranslation();
  const { params: { evaluation } = {} } = useRoute();
  const { usersLookup } = useSelector((state) => state.user) || {};

  const userName = `${usersLookup[evaluation?.user_id].first_name} ${
    usersLookup[evaluation?.user_id].last_name
  }`;

  const recommendedPlans = evaluation?.meta?.provider_recommended_plans
    ?.filter((item) => item.type === 'observation')
    ?.map((e) => e.subtype);

  const showAppointmentRecommend =
    evaluation?.meta?.provider_recommended_plans?.filter((item) => item.type === 'appointment')
      ?.length > 0;

  useEffect(() => {
    LogEvent(`ProfileSnifflesCarePlanTreat_screen`);
  }, []);

  const handleRightClick = () => {
    Alert.alert(t('exitAlert.Title'), t('exitAlert.Text'), [
      {
        text: t('yesNo.Yes'),
        onPress: () => {
          LogEvent(`ProfileSnifflesCarePlanTreat_click_Close`);
          resetToDashboard(navigation);
        },
      },
      {
        text: t('yesNo.No'),
        style: 'cancel',
      },
    ]);
  };

  const goBack = () => {
    LogEvent(`ProfileSnifflesCarePlanTreat_click_Back`);
    navigation.goBack();
  };

  const PendingView = () => (
    <View style={styles.itemContent}>
      <HeaderStatus />
      <Text style={styles.descriptionText}>{t(`${translationPath}.pending`)}</Text>
    </View>
  );

  const NotPrescribeView = () => (
    <>
      <View style={styles.itemContent}>
        <HeaderStatus />
        <Text style={styles.descriptionText}>{evaluation?.meta?.provider_comments}</Text>
      </View>
      {(evaluation?.meta?.provider_recommendations ||
        recommendedPlans?.length > 0 ||
        showAppointmentRecommend) && (
        <View style={styles.itemContent}>
          <Text style={styles.headerTitle}>{t(`${translationPath}.providerRecommendation`)}</Text>
          <Text style={styles.descriptionText}>{evaluation?.meta?.provider_recommendations}</Text>
        </View>
      )}
      {recommendedPlans?.length > 0 && (
        <View style={styles.followupView}>
          <Text style={styles.descriptionText}>
            {t(`${translationPath}.folloupPlans`, {
              plans: stitchArrayIntoCommaList(recommendedPlans, ', ', ' and '),
            })}
            <Text
              onPress={() => {
                navigation.navigate('SnifflesIntro');
              }}
              style={styles.blueButtonText}
            >
              {t(`${translationPath}.scheduleNow`)}
            </Text>
          </Text>
        </View>
      )}
      {showAppointmentRecommend && (
        <View style={styles.followupView}>
          <Text style={styles.descriptionText}>
            {t(`${translationPath}.folloupConsultation`)}
            <Text
              onPress={() => {
                navigation.navigate('SnifflesTelehealthIntro');
              }}
              style={styles.blueButtonText}
            >
              {t(`${translationPath}.scheduleNow`)}
            </Text>
          </Text>
        </View>
      )}
      <View style={{ marginTop: 37, borderTopWidth: 1, borderColor: colors.greyExtraLight2 }}>
        <ReviewView />
      </View>
    </>
  );

  const PrescribeView = () => (
    <View style={styles.itemContent}>
      <View style={styles.innerBox}>
        <HeaderStatus />

        <TouchableOpacity
          onPress={() => {
            LogEvent(`ProfileSnifflesCarePlanTreat_click_ViewAll`);
            navigation.navigate('PrescriptionList');
          }}
        >
          <Text style={styles.blueButtonText}>{t(`${translationPath}.viewPrescriptions`)}</Text>
        </TouchableOpacity>
        {evaluation?.meta?.provider_recommendations && (
          <View style={styles.itemContent}>
            <Text style={styles.headerTitle}>{t(`${translationPath}.providerRecommendation`)}</Text>
            <Text style={styles.descriptionText}>{evaluation?.meta?.provider_recommendations}</Text>
          </View>
        )}
      </View>
      <ReviewView />
    </View>
  );

  const ReviewView = () => (
    <Text
      style={{
        ...styles.descriptionText,
        borderColor: colors.greyExtraLight2,
        borderTopWidth: 1,
        paddingTop: 12,
      }}
    >
      {parseHtmlForTags(
        t(`${translationPath}.reviewed`, {
          doctorName: evaluation?.meta?.provider_name || 'a medical provider',
          date: iso8601ToFormatted(evaluation?.updated_at, formats?.fullLongDate),
        }),
        {
          b: { ...styles.doctorName },
        }
      ).map((e) => React.createElement(Text, { style: e.style }, e.child))}
    </Text>
  );

  const HeaderStatus = () => (
    <Text style={styles.headerTitle}>
      {parseHtmlForTags(
        t(`${translationPath}.medication`, {
          status: statusText[evaluation?.status],
          reason: evaluation?.meta?.provider_prescribing_reasons
            ? `for ${stitchArrayIntoCommaList(
                evaluation?.meta?.provider_prescribing_reasons
                  .filter((e) => e.type === 'observation')
                  .map((e) => e.subtype)
              )}`
            : // .join(', ')}`
              '',
        }),
        {
          b: { ...styles.statusText, ...statusColors[evaluation?.status] },
        }
      ).map((e) => React.createElement(Text, { style: e.style }, e.child))}
    </Text>
  );

  const renderView = (status) => {
    switch (status) {
      case 'rejected':
        return <NotPrescribeView />;
      case 'pending':
        return <PendingView />;
      case 'approved':
        return <PrescribeView />;
      default:
        return <PendingView />;
    }
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.conitaner}>
      <HeaderComp
        center={[t(`${translationPath}.title`), styles.headerTitle]}
        addStyle={styles.header}
        left='arrow'
        onLeftClick={goBack}
        right={[<CloseIcon width={14} height={14} />, handleRightClick]}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Text style={styles.headerTitle}>{userName}</Text>
            <Text style={styles.dateText}>
              {iso8601ToFormatted(evaluation?.created_at, formats?.fullLongDate)}
            </Text>
          </View>
          {renderView(evaluation?.status)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conitaner: {
    flex: 1,
    backgroundColor: colors.primaryGhost,
  },
  header: {
    paddingTop: 24,
    paddingRight: 24,
    paddingBottom: 12,
    paddingLeft: 24,
  },
  headerTitle: {
    fontSize: 16,
    color: colors.greyDark2,
    fontFamily: 'Museo_700',
    lineHeight: 19,
  },
  item: {
    marginHorizontal: 24,
    borderColor: colors.greyExtraLight2,
    borderRadius: 16,
    marginVertical: hp('1%'),
    backgroundColor: colors.white,
    padding: 24,
    borderWidth: 1,
  },
  itemHeader: {
    paddingBottom: 16,
    borderColor: colors.greyExtraLight2,
    borderBottomWidth: 1,
  },
  itemContent: {
    paddingTop: 24,
  },
  innerBox: {
    borderColor: colors.greyExtraLight2,
    marginBottom: 16,
    paddingBottom: 16,
  },
  dateText: {
    fontSize: 12,
    lineHeight: 22,
    color: colors.greyGrey,
    fontFamily: 'Museo_700',
  },
  statusText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.greyGrey,
    fontFamily: 'Museo_700',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.greyMed,
    fontFamily: 'Museo_500',
  },
  blueButtonText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.primaryBlue,
    fontFamily: 'Museo_500',
  },
  followupView: {
    paddingTop: 16,
  },
  doctorName: { fontSize: 14, color: colors.greyMed, fontFamily: 'Museo_900', lineHeight: 19 },
});

export default TreatmentEvalutions;
