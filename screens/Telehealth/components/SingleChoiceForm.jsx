import React from 'react';
import Select from '../../../components/modularTestFlow/components/buttons/select';

const SingleChoiceForm = ({ choosedOption, options, fieldName, onSelectOption }) =>
  options.map((value) => (
    <Select
      title={value}
      active={value === choosedOption}
      action={() => onSelectOption(value, fieldName)}
    />
  ));

export default SingleChoiceForm;
