import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import InputLeftLabel from '../../../components/InputLeftLabel';
import Icon from '../../../components/Icon';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';

const AddMedications = ({
  data = [{ name: '', isNew: true }],
  onChange,
  placeholder,
  addButtonTitle,
}) => {
  const onChangeMedication = (value, idx) => {
    const temp = data.map((r, id) => {
      if (id === idx) return { ...r, name: value };
      return r;
    });
    onChange(temp);
  };

  const onPlus = () => {
    const temp = data.concat({ name: '', isNew: true });
    onChange(temp);
  };

  const onRemove = (idx) => {
    const temp = data.filter((r, id) => id !== idx);
    onChange(temp);
  };
  return (
    <ScrollView keyboardShouldPersistTaps='always'>
      <View style={styles.containerInput}>
        <InputLeftLabel
          value={data[0]?.name || ''}
          action={(value) => onChangeMedication(value, 0)}
          placeholder={placeholder}
        />
      </View>
      {data?.length > 0 &&
        data
          .filter((_, i) => i > 0)
          .map((r, idx) => (
            <View style={styles.containerInput}>
              <InputLeftLabel
                customStyle={r?.isNew ? styles.inputStyle : null}
                value={r?.name || ''}
                action={(value) => onChangeMedication(value, idx + 1)}
                placeholder={placeholder}
              />
              <Pressable onPress={() => onRemove(idx + 1)}>
                <Icon type='Ionicons' name='close-circle' size={20} color={colors.primaryBlue} />
              </Pressable>
            </View>
          ))}
      <Pressable onPress={onPlus}>
        <Text style={styles.add}>{addButtonTitle}</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    minWidth: '90%',
  },
  add: {
    fontFamily: fonts.familyBold,
    color: colors.primaryBlue,
    paddingVertical: 10,
  },
});

export default AddMedications;
