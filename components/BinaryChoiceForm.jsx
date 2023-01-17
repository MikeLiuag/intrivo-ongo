import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import Select from './modularTestFlow/components/buttons/select';

const checkYes = require('../assets/check_circle.png');
const checkNo = require('../assets/cancel.png');

const BinaryChoiceForm = ({ choosedOption, fieldName, onSelectOption }) => {
  const { t } = useTranslation();

  const options = useMemo(
    () => [
      { title: t('yesNo.Yes'), icon: checkYes },
      { title: t('yesNo.No'), icon: checkNo },
    ],
    [t]
  );
  return options.map((value) => (
    <Select
      title={value?.title || value}
      icon={value?.icon}
      disableLeftBackground={!!value?.icon}
      active={value?.title === choosedOption}
      containerStyle={styles.container}
      action={() => onSelectOption(value?.title, fieldName)}
    />
  ));
};

export default BinaryChoiceForm;

const styles = StyleSheet.create({
  container: {
    margin: 0,
    marginVertical: 8,
    width: '100%',
  },
});
