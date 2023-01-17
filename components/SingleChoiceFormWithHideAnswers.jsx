import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Select from './modularTestFlow/components/buttons/select';

const SingleChoiceFormWithHideAnswers = ({ choosedOption, options, onSelectOption }) => (
  <FlatList
    data={options}
    style={{ flex: 1 }}
    renderItem={({ item }) =>
      choosedOption === null || item.title === choosedOption ? (
        <Select
          title={item.title}
          active={item.title === choosedOption}
          containerStyle={styles.container}
          action={() => onSelectOption(item.title)}
          icon={item.icon}
          disableLeftBackground
        />
      ) : null
    }
  />
);

export default SingleChoiceFormWithHideAnswers;

const styles = StyleSheet.create({
  container: {
    margin: 0,
    marginVertical: 8,
    width: '100%',
  },
});
