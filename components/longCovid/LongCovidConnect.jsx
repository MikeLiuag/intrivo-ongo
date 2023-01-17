import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LogEvent } from '../../analytics';
import { BlueButton } from '../Buttons/BlueButton';
import Icon from '../Icon';
import ClinicSvg from '../Svg/ClinicSvg';
import longCovidStyles from './styles';
import SelectorComponent from '../SelectorComponent';
import { colors } from '../../theme';

const arrow = require('../../assets/arrowRight.png');

const LongCovidConnect = ({ data, onPress, onSymptoms }) => {
  const { t } = useTranslation();
  const content = data.questionnaire_conclusion.content[0];

  return (
    <>
      <View style={[longCovidStyles.container, longCovidStyles.connectContainer]}>
        <ClinicSvg />
        <Text style={longCovidStyles.title}>{t('screens.longCovid.result.connect.title')}</Text>
        <Text style={longCovidStyles.pointText}>{content?.image?.description}</Text>
        <BlueButton
          action={() => {
            LogEvent(`LCOVID_Quiz_Result_click_Start`);
            onPress();
          }}
          style={longCovidStyles.blueButton}
          styleText={longCovidStyles.buttonText}
          title={content?.button?.description}
        />
        <Text
          style={longCovidStyles.link}
          onPress={() => {
            LogEvent(`LCOVID_Quiz_Result_click_More`);
            onPress();
          }}
        >
          {content?.link?.description}
        </Text>
      </View>
      <SelectorComponent
        type='inAll'
        data={[
          {
            title: t('screens.longCovid.result.connect.longCovidSymptoms'),
            onClick: onSymptoms,
            icon: <Icon type='MaterialIcons' name='loyalty' size={24} isGradient />,
            iconStyle: { marginRight: 10 },
            titleStyle: { color: colors.black, fontFamily: 'Museo_500' },
          },
        ]}
      />
    </>
  );
};

export default LongCovidConnect;
