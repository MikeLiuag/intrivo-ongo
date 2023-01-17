import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { BlueButton } from './Buttons/BlueButton';

const TelehealthDisclaimer = ({ visible, onModalClose }) => {
  const { t } = useTranslation();
  return (
    <Modal visible={visible} transparent style={styles.modal}>
      <View style={styles.container}>
        <View style={{ flex: 3 }} />
        <View style={styles.textContainer}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontFamily: 'Museo_900' }}>
              {t('screens.telehealthPermissionsModal.title')}
            </Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontFamily: 'Museo_300' }}>
              {t('screens.telehealthPermissionsModal.body')}
            </Text>
          </View>
          <BlueButton
            title={t('screens.telehealthPermissionsModal.button')}
            action={onModalClose}
            style={{ marginTop: 20 }}
          />
        </View>
        <View style={{ flex: 2 }} />
      </View>
    </Modal>
  );
};

export default TelehealthDisclaimer;

const styles = StyleSheet.create({
  modal: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 24,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 100, height: 100 },
    padding: 24,
  },
});
