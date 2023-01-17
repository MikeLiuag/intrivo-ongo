import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, FlatList } from 'react-native';
import RiskContainer from '../RiskContainer';
import longCovidStyles from './styles';

const SymptomsContainer = ({ symptoms, onLinkPress }) => {
  const { t } = useTranslation();

  if (symptoms == null) {
    return null;
  }
  return (
    <View style={longCovidStyles.container}>
      <Text style={longCovidStyles.title}>{t('screens.longCovid.result.symptoms.title')}</Text>
      <View style={longCovidStyles.line} />
      <FlatList
        data={symptoms}
        scrollEnabled={false}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <RiskContainer
            title={t(
              `screens.longCovid.result.symptoms.${item.text.toLowerCase().replace(' ', '_')}.title`
            )}
            description={t(
              `screens.longCovid.result.symptoms.${item.text
                .toLowerCase()
                .replace(' ', '_')}.description`
            )}
          />
        )}
      />
      <Text style={longCovidStyles.link} onPress={() => onLinkPress()}>
        {t('screens.longCovid.result.symptoms.link')}
      </Text>
    </View>
  );
};

export default SymptomsContainer;
