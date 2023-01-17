import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogEvent } from '../../analytics';
import HeaderComp from '../../components/HeaderComp';
import { itemsSource } from '../../components/longCovid/items';
import longCovidStyles from '../../components/longCovid/styles';
import RiskContainer from '../../components/RiskContainer';
import { colors } from '../../theme';
import { openLink } from '../../utilis/link';

const LongCovidList = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { content } = route.params;
  const { type } = route.params;

  const analyticNname = type === 'symptoms' ? 'Symptoms' : 'Response';

  const commonSources = content.content.reduce((acc, cur) => {
    const newSources = (cur.sources || []).filter(
      (s) => acc.findIndex((e) => e.title === s.title) === -1
    );
    return [...acc, ...newSources];
  }, []);

  useEffect(() => {
    LogEvent(`LCOVID_Quiz_${analyticNname}_screen`);
  }, [analyticNname]);

  const onLinkPress = (url) => {
    openLink(navigation, false, { url, useWebView: true });
  };

  const handleBack = () => {
    LogEvent(`LCOVID_Quiz_${analyticNname}_click_Back`);
    navigation.goBack();
  };

  const TitleComp = () => (
    <>
      <View style={longCovidStyles.chartResultRow}>
        <View style={[longCovidStyles.chartCircle, { backgroundColor: colors.statusRed }]} />
        <Text style={styles.title}>{t(`screens.longCovid.result.${type}.explainde.red`)}</Text>
      </View>
      <View style={longCovidStyles.chartResultRow}>
        <View style={[longCovidStyles.chartCircle, { backgroundColor: colors.statusGreen }]} />
        <Text style={styles.title}>{t(`screens.longCovid.result.${type}.explainde.green`)}</Text>
      </View>
    </>
  );

  const FooterComp = () =>
    commonSources.length && type === 'symptoms' ? (
      <Text style={styles.footer}>
        {t(`screens.longCovid.result.${type}.explainde.footer`)}
        {commonSources.map((item, index) => (
          <>
            <Text
              style={styles.link}
              onPress={() => {
                LogEvent(`LCOVID_Quiz_${analyticNname}_click_Resource1`);
                return item.url ? onLinkPress(item.url) : null;
              }}
            >
              {item.title}
            </Text>
            {index < commonSources.length - 2 && <Text>, </Text>}
            {index === commonSources.length - 2 && <Text> and </Text>}
          </>
        ))}
      </Text>
    ) : null;

  const LinkComp = ({ item }) => (
    <View style={styles.linkContainer}>
      <Text style={styles.linkTitle}>{item.title}</Text>
      <Text
        style={styles.linkName}
        onPress={() => {
          LogEvent(`LCOVID_Quiz_${analyticNname}_click_Resource`, item.title);
          onLinkPress(item.url);
        }}
      >
        {item.name}
      </Text>
      <Text style={styles.linkSubtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <SafeAreaView edges={['left', 'right', 'top']} style={styles.screen}>
      <HeaderComp
        addStyle={styles.header}
        left='arrow'
        onLeftClick={handleBack}
        center={[content.title, styles.headerText]}
      />
      {type !== 'source' ? (
        <FlatList
          data={content.content}
          style={{ flex: 1, marginBottom: 20 }}
          contentContainerStyle={styles.container}
          ListHeaderComponent={<TitleComp />}
          ListFooterComponent={type !== 'asnwers' && <FooterComp />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <RiskContainer
              showTips
              tips={
                type === 'answers'
                  ? {
                      color:
                        item?.applied?.common.toLowerCase() === 'true'
                          ? colors.statusRed
                          : colors.statusGreen,
                      text: item?.applied?.title,
                    }
                  : {
                      color:
                        item.applied.toLowerCase() === 'true'
                          ? colors.statusRed
                          : colors.statusGreen,
                      text: item.applied.toLowerCase() === 'true' ? 'Yes' : 'No',
                    }
              }
              title={item.title}
              description={item.description}
              sources={type === 'answers' && item.sources}
              onLinkPress={onLinkPress}
            />
          )}
        />
      ) : (
        <FlatList
          data={itemsSource}
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => <LinkComp item={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default LongCovidList;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.greyWhite,
  },
  container: {
    paddingHorizontal: 24,
    marginVertical: 20,
    paddingBottom: 36,
  },
  headerText: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
  },
  title: {
    fontFamily: 'Museo_500',
    fontSize: 12,
    lineHeight: 22,
    color: colors.greyGrey,
  },
  footer: {
    fontFamily: 'Museo_300',
    fontSize: 12,
    lineHeight: 14,
    color: colors.greyDark,
    textAlign: 'right',
  },
  link: {
    fontFamily: 'Museo_500',
    color: colors.primaryBlue,
  },
  linkContainer: {
    marginVertical: 12,
  },
  linkTitle: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyDark2,
  },
  linkName: {
    fontFamily: 'Museo_500',
    fontSize: 14,
    lineHeight: 22,
    color: colors.primaryBlue,
  },
  linkSubtitle: {
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 22,
    color: colors.greyDark,
  },
});
