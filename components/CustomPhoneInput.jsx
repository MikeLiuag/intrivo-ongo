import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../theme';

const CustomPhoneInput = ({ data, setField }) => {
  const ref = useRef();
  const formatPhonenumber = (text) => {
    const formattedText = text.trim();
    if (formattedText.charAt(formattedText.length - 1) !== '-') {
      if (formattedText.length === 4) {
        return `${formattedText.substr(0, 3)}-${formattedText[3]}`;
      }
      if (formattedText.length === 8) {
        return `${formattedText.substr(0, 7)}-${formattedText[7]}`;
      }
    }
    return formattedText;
  };

  return (
    <View style={styles.container}>
      <PhoneInput
        defaultCode={data.countryCode || 'US'}
        onChangeCountry={(country) => {
          setField('countryCode', country.cca2);
          setField('callingCode', `+${country.callingCode[0]}`);
        }}
        containerStyle={styles.phoneInputContainer}
        textContainerStyle={styles.phoneInputTextContainer}
        layout='second'
      />
      <TextInput
        ref={ref}
        style={styles.textInput}
        placeholder='##########'
        value={data.phoneNumber}
        onChangeText={(text) => {
          setField('phoneNumber', formatPhonenumber(text));
        }}
        maxLength={12}
        keyboardType='number-pad'
        returnKeyType='done'
        autoFocus
      />
    </View>
  );
};

export default CustomPhoneInput;

const styles = StyleSheet.create({
  container: {
    width: wp('84%'),
    borderRadius: 10,
    height: 60,
    marginTop: 5,
    textAlign: 'center',
    backgroundColor: colors.greyWhite,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: colors.greyExtraLight,
    flexDirection: 'row',
  },
  phoneInputContainer: {
    width: '20%',
  },
  phoneInputTextContainer: {
    backgroundColor: colors.greyWhite,
  },
  textInput: {
    width: '75%',
    marginLeft: 25,
    fontWeight: '500',
    fontSize: 16,
  },
});
