import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { AuthenticationType } from 'expo-local-authentication';
// Svg-s
import EyeIcon from './Svg/eyeIcon';
import HideEyeIcon from './Svg/HideEyeIcon';
import FaceIdIcon from './Svg/FaceIdIcon';
import { colors } from '../theme';
import FingerIdIcon from './Svg/FingerIdIcon';
import { fonts } from '../theme/fonts';

export default ({
  value,
  action,
  placeholder,
  error,
  autoCapitalize,
  secureTextEntry,
  autoFocus,
  keyboardType,
  onFocus,
  onBlur,
  faceId,
  bioAuthType,
  hideShow,
  hideShowAction,
  faceIdAction,
  showPassword,
  textContentType,
  autoCompleteType,
  autoCorrect,
  inputRef,
  trim,
  right,
  left,
  editable = true,
  maxLength,
  // fixed issue with multiple date pickers
  notTrimWhenKeyboardIsHide,
  customStyle = {},
  dropDownItems = [],
  onSelectDropDownItem,
  dropDownKeyExtractor,
  fieldValidationRule,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [localError, setLocalError] = useState(error);

  const isNotValid = localError || error;

  const keyboardDidHide = useCallback(() => {
    if (action && !notTrimWhenKeyboardIsHide) action(value?.trim());
  }, [action, notTrimWhenKeyboardIsHide, value]);

  useEffect(() => {
    const keyboardSubscription = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      keyboardSubscription.remove();
    };
  }, [value, keyboardDidHide]);

  const onChangeText = (text) => {
    const returnedText = trim ? text.trim() : text;
    setIsDropdownVisible(true);

    return action(returnedText);
  };

  const onPressDropDownItem = (item) => {
    onSelectDropDownItem?.(item);
    setIsDropdownVisible(false);
  };

  const checkLocalError = () => {
    if (fieldValidationRule) {
      const isValid = fieldValidationRule(value);

      setLocalError(!isValid);
    }
  };

  const onBlurAction = () => {
    onBlur?.();
    if (action && !notTrimWhenKeyboardIsHide) action(value?.trim());
    if (fieldValidationRule) checkLocalError();
  };

  const renderDropDownItems = () =>
    dropDownItems.map((item) => {
      const displayedItem = dropDownKeyExtractor ? dropDownKeyExtractor(item) : item;

      return (
        <TouchableOpacity key={item.id} onPress={() => onPressDropDownItem(item)}>
          <Text style={styles.dropDownItemText}>{displayedItem}</Text>
        </TouchableOpacity>
      );
    });

  const renderDropDown = () =>
    isDropdownVisible &&
    !!dropDownItems.length && (
      <View style={styles.dropDownContainer}>
        <ScrollView>
          {renderDropDownItems()}
          <View style={{ height: 10 }} />
        </ScrollView>
      </View>
    );

  const renderErrorText = () =>
    isNotValid && (
      <Text allowFontScaling={false} style={{ color: colors.statusRed }}>
        {typeof error === 'string' ? error : `Please Enter ${placeholder}`}
      </Text>
    );

  return (
    <View>
      {renderErrorText()}
      <View
        style={[
          isNotValid ? { borderColor: colors.statusRed } : { borderColor: colors.greyLight },
          { zIndex: dropDownItems.length ? 3 : 0 },
          styles.inputContainer,
          customStyle,
        ]}
      >
        {!!left && left}
        <View style={{ flex: 1 }}>
          {value && value.length > 0 ? (
            <Text
              allowFontScaling={false}
              style={[
                isNotValid ? { color: colors.statusRed } : { color: colors.greyGrey },
                styles.inputLabel,
              ]}
            >
              {placeholder}
            </Text>
          ) : null}
          <TextInput
            autoComplete={autoCompleteType}
            placeholder={placeholder}
            style={[
              value && value.length > 0 ? styles.labelPadding : styles.noLabelPadding,
              faceId || hideShow ? { width: '75%' } : { width: '100%' },
              styles.inputInner,
              { backgroundColor: editable ? colors.white : colors.secondaryButtonBorder },
            ]}
            value={value}
            editable={editable}
            onFocus={onFocus}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            onChangeText={action ? onChangeText : null}
            onBlur={onBlurAction}
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            textContentType={textContentType || 'none'}
            autoCorrect={autoCorrect}
            importantForAutofill='yes'
            returnKeyType='done'
            ref={inputRef}
            allowFontScaling={false}
            maxLength={maxLength}
          />
        </View>
        {faceId ? (
          <TouchableOpacity
            style={styles.innerButton}
            onPress={faceIdAction ? () => faceIdAction() : null}
          >
            {bioAuthType === AuthenticationType[2] ? (
              <FaceIdIcon width={25} height={25} />
            ) : (
              <FingerIdIcon />
            )}
          </TouchableOpacity>
        ) : null}

        {hideShow ? (
          <TouchableOpacity
            style={styles.innerButton}
            onPress={hideShowAction ? () => hideShowAction() : null}
          >
            {showPassword ? (
              <EyeIcon width={24} height={17} />
            ) : (
              <HideEyeIcon width={23} height={20} />
            )}
          </TouchableOpacity>
        ) : null}
        {!!right && right}
      </View>
      {renderDropDown()}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colors.greyWhite,
    width: '100%',
    minWidth: '100%',
    position: 'relative',
    marginVertical: hp('1%'),
    maxHeight: hp('8.5%'),
    minHeight: hp('8.5%'),
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: wp('4%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputInner: {
    backgroundColor: colors.greyWhite,
    flex: 1,
    fontSize: 16,
    borderRadius: wp('4%'),
    paddingLeft: Platform.OS === 'ios' ? wp('3.3%') : wp('4%'),
  },
  inputLabel: {
    top: Platform.OS === 'ios' ? hp('0.8%') : hp('1%'),
    left: Platform.OS === 'ios' ? wp('3.3%') : wp('4%'),
    zIndex: 999,
    position: 'absolute',
    fontSize: 13,
  },
  labelPadding: {
    paddingTop: Platform.OS === 'ios' ? hp('4%') : hp('3.5%'),
    paddingBottom: hp('1.5%'),
  },
  noLabelPadding: {
    paddingTop: Platform.OS === 'ios' ? hp('2.75%') : hp('2.25%'),
    paddingBottom: Platform.OS === 'ios' ? hp('2.75%') : hp('2.25%'),
  },
  innerButton: {
    width: '12.5%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  dropDownContainer: {
    marginTop: -15,
    width: '98%',
    backgroundColor: colors.white,
    marginLeft: '1%',
    paddingTop: 27,
    paddingLeft: 13,
    zIndex: 2,
    maxHeight: 100,
    position: 'absolute',
    top: hp('8.5%') + 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  dropDownItemText: {
    fontFamily: fonts.familyNormal,
    color: colors.greyGrey,
    fontSize: fonts.sizeLarge,
    marginBottom: 12,
  },
});
