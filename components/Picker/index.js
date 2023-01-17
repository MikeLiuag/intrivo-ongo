import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Platform, TouchableOpacity, View, Modal, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../theme';
import ArrowIcon from '../../assets/svgs/picker_arrow.svg';
import { fonts } from '../../theme/fonts';

const PickerDropdown = ({
  value,
  onChange,
  containerStyle,
  placeholder,
  allowEmpty = true,
  items,
  style,
  textStyle,
  disabled,
}) => {
  const data = allowEmpty ? [{ label: '', value: '' }, ...items] : items;
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const [selectedValue, setSelectedValue] = useState(value);

  const displayedValue = data.find((item) => item.value === selectedValue)?.label || placeholder;

  const pickerStyle = Platform.select({ android: styles.androidPicker });

  const closePicker = () => setIsPickerVisible(false);
  const openPicker = () => setIsPickerVisible(true);

  const onValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    onChange(itemValue);
  };

  const Input = () => {
    const valueColor = selectedValue ? colors.greyMidnight : colors.greyGrey;
    const justifyContent = selectedValue ? 'flex-start' : 'center';

    return (
      <TouchableOpacity disabled={disabled} style={[styles.input, style]} onPress={openPicker}>
        <View style={[styles.labelContainer, { justifyContent }]}>
          {!!selectedValue && <Text style={styles.label}>{placeholder}</Text>}
          <Text style={[styles.value, { color: valueColor }, textStyle]}>{displayedValue}</Text>
        </View>
        <ArrowIcon />
      </TouchableOpacity>
    );
  };

  const renderDoneButton = () => (
    <TouchableOpacity style={styles.doneButtonContainer} onPress={closePicker}>
      <Text style={styles.doneButton}>Done</Text>
    </TouchableOpacity>
  );

  const renderPicker = () => (
    <Picker
      style={pickerStyle}
      enabled={!disabled}
      onValueChange={onValueChange}
      selectedValue={selectedValue}
    >
      {data.map(({ label, value: _value }) => (
        <Picker.Item key={label} label={label} value={_value} />
      ))}
    </Picker>
  );

  const renderIOSPicker = () => (
    <Modal visible={isPickerVisible} transparent animationType='slide'>
      <TouchableOpacity style={{ flex: 1 }} onPress={closePicker} />
      {renderDoneButton()}
      <View style={styles.modalViewBottom}>{renderPicker()}</View>
    </Modal>
  );

  const renderContent = () => Platform.select({ ios: renderIOSPicker(), android: renderPicker() });

  return (
    <View style={{ alignSelf: 'stretch', justifyContent: 'center', ...containerStyle }}>
      <Input />
      {renderContent()}
    </View>
  );
};

export default PickerDropdown;

const styles = StyleSheet.create({
  doneButtonContainer: {
    height: 40,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingRight: 15,
    alignItems: 'flex-end',
    borderColor: colors.lavender,
    backgroundColor: colors.gray97,
  },
  doneButton: {
    color: colors.cyanBlue,
    fontSize: 17,
    fontWeight: '600',
  },
  input: {
    height: hp('8.5%'),
    borderRadius: 16,
    paddingLeft: 16,
    paddingRight: 23,
    borderWidth: 1,
    borderColor: colors.greyLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  value: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyNormal,
  },
  label: {
    fontSize: fonts.sizeSmall,
    color: colors.greyGrey,
  },
  labelContainer: {
    height: '100%',
    paddingTop: 8,
  },
  modalViewBottom: {
    justifyContent: 'center',
    backgroundColor: colors.greyPicker,
  },
  androidPicker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    color: 'transparent',
    opacity: 0,
  },
});
