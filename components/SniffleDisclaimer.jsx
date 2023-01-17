import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';
import { BlueButton } from './Buttons/BlueButton';
import CloseIcon from './Svg/close';

function SniffleDisclaimer({ visible, onModalClose }) {
  const { t } = useTranslation();

  return (
    <Modal visible={visible} transparent style={styles.modal}>
      <View style={styles.modalcontainer}>
        <View style={{ flex: 2 }} />
        <View style={styles.textContainer}>
          <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.beta, { alignSelf: 'flex-start' }]}>
              {t('screens.sniffles.disclaimer.beta')}
            </Text>
            <Pressable
              onPress={() => {
                onModalClose(false);
              }}
            >
              <CloseIcon width={14} height={14} />
            </Pressable>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: fonts.sizeExtraLarge,
                fontFamily: fonts.familyBold,
                color: colors.greyMidnight,
                lineHeight: 25,
              }}
            >
              {t('screens.sniffles.disclaimer.title')}
            </Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: fonts.sizeNormal,
                fontFamily: fonts.familyNormal,
                color: colors.greyMed,
                lineHeight: 21,
              }}
            >
              {t('screens.sniffles.disclaimer.description')}
            </Text>
          </View>
          <BlueButton
            title={t('screens.sniffles.disclaimer.buttonTitle')}
            action={() => {
              onModalClose(true);
            }}
            style={{ marginTop: 20 }}
            styleText={{ fontFamily: fonts.familyBold, fontSize: fonts.sizeExtraLarge }}
          />
        </View>
        <View style={{ flex: 2 }} />
      </View>
    </Modal>
  );
}

export default SniffleDisclaimer;

const styles = StyleSheet.create({
  modal: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalcontainer: {
    paddingHorizontal: 24,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  textContainer: {
    backgroundColor: colors.primaryPavement,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 100, height: 100 },
    padding: 24,
  },
  beta: {
    backgroundColor: colors.primaryBlue,
    color: colors.white,
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 5,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeNormal,
    marginTop: 10,
  },
});
