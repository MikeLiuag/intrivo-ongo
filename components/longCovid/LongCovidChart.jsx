import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';
import Pie from 'react-native-pie';
import { colors } from '../../theme';
import longCovidStyles from './styles';

const LongCovidChart = ({ data, onResponse }) => {
  const { t } = useTranslation();
  const content = data.questionnaire_conclusion.content[0];

  const allQuestions = content.more_common + content.less_common;

  return (
    <View style={[longCovidStyles.container, longCovidStyles.chartContainer]}>
      <View style={{ flexDirection: 'row', paddingBottom: 16 }}>
        <View pointerEvents='none' style={longCovidStyles.pieContainer}>
          <Pie
            radius={70}
            innerRadius={60}
            dividerSize={2}
            sections={[
              {
                percentage: (content.more_common / allQuestions) * 100,
                color: colors.statusRed,
              },
              {
                percentage: (content.less_common / allQuestions) * 100,
                color: colors.statusGrey,
              },
            ]}
          />
          <View
            style={{
              position: 'absolute',
              width: 140,
              height: 140,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={longCovidStyles.chartTitle}>
              {`${Number((content.more_common / allQuestions) * 100).toFixed(0)}%`}
            </Text>
            <Text style={longCovidStyles.chartSubtitle}>
              {t('screens.longCovid.result.chart.similarResponses')}
            </Text>
          </View>
        </View>

        <View style={{ justifyContent: 'center', flex: 1 }}>
          <View style={longCovidStyles.chartResultRow}>
            <Text style={[longCovidStyles.chartResultText]}>
              <Text style={longCovidStyles.chartResultTextBold}>{content.more_common}</Text>
              {t('screens.longCovid.result.chart.description')}
            </Text>
          </View>
          <TouchableOpacity onPress={onResponse}>
            <Text style={longCovidStyles.blueText}>
              {t('screens.longCovid.result.chart.responseSummary')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={longCovidStyles.line} />
    </View>
  );
};

export default LongCovidChart;
