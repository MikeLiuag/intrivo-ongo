import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { BlueButton } from '../../../../components/Buttons/BlueButton';
import SingleChoiceForm from '../../../../components/SingleChoiceForm';
import { snifflesFieldNames } from '../../../../store/sniffles/slice';

const translationsPath = 'screens.sniffles.assessmentQuestion.question5';

const HowToHelp = ({ onChangeState, howToHelp }) => {
  const { t } = useTranslation();
  const [isOptionSelectedInitially, setIsOptionSelectedInitially] = useState(howToHelp);

  const options = [
    { title: t(`${translationsPath}.option1`), value: 'medication' },
    { title: t(`${translationsPath}.option2`), value: 'telehealth' },
    { title: t(`${translationsPath}.option3`), value: 'appointment' },
  ];

  const choosedOption = () => {
    switch (howToHelp) {
      case 'medication':
        return options[0].title;
      case 'telehealth':
        return options[1].title;
      case 'appointment':
        return options[2].title;
      default:
    }
    return null;
  };

  const onSelectOption = (value, fieldName) => {
    const selectedValue = options.find((e) => e.title === value).value;
    if (howToHelp === selectedValue) {
      onChangeState(null, fieldName);
    } else {
      onChangeState(selectedValue, fieldName);
    }
  };

  const onButtonPress = () => {
    onChangeState(null, null, true);
  };

  if (isOptionSelectedInitially) {
    onButtonPress();
    setIsOptionSelectedInitially(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <SingleChoiceForm
          options={options.map((item) => item.title)}
          choosedOption={choosedOption()}
          onSelectOption={onSelectOption}
          fieldName={snifflesFieldNames.HOW_TO_HELP}
        />
      </View>
      <BlueButton title='Next' action={onButtonPress} disabled={howToHelp === null} />
    </View>
  );
};

export default HowToHelp;
