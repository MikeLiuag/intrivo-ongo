import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';
import InsuranceIcon from '../../../assets/svgs/bank.svg';
import CashIcon from '../../../assets/svgs/cash.svg';
import { LogEvent } from '../../../analytics';

const translationPath = 'screens.telehealth.questions.paymentMethod';

const PaymentMethod = ({ onChangeState, skipSteps }) => {
  const { t } = useTranslation();

  const onSelectPaymentMethod = (isPayedByInsurance) => {
    if (isPayedByInsurance) {
      return onChangeState(isPayedByInsurance, 'isPayedByInsurance', true);
    }
    onChangeState(isPayedByInsurance, 'isPayedByInsurance');
    return skipSteps(2);
  };

  const options = [
    {
      title: '.option1',
      description: '.option1Description',
      icon: <InsuranceIcon />,
      onSelectOption: () => {
        LogEvent('LCOVID_Virtual_Payment_click_Insurance');
        onSelectPaymentMethod(true);
      },
    },
    {
      title: '.option2',
      description: '.option2Description',
      params: {
        cost: '$99',
      },
      icon: <CashIcon />,
      onSelectOption: () => {
        LogEvent('LCOVID_Virtual_Payment_click_Cash');
        onSelectPaymentMethod(false);
      },
    },
  ];

  const renderPaymentMethods = () =>
    options.map(({ title, description, icon, params, onSelectOption }) => (
      <TouchableOpacity onPress={onSelectOption} key={title} style={styles.optionContainer}>
        {icon}
        <View style={styles.optionInfoContainer}>
          <Text style={styles.title}>{t(translationPath + title)}</Text>
          <Text style={styles.description}>{t(translationPath + description, { ...params })}</Text>
        </View>
      </TouchableOpacity>
    ));

  return <View>{renderPaymentMethods()}</View>;
};

export default PaymentMethod;

const styles = StyleSheet.create({
  optionContainer: {
    height: 80,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.secondaryButtonBorder,
  },
  optionInfoContainer: {
    justifyContent: 'center',
    marginLeft: 16,
  },
  title: {
    fontFamily: fonts.familyBold,
    color: colors.greyMidnight,
    fontSize: fonts.sizeLarge,
  },
  description: {
    fontFamily: fonts.familyLight,
    color: colors.greyDark2,
    marginTop: 3,
  },
});
