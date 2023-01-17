import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { LogEvent } from '../../analytics';
import HeaderComp from '../../components/HeaderComp';
import { LongCovidButton } from '../../components/longCovid';
import SnifflesConclusion from '../../components/SnifflesConclusion';
import CloseIcon from '../../components/Svg/close';
import {
  clearSnifflesCurrentResult,
  submitSnifflesTemporary,
} from '../../store/modularTestFlow/slice';
import { colors } from '../../theme';
import { fonts } from '../../theme/fonts';
import { openLink } from '../../utilis/link';

const SnifflesResult = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { snifflesCurrentResult } = useSelector((state) => state.modularTestFlow);
  const { users } = useSelector((s) => s.user);
  const [result, setResult] = useState(null);

  const { data, version } = route?.params;

  useEffect(() => {
    dispatch(submitSnifflesTemporary(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (snifflesCurrentResult) {
      if (
        snifflesCurrentResult.user_questionnaire_conclusions[0].questionnaire_conclusion
          .template === 'redirect_to_link_v1'
      ) {
        const link =
          snifflesCurrentResult.user_questionnaire_conclusions[0].questionnaire_conclusion
            .content[0].url;
        navigation.navigate(link.substring(1), {
          userId: users[0],
        });
      } else {
        setResult(snifflesCurrentResult);
        LogEvent(
          `Sniffles_${getAnalyticsName(
            snifflesCurrentResult.user_questionnaire_conclusions[0].questionnaire_conclusion.title
          )}${version}_screen`
        );
        getAnalyticsName(snifflesCurrentResult);
        dispatch(clearSnifflesCurrentResult());
      }
    }
  }, [dispatch, snifflesCurrentResult, navigation, version, users]);

  const getAnalyticsName = (title) => {
    switch (title) {
      case 'Get support and advice':
        return 'ResultsProvider';
      case 'I have questions':
        return 'Talk';
      case 'from your home':
        return 'TnT';
      case 'delivered to your home':
        return 'Symptoms';
      case 'to rule it out':
        return 'Test';
      case 'Same day testing and treatment':
        return 'ResultsTnT';
      case 'Test for COVID-19':
        return 'ResultsTest';
      default:
        return 'Vaccines';
    }
  };
  const handleClose = () => {
    LogEvent(
      `Sniffles_${getAnalyticsName(
        result.user_questionnaire_conclusions[0].questionnaire_conclusion.title
      )}${version}_click_Close`
    );
    navigation.pop(3);
  };

  const handleBack = () => {
    LogEvent(
      `Sniffles_${getAnalyticsName(
        result.user_questionnaire_conclusions[0].questionnaire_conclusion.title
      )}${version}_click_Back`
    );
    navigation.pop(3);
  };

  const onButtonPress = (type, url) => {
    switch (type) {
      case 'link':
        return openLink(navigation, true, { url, useWebView: false });
      case 'webview':
        return openLink(navigation, false, { url, useWebView: true });
      case 'deeplink':
        return navigation.navigate(url.substring(1));
      default:
        return null;
    }
  };

  const getSection = (conclusion) => {
    switch (conclusion?.questionnaire_conclusion?.template) {
      case 'sniffles_questionnaire_conclusion_v1':
        return (
          <SnifflesConclusion
            content={conclusion.questionnaire_conclusion.content[0]}
            onPress={onButtonPress}
          />
        );
      case 'additional_resources_v1':
        return conclusion?.questionnaire_conclusion?.content?.[0]?.url ? (
          <LongCovidButton
            key={conclusion.id}
            onPress={() => {
              LogEvent(
                `Sniffles_${getAnalyticsName(
                  result.user_questionnaire_conclusions[0].questionnaire_conclusion.title
                )}${version}_click_${getAnalyticsName(
                  conclusion.questionnaire_conclusion.content[0].description
                )}`
              );
              onButtonPress(
                conclusion?.questionnaire_conclusion?.content?.[0]?.subtype,
                conclusion?.questionnaire_conclusion?.content?.[0]?.url
              );
            }}
            data={conclusion}
          />
        ) : null;
      default:
        return null;
    }
  };

  if (!result) {
    return (
      <View
        style={{
          minHeight: '100%',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['right', 'top', 'left', 'bottom']} style={styles.screen}>
      <HeaderComp
        center={['Sniffles', styles.headerTitle]}
        left='arrow'
        onLeftClick={handleBack}
        right={[<CloseIcon width={14} height={14} />, handleClose]}
        addStyle={styles.header}
      />
      <Text style={styles.subtitle}>We are here to help you feel better</Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {result?.user_questionnaire_conclusions.map((c) => getSection(c))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SnifflesResult;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingRight: 10,
  },
  headerTitle: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
    lineHeight: 19,
  },
  subtitle: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeNormal,
    textAlign: 'center',
    lineHeight: 20,
    color: colors.greyDark,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  cardContainer: {
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    width: '100%',
    padding: 16,
    borderRadius: 16,
    borderColor: colors.greyExtraLight,
    borderWidth: 1,
  },
  cardTitle: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
    lineHeight: 16,
  },
  cardDescription: {
    fontFamily: fonts.familyNormal,
    fontSize: fonts.sizeNormal,
    lineHeight: 22,
  },

  contentContainer: {
    paddingHorizontal: 24,
  },
});
