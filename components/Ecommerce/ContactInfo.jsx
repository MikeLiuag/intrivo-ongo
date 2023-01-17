import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-native-elements';

import { colors } from '../../theme';
import Icon from '../Icon';

import InputLeftLabel from '../InputLeftLabel';

const ContactInfo = ({ editMode, onClickEdit, onChangeData, data }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>
          {t('checkout.contactInformation')}
        </Text>
        {!editMode && (
          <TouchableOpacity>
            <Text
              style={styles.editButtonText}
              onPress={() => {
                onClickEdit();
              }}
            >
              {t('checkout.edit')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.editForm}>
        {editMode ? (
          <>
            <InputLeftLabel
              error=""
              value={data.email}
              placeholder={t('placeholder.email')}
              action={(value) => {
                onChangeData((current) => ({
                  ...current,
                  email: value,
                }));
              }}
            />
            <View style={styles.phoneInputContainer}>
              <View style={styles.phoneInput}>
                <InputLeftLabel
                  error=""
                  value={data.phoneNumber}
                  keyboardType="number-pad"
                  placeholder={t('placeholder.phoneNumber')}
                  action={(value) => {
                    onChangeData((current) => ({
                      ...current,
                      phoneNumber: value,
                    }));
                  }}
                />
              </View>

              <View style={styles.phoneTootTip}>
                <Tooltip
                  withOverlay={false}
                  backgroundColor={colors.greyDark2}
                  popover={
                    <Text style={styles.tooltipText}>
                      {t('checkout.phoneToolTip')}
                    </Text>
                  }
                  height={80}
                  width={120}
                >
                  <Icon
                    type="MaterialIcons"
                    name="info"
                    size={26}
                    color={colors.primaryBlue}
                  />
                </Tooltip>
              </View>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.contactText}>{data?.email}</Text>
            <Text style={styles.contactText}>{data?.phoneNumber}</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default ContactInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryButtonBorder,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Museo_700',
    color: colors.greyDark2,
  },
  tooltipText: {
    fontFamily: 'Museo_500',
    color: colors.greyWhite,
    fontSize: 12,
    textAlign: 'center',
  },
  editButtonText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Museo_700',
    color: colors.primaryBlue,
  },
  editForm: {
    marginTop: 10,
  },
  phoneInputContainer: { flexDirection: 'row', alignItems: 'center' },
  phoneInput: { width: '90%' },
  phoneTootTip: { marginLeft: 10, justifyContent: 'center' },
  contactText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Museo_500',
    color: colors.greyMed,
  },
});
