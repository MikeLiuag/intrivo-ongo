import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BlueButton } from '../../components/Buttons/BlueButton';
import FormIdentifyTemplate from '../../components/FormIdentifyTemplate';
import { isFileTypeIsSupported, resizeFile } from '../../utilis/file';
import { FILE_SIZE_THRESHOLD, MAX_FILE_SIZE } from '../VaccineCard/FilePicker';
import { snifflesFieldNames } from '../../store/medicationFlow/slice';
import { uploadDocumentsRequest } from '../../store/paxlovid/slice';
import { dimensions } from './styles';

const MedicationFormIdentify = ({ onChangeState, document, userId }) => {
  const dispatch = useDispatch();

  const [cardFront, setCardFront] = useState(document?.card || null);
  const [selfie, setSelfie] = useState(document?.selfie || null);

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
    const formatedCard = await resizeFileIfNeeded(cardFront);
    const formatedSelfie = await resizeFileIfNeeded(selfie);
    dispatch(
      uploadDocumentsRequest({
        card: formatedCard,
        selfie: formatedSelfie,
        userId,
      })
    )
      .unwrap()
      .then((data) => {
        onChangeState(
          {
            card: formatedCard,
            selfie: formatedSelfie,
            ids: data || [],
          },
          snifflesFieldNames.DOCUMENT,
          true
        );
      });
  };

  return (
    <>
      <FormIdentifyTemplate
        card={cardFront}
        selfie={selfie}
        setSelfie={setSelfie}
        setCard={setCardFront}
        translationPath='paxlovid.insurance'
        analyticName='Sniffles_Async_Upload'
      />
      <BlueButton
        style={{ marginHorizontal: dimensions.pageMarginHorizontal, marginBottom: 20 }}
        title='Next'
        disabled={!cardFront || !selfie}
        action={onPressNext}
      />
    </>
  );
};

export default MedicationFormIdentify;
