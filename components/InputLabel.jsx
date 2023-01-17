import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const InputWithLabel = ({
  label,
  value,
  onChangeText,
  required,
  half,
  password,
  limit,
  numeric,
  displayError,
  minLength,
}) => {
  const [blured, setBlured] = useState(false);
  const [focused, setFocused] = useState(false);
  let renderError;
  const isBlured = blured !== undefined ? blured : true;
  const isFocused = focused !== undefined ? focused : true;
  const shouldDisplayError = displayError !== undefined ? displayError : true;
  const shouldShowError =
    (!value || value.length < minLength) &&
    required &&
    (isBlured || isFocused || shouldDisplayError);

  if (shouldShowError) {
    renderError = (
      <Text
        style={{ fontSize: hp('2%'), color: '#ff4a42' }}
      >{`Please Enter ${label}`}</Text>
    );
  } else {
    renderError = null;
  }

  return (
    <View
      style={[{ paddingBottom: hp('1.5%') }, half ? styles.halfWidth : null]}
    >
      {/* if there is label prop show it else null */}
      {label ? (
        <View style={{ flexDirection: 'row' }}>
          {shouldShowError ? (
            <Text style={{ fontSize: 15, color: '#ff4a42' }}>{label}</Text>
          ) : (
            <Text style={{ fontSize: 15, color: '#949DB5' }}>{label}</Text>
          )}
          {required ? (
            <Text style={{ fontSize: 15, color: '#ff4a42' }}>*</Text>
          ) : null}
        </View>
      ) : null}
      {/* input */}
      <TextInput
        onChangeText={(text) => {
          onChangeText(text);
          if (!focused) setFocused(true);
        }}
        style={[
          shouldShowError
            ? { borderColor: '#ff4a42' }
            : { borderColor: '#949DB5' },
          styles.Input,
        ]}
        value={value}
        secureTextEntry={password}
        keyboardType={numeric ? 'numeric' : 'default'}
        maxLength={limit}
        onBlur={() => setBlured(true)}
      />
      {/* if there is error show it */}
      {renderError}
    </View>
  );
};

const styles = StyleSheet.create({
  halfWidth: {
    width: '48%',
  },
  Input: {
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('1.5%'),
    borderRadius: hp('1.2%'),
    marginVertical: hp('0.8%'),
    fontSize: 18,
    borderWidth: 1,
    color: '#2D3142',
  },
});

export default InputWithLabel;
