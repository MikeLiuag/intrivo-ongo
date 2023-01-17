import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { LogEvent } from '../../analytics';
import FormIdentifyTemplate from '../../components/FormIdentifyTemplate';
import { uploadDocumentsRequest } from '../../store/paxlovid/slice';
import { isFileTypeIsSupported, resizeFile } from '../../utilis/file';
import { FILE_SIZE_THRESHOLD, MAX_FILE_SIZE } from '../VaccineCard/FilePicker';
import PaxFlowWrapper from './components/PaxFlowWrapper';

const EligibilityFormIdentify = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [cardFront, setCardFront] = useState(null);
  const [selfie, setSelfie] = useState(null);

  useEffect(() => {
    LogEvent('PE_Identity_screen');
  }, []);

  const onExitFromPaxFlow = () => {
    LogEvent('PE_Identity_Click_Close');
    navigation.pop(3);
  };

  const resizeFileIfNeeded = async (file) => {
    if (file.size > MAX_FILE_SIZE && isFileTypeIsSupported(file)) {
      const reducedFileSize =
        file.size / (file.size > FILE_SIZE_THRESHOLD ? 2 * MAX_FILE_SIZE : MAX_FILE_SIZE);
      const resizedFile = await resizeFile(file, reducedFileSize);
      return resizedFile;
    }
    return file;
  };

  const onPressNext = async () => {
    LogEvent('PE_Identity_Click_Next');
    const formatedCard = await resizeFileIfNeeded(cardFront);
    const formatedSelfie = await resizeFileIfNeeded(selfie);
    dispatch(
      uploadDocumentsRequest({
        card: formatedCard,
        selfie: formatedSelfie,
      })
    )
      .unwrap()
      .then(() => {
        navigation.navigate('SymptomSelection');
      })
      .catch((e) => console.error(e));
  };

  const onBack = () => LogEvent('PE_Identity_Click_Back');

  return (
    <PaxFlowWrapper
      onExit={onExitFromPaxFlow}
      onPressButton={onPressNext}
      onBack={onBack}
      buttonTitle={t('paxlovid.eligibility.userInfo.submit')}
      buttonDisabled={!cardFront || !selfie}
      headerTitle={t('paxlovid.insurance.headerTitle')}
    >
      <FormIdentifyTemplate
        card={cardFront}
        selfie={selfie}
        translationPath='paxlovid.insurance'
        setSelfie={setSelfie}
        setCard={setCardFront}
      />
    </PaxFlowWrapper>
  );
};

export default EligibilityFormIdentify;
