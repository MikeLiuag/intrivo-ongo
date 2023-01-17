/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme';
import Icon from './Icon';

const SearchInput = ({
  label,
  withIcon,
  onChange,
  inputStyle,
  placeholder,
  containerStyle,
  placeholderColor,
  ...props
}) => {
  const { t } = useTranslation();

  const renderIcon = () =>
    withIcon && (
      <View style={styles.iconContainer}>
        <Icon type='MaterialIcons' name='search' size={24} />
      </View>
    );

  const renderLabel = () => label && <Text style={styles.label}>{t(label)}</Text>;

  return (
    <View style={[styles.container, containerStyle]}>
      {renderLabel()}
      {renderIcon()}
      <TextInput
        onChange={onChange}
        placeholderTextColor={placeholderColor}
        style={[styles.input, inputStyle, { paddingTop: label ? 16 : 0 }]}
        placeholder={placeholder || t('paxlovid.eligibility.medicationSelect.inputPlaceholder')}
        {...props}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 3,
    left: 15,
    top: 10,
  },
  label: {
    fontSize: 12,
    position: 'absolute',
    top: 13,
    left: 16,
    zIndex: 3,
    color: colors.greyGrey,
  },
  input: {
    backgroundColor: '#fff',
    height: 48,
    width: '100%',
    color: colors.greyDark2,
    fontSize: 16,
    fontFamily: 'Museo_500',
    marginHorizontal: 16,
    paddingLeft: 48,
    borderRadius: 4,
    borderColor: colors.greyGrey,
    borderWidth: 1,
  },
});
