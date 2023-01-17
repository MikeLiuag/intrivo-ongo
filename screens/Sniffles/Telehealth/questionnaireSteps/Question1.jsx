import React from 'react';
import { useTranslation } from 'react-i18next';
import SingleChoiceForm from '../../../../components/SingleChoiceForm';
import { snifflesFieldNames } from '../../../../store/sniffles/slice';

const translationsPath = 'screens.sniffles.snifflesTelehealth.questions';

const Question1 = ({ onChangeState, sexAtBirth }) => {
  const { t } = useTranslation();
  const options = [
    t(`${translationsPath}.question1.answer1`),
    t(`${translationsPath}.question1.answer2`),
    t(`${translationsPath}.question1.answer3`),
  ];

  const choosedOption = () => {
    if (sexAtBirth !== null) {
      return sexAtBirth;
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
        fieldName={snifflesFieldNames.SEX_AT_BIRTH}
      />
    </>
  );
};

export default Question1;
