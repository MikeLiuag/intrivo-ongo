import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../theme';
import longCovidStyles from './styles';

const LongCovidInfo = ({ data, onLinkPress }) => {
  const { t } = useTranslation();
  const { content } = data.questionnaire_conclusion;

  const Container = ({ text }) => (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>💡</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );

  return (
    <View style={longCovidStyles.container}>
      <Text style={longCovidStyles.title}>{t('screens.longCovid.result.info.title')}</Text>
      <View style={longCovidStyles.line} />
      <FlatList
        data={content}
        keyExtractor={({ index }) => index}
        scrollEnabled={false}
        renderItem={({ item }) => <Container text={item?.description} />}
      />
    </View>
  );
};

export default LongCovidInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.primaryPavement,
    borderRadius: 8,
    marginVertical: 8,
  },
  text: {
    fontFamily: 'Museo_300',
    fontSize: 12,
    lineHeight: 22,
    color: colors.black,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 16,
  },
});
