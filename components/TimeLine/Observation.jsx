import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Container, TestInfo, TestProviderAndUser, PaxlovidCTA } from './styles';
import { colors } from '../../theme';

const translationPath = 'screens.sniffles';
const statuses = ['Negative', 'Positive', 'Invalid'];
const statusColors = [colors.statusGreen, colors.statusRed, colors.statusOrange];

export default function Observation({
  data,
  fullName,
  onPressPaxlovid,
  onPressObservation,
  onPressSniffles,
  containerStyle,
}) {
  const { t } = useTranslation();
  const {
    id,
    date,
    medicationRequest,
    name,
    result,
    showPaxlovidCTA,
    showSnifflesCTA,
    symptoms,
    testName,
    uuid,
    data: { medication_requests: medicationRequests = [] } = { medication_requests: [] },
  } = data;
  const medicationRequestId = medicationRequests[medicationRequests.length - 1]?.legacy_id || null;

  const title = medicationRequestId ? 'prescriptionCTA' : 'eligibilityCTA';

  const statusColor = statusColors[result];
  const statusText = statuses[result];

  const sniffleNegativeResultTile = useSelector((state) => state.app.sniffleNegativeResultTile);

  const handlePaxlovidClicked = () => {
    onPressPaxlovid({
      id,
      uuid,
      date,
      symptoms,
      medicationRequest,
      medicationRequestId,
    });
  };

  const handleObservationClicked = () => {
    onPressObservation(data, statusText, statusColor);
  };

  return (
    <Container style={containerStyle} handlePress={handleObservationClicked}>
      <TestInfo showVirus showResult name={name} result={result} date={date} />
      <TestProviderAndUser fullName={fullName} testName={testName} showIcon />
      {showPaxlovidCTA && (
        <PaxlovidCTA title={t(`${translationPath}.${title}`)} onAction={handlePaxlovidClicked} />
      )}
      {showSnifflesCTA && sniffleNegativeResultTile && (
        <PaxlovidCTA title={t('screens.sniffles.cta')} onAction={onPressSniffles} />
      )}
    </Container>
  );
}
