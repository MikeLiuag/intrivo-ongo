import React from 'react';
import { StyleSheet } from 'react-native';
import Select from './modularTestFlow/components/buttons/select';

const SingleChoiceForm = ({ choosedOption, options, fieldName, onSelectOption }) =>
  options.map((value) => (
    <Select
      title={value}
      active={value === choosedOption}
      containerStyle={styles.container}
      action={() => onSelectOption(value, fieldName)}
    />
  ));

export default SingleChoiceForm;

const styles = StyleSheet.create({
  container: {
    margin: 0,
    marginVertical: 8,
    width: '100%',
  },
});
