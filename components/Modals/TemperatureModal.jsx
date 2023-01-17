import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import ModalWrapper from './ModalWrapper';
import { colors } from '../../theme';
import EditIcon from '../../assets/svgs/edit.svg';
import CloseIcon from '../Svg/close';
import { fonts } from '../../theme/fonts';
import { BlueButton } from '../Buttons/BlueButton';

const translationPath = 'modals.temperature';

const TemperatureModal = ({
  title,
  subtitle,
  isVisible,
  onPressCTA,
  onPressSkip,
  onPressClose,
}) => {
  const { t } = useTranslation();

  const renderContent = () => (
    <View style={styles.container}>
      <View style={styles.row}>
        <EditIcon />
        <TouchableOpacity onPress={onPressClose}>
          <CloseIcon height={14} width={14} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.spacer} />
      <View style={styles.row}>
        <BlueButton
          action={onPressSkip}
          style={styles.skipButton}
          title={t(`${translationPath}.skip`)}
          styleText={{ color: colors.greyMidnight }}
        />
        <BlueButton
          action={onPressCTA}
          style={styles.spacer}
          title={t(`${translationPath}.buttonTitle`)}
        />
      </View>
    </View>
  );

  return isVisible ? <ModalWrapper>{renderContent()}</ModalWrapper> : null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryPavement,
    width: '90%',
    height: 325,
    borderRadius: 10,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 14,
    marginBottom: 16,
    lineHeight: 25,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeExtraLarge,
  },
  subtitle: {
    fontFamily: fonts.familyNormal,
    color: colors.greyMed,
    lineHeight: 21,
  },
  spacer: {
    flex: 1,
  },
  skipButton: {
    flex: 1,
    marginRight: 15,
    backgroundColor: colors.white,
    borderColor: colors.greyLight,
  },
});

export default TemperatureModal;
