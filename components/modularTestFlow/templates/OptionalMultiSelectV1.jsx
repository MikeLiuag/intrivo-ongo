import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Select from '../components/buttons/select';
import FormattedText from '../components/formattedText';
import parseForVars from '../utils/parser';

const joinValues = (vals = []) =>
  vals.reduce((acc, curr) => acc.concat(`${curr.text}, `), '').slice(0, -2);

const OptionalMultiSelectV1 = ({ args, vars, onAction = () => null }) => {
  const [listSelected, setListSelected] = useState(args.list_options.options);
  const [noneSelected, setNoneSelected] = useState(false);

  const handleSelect = (s) => {
    const newListSelected = listSelected.map((item) => {
      if (item.value === s.value) {
        return { ...item, active: !item.active };
      }
      return item;
    });
    setListSelected(newListSelected);
    setNoneSelected(false);
    const values = newListSelected.filter((item) => item.active);
    const joinedValues = joinValues(values);
    const selectedCount = values.length;
    onAction({
      list_options: {
        selected: selectedCount > 0,
        selected_count: selectedCount,
        values,
        joined_values: joinedValues,
      },
    });
  };

  const handleNone = () => {
    const newSymptoms = listSelected.map((item) => ({ ...item, active: false }));
    setListSelected(newSymptoms);
    setNoneSelected(true);
    onAction({
      list_options: {
        selected: true,
        selected_count: 0,
        values: [],
        joined_values: '',
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      {args.subtitle && (
        <FormattedText style={styles.subtitle}>{parseForVars(args.subtitle, vars)}</FormattedText>
      )}
      <View style={styles.listContainer}>
        {listSelected?.map((s) => (
          <Select
            checkmark
            key={s.value}
            title={parseForVars(s.text, vars)}
            active={s.active}
            action={() => handleSelect(s)}
          />
        ))}
        <Select
          title={parseForVars(args.list_options.null_option, vars)}
          active={noneSelected}
          action={() => handleNone()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  listContainer: {
    marginTop: 32,
    marginLeft: wp('4%'),
    marginRight: wp('4%'),
  },
});

export default OptionalMultiSelectV1;
