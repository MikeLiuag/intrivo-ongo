import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Tooltip } from 'react-native-elements';
import { colors } from '../../theme';
import InputLeftLabel from '../InputLeftLabel';
import { states } from '../../utilis/mock';
import Icon from '../Icon';
import PickerDropdown from '../Picker';

const BillingInfo = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    state_id: '',
    address_1: '',
    address_2: '',
    city: '',
    zipcode: '',
    phoneNumber: '',
  });
  return (
    <View style={styles.container}>
      <InputLeftLabel
        error=''
        value={data.first_name}
        placeholder={t('placeholder.firstName')}
        action={(value) => {
          setData((current) => ({
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
          setData((current) => ({
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
          setData((current) => ({
            ...current,
            address_1: value,
          }));
        }}
      />
      <InputLeftLabel
        error=''
        value={data.address_2}
        placeholder={t('placeholder.addredd2Optional')}
        action={(value) => {
          setData((current) => ({
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
          setData((current) => ({
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
            setData((current) => ({
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
          setData((current) => ({
            ...current,
            zipcode: value,
          }));
        }}
      />
      <View style={styles.phoneInputContainer}>
        <View style={styles.phoneInput}>
          <InputLeftLabel
            error=''
            value={data.phoneNumber}
            placeholder={t('placeholder.phoneNumber')}
            action={(value) => {
              setData((current) => ({
                ...current,
                phoneNumber: value,
              }));
            }}
          />
        </View>

        <View style={styles.phoneToolTip}>
          <Tooltip
            withOverlay={false}
            backgroundColor={colors.greyDark2}
            containerStyle={{ borderRadius: 0 }}
            popover={<Text style={styles.tooltipText}>{t('checkout.phoneToolTip')}</Text>}
            height={80}
            width={120}
          >
            <Icon type='MaterialIcons' name='info' size={26} color={colors.primaryBlue} />
          </Tooltip>
        </View>
      </View>
    </View>
  );
};

export default BillingInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingBottom: 20,
  },
  tooltipText: {
    fontFamily: 'Museo_500',
    color: colors.greyWhite,
    fontSize: 12,
    textAlign: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    width: '90%',
  },
  phoneToolTip: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemSeparator: {
    marginVertical: hp('1%'),
  },
});
