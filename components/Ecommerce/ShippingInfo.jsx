import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../theme';
import InputLeftLabel from '../InputLeftLabel';
import { states } from '../../utilis/mock';
import PickerDropdown from '../Picker';

const ShippingInfo = ({ editMode, onClickEdit, editable = true, onChangeData, data }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>{t('checkout.shippingInformation')}</Text>
        {!editMode && editable && (
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
              error=''
              value={data.first_name}
              placeholder={t('placeholder.firstName')}
              action={(value) => {
                onChangeData((current) => ({
                  ...current,
                  first_name: value,
                }));
              }}
            />
            <InputLeftLabel
              error=''
              value={data.last_name}
              placeholder={t('placeholder.lastName')}
              action={(value) => {
                onChangeData((current) => ({
                  ...current,
                  last_name: value,
                }));
              }}
            />
            <InputLeftLabel
              error=''
              value={data.address_1}
              placeholder={t('placeholder.address1')}
              action={(value) => {
                onChangeData((current) => ({
                  ...current,
                  address_1: value,
                }));
              }}
            />
            <InputLeftLabel
              error=''
              value={data.address_2}
              placeholder={t('placeholder.address2')}
              action={(value) => {
                onChangeData((current) => ({
                  ...current,
                  address_2: value,
                }));
              }}
            />
            <InputLeftLabel
              error=''
              value={data.city}
              placeholder={t('placeholder.city')}
              action={(value) => {
                onChangeData((current) => ({
                  ...current,
                  city: value,
                }));
              }}
            />
            <View style={styles.itemSeparator}>
              <PickerDropdown
                value={data.state_id}
                placeholder={t('placeholder.state')}
                items={states}
                onChange={(value) => {
                  onChangeData((current) => ({
                    ...current,
                    state_id: value,
                  }));
                }}
              />
            </View>
            <InputLeftLabel
              error=''
              value={data.zipcode}
              placeholder={t('placeholder.zipCode')}
              action={(value) => {
                onChangeData((current) => ({
                  ...current,
                  zipcode: value,
                }));
              }}
            />
          </>
        ) : (
          <>
            <Text style={styles.contactText}>
              {data?.first_name} {data?.last_name}
            </Text>
            <Text style={styles.contactText}>
              {data?.address_1} {data?.address_2}
            </Text>
            <Text style={styles.contactText}>
              {data?.city} {data?.zipcode}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default ShippingInfo;

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
  editButtonText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Museo_700',
    color: colors.primaryBlue,
  },
  editForm: {
    marginTop: 10,
  },
  contactText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Museo_500',
    color: colors.greyMed,
  },
  itemSeparator: {
    marginVertical: hp('1%'),
  },
});
