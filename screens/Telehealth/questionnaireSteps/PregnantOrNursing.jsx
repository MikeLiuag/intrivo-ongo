import React from 'react';
import { useTranslation } from 'react-i18next';
import SingleChoiceForm from '../components/SingleChoiceForm';

const PregnantOrNursing = ({ gender, pregnantOrNursing, onChangeState }) => {
  const { t } = useTranslation();

  const options = [t('yesNo.Yes'), t('yesNo.No')];

  if (gender === 'Male') {
    onChangeState(false, 'pregnantOrNursing', true);
    return null;
  }

  return (
    <SingleChoiceForm
      options={options}
      fieldName='pregnantOrNursing'
      onSelectOption={onChangeState}
      choosedOption={pregnantOrNursing}
    />
  );
};

export default PregnantOrNursing;
