import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { LogEvent } from '../../analytics';
import HeaderComp from '../../components/HeaderComp';
import { LongCovidButton, LongCovidConnect } from '../../components/longCovid';
import LongCovidChart from '../../components/longCovid/LongCovidChart';
import { setShowReviewScreen } from '../../store/app/slice';
import { applyPreviousAnswers } from '../../store/longCovid/slice';
import {
  clearLongCovidCurrentResult,
  submitLongCovidTemporary,
} from '../../store/modularTestFlow/slice';
import { colors } from '../../theme';
import { formats, iso8601ToFormatted } from '../../utilis/dateTime';
import { resetTimeline } from '../../utilis/navigationHelper';
import { openLink } from '../../utilis/link';

const LongCovidResult = ({ route }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [result, setResult] = useState(null);
  const { longCovidCurrentResult } = useSelector((state) => state.modularTestFlow);
  const { telehealth } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  const { data } = route?.params;
  const { from } = route?.params;

  useEffect(() => {
    if (from === 'timeline') {
      setResult(data);
    } else {
      dispatch(submitLongCovidTemporary(data));
    }
    LogEvent(`LCOVID_Quiz_Result_screen`);
  }, [data, dispatch, from]);

  useEffect(() => {
    if (longCovidCurrentResult) {
      setResult(longCovidCurrentResult);
      dispatch(clearLongCovidCurrentResult());
    }
  }, [dispatch, longCovidCurrentResult]);

  const handleClose = () => {
    LogEvent(`LCOVID_Quiz_Result_click_Close`);
    if (from === 'timeline') {
      navigation.goBack();
    } else {
      dispatch(setShowReviewScreen('assessmentFlow'));
      resetTimeline(navigation);
    }
  };

  const handleSymptoms = () => {
    LogEvent(`LCOVID_Quiz_Result_click_Symptoms`);
    navigation.navigate('LongCovidList', {
      type: 'symptoms',
      content: result?.user_questionnaire_conclusions.find(
        (item) => item?.questionnaire_conclusion?.name === 'CHART'
      ).questionnaire_conclusion?.content[0].symptoms,
    });
  };

  const handleResult = () => {
    LogEvent(`LCOVID_Quiz_Result_click_Insights`);
    navigation.navigate('LongCovidList', {
      type: 'answers',
      content: result?.user_questionnaire_conclusions.find(
        (item) => item?.questionnaire_conclusion?.name === 'CHART'
      ).questionnaire_conclusion?.content[0].insights,
    });
  };

  const handleDoctor = () => {
    // navigation.navigate('LongCovidCS');
    const answersForNextFlow = result.questionnaire_questions.map(
      ({ user_questionnaire_answers: answers }) => answers[0]?.questionnaire_answer?.description
    );

    dispatch(applyPreviousAnswers({ gender: answersForNextFlow[7] }));
    if (telehealth) {
      navigation.navigate('TelehealthInfo');
    } else {
      navigation.navigate('LongCovidCS');
    }
  };

  const handleResource = (url, name = '') => {
    LogEvent(`LCOVID_Quiz_Result_click_Resource_${name}`);
    openLink(navigation, false, { url, useWebView: true });
  };

  const getSection = (conclusion) => {
    switch (conclusion?.questionnaire_conclusion?.template) {
      case 'chart_v1':
        return <LongCovidChart key={conclusion.id} data={conclusion} onResponse={handleResult} />;
      case 'virtual_long_covid_clinic_v1':
        return (
          <LongCovidConnect
            key={conclusion.id}
            data={conclusion}
            onPress={handleDoctor}
            onSymptoms={handleSymptoms}
          />
        );
      case 'additional_resources_v1':
        return conclusion.questionnaire_conclusion.name !== 'LONG_COVID_CLINICAL_TRIALS' &&
          conclusion?.questionnaire_conclusion?.content?.[0]?.url ? (
          <LongCovidButton
            key={conclusion.id}
            onPress={(url) => handleResource(url, conclusion?.questionnaire_conclusion?.name)}
            data={conclusion}
          />
        ) : null;
      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={styles.screen}>
      <HeaderComp
        addStyle={styles.header}
        right={['x', handleClose]}
        centerComp={() => (
          <View style={styles.centerHeader}>
            <Text style={styles.headerText}>{t('screens.longCovid.result.header')}</Text>
            <Text style={styles.dateText}>
              {iso8601ToFormatted(result?.created_at, formats.fullLongDate)}
            </Text>
          </View>
        )}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {result ? (
          <>{result?.user_questionnaire_conclusions.map((c) => getSection(c))}</>
        ) : (
          <View
            style={{
              minHeight: '100%',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LongCovidResult;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
  },
  centerHeader: {
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
  },
  dateText: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 20,
    color: colors.greyGrey,
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  link: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 22,
    color: colors.primaryBlue,
    textAlign: 'center',
    marginTop: 14,
  },
});
