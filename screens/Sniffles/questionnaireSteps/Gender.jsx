import React from 'react';
import { useTranslation } from 'react-i18next';
import { snifflesFieldNames } from '../../../store/sniffles/slice';
import SingleChoiceForm from '../../../components/SingleChoiceForm';

const translationsPath = 'screens.sniffles.questions.gender';

const Gender = ({ onChangeState, sexAtBirth }) => {
  const { t } = useTranslation();
  const options = [t(`${translationsPath}.option1`), t(`${translationsPath}.option2`)];

  const onSelectOption = (value, fieldName) => {
    onChangeState(value, fieldName);
  };

  return (
    <>
      <SingleChoiceForm
        options={options}
        choosedOption={sexAtBirth}
        onSelectOption={onSelectOption}
        fieldName={snifflesFieldNames.SEX_AT_BIRTH}
      />
    </>
  );
};

export default Gender;
