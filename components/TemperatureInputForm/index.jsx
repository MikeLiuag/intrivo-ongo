import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, StyleSheet, Text, Modal } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { getImageRecognitionResult, setGlobalErrors } from '../../store/app/slice';
import { colors } from '../../theme';
import { fonts } from '../../theme/fonts';
import InputLeftLabel from '../InputLeftLabel';
import Scanner from '../Scanner';
import WarningIcon from '../../assets/svgs/warning.svg';
import { parseTextScannerResponse } from '../../utilis/helpers';

const translationsPath = 'screens.sniffles.assessmentQuestion.question1.temperatureForm';

const MEASUREMENT_UNITS = ['F', 'C'];

const fahrenheitToCelcius = (fahrenheit) => ((fahrenheit - 32) * (5 / 9)).toFixed(1);
const celciusToFahrenheit = (celcius) => ((celcius * 9) / 5 + 32).toFixed(1);

const TemperatureInputForm = ({
  temperature,
  withWarning,
  onChangeData,
  measurementUnit,
  cancelButtonTitle,
  onPressEnterManually,
  onChangeMeasurementUnit,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [scannedTemperature, setScannedTemperature] = useState(temperature);
  const [scannerIsVisible, setIsScannerVisible] = useState(!temperature);
  const [retriesCount, setRetriesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const temperatureInCelcius = fahrenheitToCelcius(scannedTemperature);
  const temperatureInFahrenheit = celciusToFahrenheit(scannedTemperature);

  const onTemperatureChange = (value) => onChangeData(value);

  const openScanner = () => {
    setIsScannerVisible(true);
    setRetriesCount(0);
  };

  const closeScanner = () => {
    setIsScannerVisible(false);
    setScannedTemperature('');
    onChangeData(null);
  };

  const enterManually = () => {
    setScannedTemperature('');
    onPressEnterManually?.();
  };

  const onScanningError = () => {
    dispatch(
      setGlobalErrors({
        message: t(`${translationsPath}.error.message`),
        subtitle: t(`${translationsPath}.error.subtitle`),
      })
    );
    setIsScannerVisible(false);
  };

  const handleRecognitionResponse = (data) => {
    const { numberMatches, stringMatches } = parseTextScannerResponse(data);
    const fullyScanned = !!numberMatches.length && !!stringMatches.length;
    const partiallyScanned = !!numberMatches.length && !stringMatches.length;

    if (fullyScanned) {
      const result = Number(numberMatches[0]);
      const displayedResult = (result > 900 ? result / 10 : result).toFixed(1);

      setScannedTemperature(displayedResult);
      onChangeData(displayedResult);
      onChangeMeasurementUnit(stringMatches[0]);
      setIsScannerVisible(false);
    } else if (partiallyScanned) {
      onChangeData(numberMatches[0]);
      setIsScannerVisible(false);
      onChangeMeasurementUnit('');
    } else if (retriesCount < 1) {
      setRetriesCount((count) => count + 1);
    } else {
      onScanningError();
    }
  };

  const onCaptureImage = ({ base64 }) => {
    setLoading(true);
    const request = { data: { image: base64 } };

    dispatch(getImageRecognitionResult(request))
      .unwrap()
      .then(handleRecognitionResponse)
      .finally(() => setLoading(false));
  };

  const renderCTAButton = () => {
    const buttonTitle = scannedTemperature
      ? t(`${translationsPath}.manualEnterCTA`)
      : t(`${translationsPath}.scanCTA`);

    const onPress = scannedTemperature ? enterManually : openScanner;

    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.buttonTitle}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
  };

  const renderMeasurementUnits = () =>
    MEASUREMENT_UNITS.map((unit) => {
      const isActive = unit === measurementUnit;
      const backgroundColor = isActive ? colors.primaryBlue : colors.white;
      const textColor = isActive ? colors.white : colors.primaryBlue;

      return (
        <TouchableOpacity
          key={unit}
          onPress={() => onChangeMeasurementUnit(unit)}
          style={[styles.unitContainer, { backgroundColor }]}
        >
          <Text style={[styles.unitText, { color: textColor }]}>{unit}</Text>
        </TouchableOpacity>
      );
    });

  if (scannerIsVisible) {
    return (
      <Modal visible>
        <Scanner
          maskType='card'
          resetAfterCapture
          onCancel={closeScanner}
          maskDescription='Scan reading'
          onCaptureImage={onCaptureImage}
          quality={0.4}
          needToResize
          leftButtonTitle={cancelButtonTitle}
          imageLoading={loading}
        />
      </Modal>
    );
  }

  const renderManualInput = () => (
    <View style={styles.row}>
      <InputLeftLabel
        value={temperature}
        keyboardType='numeric'
        action={onTemperatureChange}
        customStyle={{ minWidth: '65%' }}
        placeholder={t(`${translationsPath}.label`)}
        maxLength={measurementUnit === MEASUREMENT_UNITS[0] ? 5 : 4}
      />
      {renderMeasurementUnits()}
    </View>
  );

  const renderScannedResult = () => {
    const isCelcius = measurementUnit === MEASUREMENT_UNITS[1];
    const { celcius, fahrenheit } = {
      celcius: isCelcius ? scannedTemperature : temperatureInCelcius,
      fahrenheit: isCelcius ? temperatureInFahrenheit : scannedTemperature,
    };

    return (
      <Text style={styles.scannedResultText}>
        {fahrenheit}
        {MEASUREMENT_UNITS[0]} / {celcius}
        {MEASUREMENT_UNITS[1]}
      </Text>
    );
  };

  const renderWarning = () =>
    withWarning &&
    !!scannedTemperature && (
      <View style={styles.warningContainer}>
        <WarningIcon />
        <Text style={styles.warningText}>{t(`${translationsPath}.warning`)}</Text>
      </View>
    );

  const renderContent = () => (scannedTemperature ? renderScannedResult : renderManualInput)();

  return (
    <View style={styles.container}>
      {renderContent()}
      {renderWarning()}
      {renderCTAButton()}
    </View>
  );
};

export default TemperatureInputForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  unitContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: hp('1%'),
    marginRight: 0,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primaryBlue,
  },
  unitText: {
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLarge,
  },
  buttonTitle: {
    fontFamily: fonts.familyNormal,
    color: colors.primaryBlue,
    fontSize: fonts.sizeLarge,
  },
  buttonContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  scannedResultText: {
    fontFamily: fonts.familyLight,
    fontSize: 35,
    textAlign: 'center',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  warningText: {
    color: colors.statusRed,
    marginLeft: 15,
  },
});
