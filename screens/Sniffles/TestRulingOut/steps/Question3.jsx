import React from 'react';
import { useTranslation } from 'react-i18next';
import SingleChoiceForm from '../../../../components/SingleChoiceForm';

const translationsPath = 'screens.sniffles.testRulingOut.questions';

const Question3 = ({ onChangeState, next }) => {
  const { t } = useTranslation();
  const options = [
    t(`${translationsPath}.question3.answer1`),
    t(`${translationsPath}.question3.answer2`),
  ];

  const choosedOption = () => {
    if (next !== null) {
      return next;
    }
    return null;
  };

  const onSelectOption = (value, fieldName) => {
    onChangeState(value, fieldName);
  };

  return (
    <>
      <SingleChoiceForm
        options={options}
        choosedOption={choosedOption()}
        onSelectOption={onSelectOption}
        fieldName='next'
      />
    </>
  );
};

export default Question3;
