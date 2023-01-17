import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { colors } from '../theme';
import InputLeftLabel from './InputLeftLabel';
import { states, sex } from '../utilis/mock';
import PickerDropdown from './Picker';

const NIHReportForm = ({ type, index, data, onChangeData }) => {
  const { t } = useTranslation();
  const { ethnicitiesTypes, racesTypes } = useSelector((s) => s.app);
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 25 }}>
        {type === 'report_all' && (
          <Text style={styles.instruction}>{t('reporting.instruction1')}</Text>
        )}

        {type === 'report_all' && index === 0 ? (
          <>
            <InputLeftLabel
              value={data?.address}
              action={(value) => {
                onChangeData({ ...data, address: value });
              }}
              placeholder={t('placeholder.address')}
              textContentType='streetAddressLine1'
              autoCompleteType='street-address'
              notTrimWhenKeyboardIsHide
            />
            <InputLeftLabel
              value={data?.city}
              action={(city) => {
                onChangeData({ ...data, city });
              }}
              placeholder={t('placeholder.city')}
              textContentType='addressCity'
              autoCompleteType='street-address'
              notTrimWhenKeyboardIsHide
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <PickerDropdown
                value={data?.state_id}
                placeholder={t('placeholder.state')}
                containerStyle={{ width: '50%' }}
                items={states}
                onChange={(value) => {
                  onChangeData({ ...data, state_id: value });
                }}
              />
              <InputLeftLabel
                value={data?.zipcode}
                action={(zipcode) => {
                  onChangeData({ ...data, zipcode });
                }}
                placeholder={`${t('placeholder.zipCode')} *`}
                autoCompleteType='postal-code'
                textContentType='postalCode'
                customStyle={{ minWidth: '45%' }}
                notTrimWhenKeyboardIsHide
              />
            </View>
          </>
        ) : null}
        {type !== 'report_all' && (
          <InputLeftLabel
            value={data?.zipcode}
            action={(zipcode) => {
              onChangeData({ ...data, zipcode });
            }}
            placeholder={`${t('placeholder.zipCode')} *`}
            autoCompleteType='postal-code'
            textContentType='postalCode'
            notTrimWhenKeyboardIsHide
          />
        )}
        <PickerDropdown
          value={data?.sex}
          placeholder='Select sex'
          style={[styles.picker, { width: '100%' }]}
          items={sex}
          onChange={(value) => {
            onChangeData({ ...data, sex: value });
          }}
        />

        <PickerDropdown
          value={data?.race}
          placeholder='Select race'
          style={[styles.picker, { width: '100%' }]}
          items={racesTypes}
          onChange={(value) => {
            onChangeData({ ...data, race: value });
          }}
        />

        <PickerDropdown
          value={data?.ethinicity}
          placeholder='Select ethnicity'
          style={[styles.picker, { width: '100%' }]}
          items={ethnicitiesTypes}
          onChange={(value) => {
            onChangeData({ ...data, ethinicity: value });
          }}
        />
      </View>
    </View>
  );
};

export default memo(NIHReportForm);

const styles = StyleSheet.create({
  conitaner: {
    flex: 1,
    backgroundColor: colors.primaryGhost,
  },

  picker: {
    width: '45%',
    marginVertical: hp('1%'),
  },
  footer: { flex: 1, justifyContent: 'flex-end', marginBottom: 20 },
  blueButton: { height: 60, marginTop: 40, borderRadius: 16 },
  blueButtonText: {
    fontSize: 16,
    color: colors.greyWhite,
    fontFamily: 'Museo_700',
    lineHeight: 19,
  },
  instruction: {
    color: colors.greyMed,
    fontSize: 13,
    fontFamily: 'Museo_500',
    lineHeight: 16,
  },
});
