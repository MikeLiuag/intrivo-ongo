import React, { useState } from 'react';
import { Image, StyleSheet, View, ScrollView, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Select from '../components/buttons/select';
import FormattedText from '../components/formattedText';
import parseForVars from '../utils/parser';

const FormSingleSelectorV1 = ({ args, vars, onAction = () => null }) => {
  const [selected, setSelected] = useState('');

  const handleSelection = async (s) => {
    setSelected(s.value);
    onAction({
      result: {
        selected: !!s.value,
        value: s.value,
      },
    });
  };

  return (
    <ScrollView style={styles.scroll}>
      {args.subtitle ? (
        <FormattedText style={styles.subtitle}>{parseForVars(args.subtitle, vars)}</FormattedText>
      ) : null}

      {args.image && <Image source={{ uri: args.image }} style={styles.image} key={args.image} />}
      <View style={styles.selectContainer}>
        <FormattedText style={styles.description}>
          {parseForVars(args.description, vars)}
        </FormattedText>
        {args.result.map((item) => (
          <Select
            title={parseForVars(item.text, vars)}
            active={selected === item.value}
            action={() => handleSelection(item)}
            system
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 25,
    paddingHorizontal: 24,
    marginTop: 30,
    marginBottom: 10,
  },

  redText: {
    fontFamily: 'Museo_700',
    color: '#B00020',
  },
  pinkText: {
    fontFamily: 'Museo_700',
    color: '#eb3486',
  },
  blueText: {
    fontFamily: 'Museo_700',
    color: '#03b1fc',
  },
  purpleText: {
    fontFamily: 'Museo_700',
    color: '#800080',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontFamily: 'Museo_500',
    textAlign: 'center',
  },
  image: {
    width: wp('100%'),
    height: wp('70%'),
    resizeMode: 'stretch',
    marginVertical: 15,
  },
  description: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    lineHeight: 24,
    marginTop: Platform.isPad ? 100 : 12,
    marginLeft: wp('2%'),
    color: '#666666',
  },
  selectContainer: {
    paddingHorizontal: wp('4%'),
  },
  scroll: {
    flex: 1,
  },
});

export default FormSingleSelectorV1;
