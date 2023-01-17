import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getDifferenceInDays } from '../../utilis/dateTime';
import { Container, TestInfo, ShowObservations, TestProviderAndUser, PaxlovidCTA } from './styles';
import { setMedicationState } from '../../store/medicationFlow/slice';

const translationPath = 'screens.sniffles';

export default function Appointment({ data, fullName, onCtaClick }) {
  const dispatch = useDispatch();
  const { date, name, data: { observations = [] } = {} } = data;
  const [ctaStatus, setCtaStatus] = useState('');
  const { t } = useTranslation();

  const isDateWithin5Days = getDifferenceInDays(date) <= 5;
  const isDateWithin14Days = getDifferenceInDays(date) <= 14;
  const isDateWithin15To30Days = getDifferenceInDays(date) <= 30 && getDifferenceInDays(date) >= 15;
  const isDateOver30Days = getDifferenceInDays(date) > 30;
  const isDateWithin6To30Days = getDifferenceInDays(date) <= 30 && getDifferenceInDays(date) >= 6;

  const positiveObservations = useMemo(
    () => observations.filter((r) => r?.data?.observed_data?.result === 'detected') || [],
    [observations]
  );

  const medicationRequests = observations.find(
    (o) => o.medication_requests && o.medication_requests.length > 0
  )?.medication_requests;
  const medicationRequestId = medicationRequests
    ? medicationRequests[medicationRequests.length - 1]?.legacy_id
    : null;

  const title = useMemo(() => {
    if (ctaStatus === 'sniffles_medication') {
      return t(`${translationPath}.prescriptionCTA`);
    }
    if (ctaStatus === 'paxlovid') {
      return t(`${translationPath}.eligibilityCTA`);
    }
    if (ctaStatus === 'sniffles_telehealth') {
      return t(`${translationPath}.telehealthCTA`);
    }
    return t(`${translationPath}.eligibilityCTA`);
  }, [ctaStatus, t]);

  useEffect(() => {
    let status = '';
    dispatch(
      setMedicationState({
        value: false,
        fieldName: 'existFluStrepIn14',
      })
    );
    if (positiveObservations.length === 0) {
      status = '';
    } else if (positiveObservations.length === 1) {
      if (positiveObservations[0].observation_type.includes('COVID-19')) {
        // Paxlovid
        if (isDateWithin5Days) {
          status = 'paxlovid';
        }
        if (isDateWithin6To30Days) {
          status = 'sniffles_telehealth'; // telehealth
        }
      } else if (
        positiveObservations[0].observation_type.includes('Strep') ||
        positiveObservations[0].observation_type.includes('Flu')
      ) {
        // Positive for only Flu or Strep
        if (isDateWithin14Days) {
          status = 'paxlovid';
          dispatch(
            setMedicationState({
              value: true,
              fieldName: 'existFluStrepIn14',
            })
          );
        }
        if (isDateWithin15To30Days) {
          status = 'sniffles_telehealth';
        }
      } else if (positiveObservations[0].observation_type.includes('RSV')) {
        status = 'sniffles_telehealth'; // Telehealth
      }
    } else if (positiveObservations.length > 1) {
      status = 'sniffles_telehealth'; // Telehealth
    } else {
      // Negative or Invalid case
      status = '';
    }
    if (medicationRequestId) {
      status = 'sniffles_medication';
    }
    setCtaStatus(status);
  }, [
    positiveObservations,
    isDateWithin15To30Days,
    isDateWithin14Days,
    isDateWithin6To30Days,
    isDateWithin5Days,
    medicationRequestId,
    dispatch,
  ]);

  const handleCTAClicked = () => {
    onCtaClick(ctaStatus, {
      ...positiveObservations[0],
      uuid: data.user_id,
      medicationRequest: medicationRequestId && { id: medicationRequestId },
    });
  };

  return (
    <Container handlePress={null}>
      <TestInfo showVirus showResult={false} name={name} date={date} />
      <ShowObservations data={observations} />
      <TestProviderAndUser showIcon={false} fullName={fullName} />
      {!isDateOver30Days && !!ctaStatus && (
        <PaxlovidCTA title={title} onAction={handleCTAClicked} />
      )}
    </Container>
  );
}
