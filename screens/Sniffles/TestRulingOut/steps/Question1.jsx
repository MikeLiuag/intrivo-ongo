import React from 'react';
import { useTranslation } from 'react-i18next';
import SingleChoiceForm from '../../../../components/SingleChoiceForm';

const translationsPath = 'screens.sniffles.testRulingOut.questions';

const Question1 = ({ onChangeState, hadCovidTest }) => {
  const { t } = useTranslation();
  const options = [
    t(`${translationsPath}.question1.answer1`),
    t(`${translationsPath}.question1.answer2`),
    t(`${translationsPath}.question1.answer3`),
  ];

  const choosedOption = () => {
    if (hadCovidTest !== null) {
      return hadCovidTest;
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
        fieldName='hadCovidTest'
      />
    </>
  );
};

export default Question1;
