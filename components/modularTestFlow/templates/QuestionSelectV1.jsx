import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Select from '../components/buttons/select';
import { colors } from '../../../theme';
import { openLink } from '../../../utilis/link';
import SelectorComponent from '../../SelectorComponent';
import Insight from '../../Insight';

const MARGIN_HORZ = 24;

const QuestionSelectV1 = ({ args, vars, onAction, multi }) => {
  const [answers, setAnswers] = useState(args.answers.options);
  const [noneSelected, setNone] = useState(false);
  const navigation = useNavigation();

  const isInsightVisible = answers.filter((item) => item.selected).length !== 0 && args.insight;

  // cleaning
  useEffect(() => {
    setAnswers(args.answers.options);
    setNone(false);
  }, [args]);
  const handleSelect = (s) => {
    if (noneSelected) setNone(false);

    const array = multi ? answers : args.answers.options;
    const newAnswers = array.map((item) => {
      if (item.key === s.key) {
        return { ...item, selected: !s.selected };
      }
      return item;
    });
    if (s?.selected && args.insight && !multi) {
      setAnswers(args.answers.options);
    } else if (args.insight && !multi) {
      setAnswers([
        {
          ...s,
          selected: true,
        },
      ]);
    } else {
      setAnswers(newAnswers);
    }
    const selectedAnswers = newAnswers.filter((item) => item.selected);
    if (multi) {
      onAction({
        selected: selectedAnswers.length > 0,
        answers: selectedAnswers,
        key: args.key,
      });
    } else {
      onAction({
        selected: selectedAnswers.length > 0,
        answer: selectedAnswers[0],
        key: args.key,
      });
    }
  };
  const handleNone = (item) => {
    setAnswers(args.answers.options);
    setNone(true);
    if (multi) {
      onAction({
        selected: true,
        answers: item,
        key: args.key,
      });
    } else {
      onAction({
        selected: true,
        answer: item,
        key: args.key,
      });
    }
  };
  const renderItem = ({ item }) => {
    if (item.subtype !== 'null_option') {
      if (args.type === 'test_result') {
        return (
          <View
            style={[
              styles.borderStyle,
              {
                borderColor: item.selected ? colors.primaryBlue : colors.greyExtraLight,
              },
            ]}
          >
            <SelectorComponent
              type='inAll'
              arrow={false}
              data={[
                {
                  title: item.text,
                  description: item.subtitle,
                  onClick: () => handleSelect(item),
                  profileColor: item.icon_color,
                  isProfileCircle: true,
                  icon: <Text style={styles.iconText}>{item.icon}</Text>,
                },
              ]}
            />
          </View>
        );
      }
      if (args.box_type) {
        return (
          <Select
            key={item.key}
            title={item.text}
            subTitle={item?.subtitle}
            active={item.selected}
            checkmark={multi}
            boxContainer
            action={() => handleSelect(item)}
          />
        );
      }
      return (
        <Select
          key={item.key}
          title={item.text}
          subTitle={item?.subtitle}
          active={item.selected}
          checkmark={multi}
          action={() => handleSelect(item)}
        />
      );
    }
    // null option
    return <Select title={item.text} active={noneSelected} action={() => handleNone(item)} />;
  };
  const onLinkPress = (url) => {
    openLink(navigation, false, { url, useWebView: true });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.subtitle, { textAlign: args.question ? 'left' : 'center' }]}>
        {args?.subtitle}
      </Text>
      {args.question && <Text style={styles.question}>{args.question}</Text>}
      {args.additional_information && (
        <Text style={styles.additional}>{args.additional_information}</Text>
      )}
      <View style={styles.symptomsContainer}>
        {args.box_type ? (
          <FlatList
            key='-'
            style={{ flex: 1 }}
            data={answers}
            keyExtractor={(item) => item.key}
            numColumns={2}
            renderItem={renderItem}
            ListFooterComponent={isInsightVisible && multi && <View style={{ height: 150 }} />}
          />
        ) : (
          <FlatList
            key='+'
            data={answers}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
            ListFooterComponent={isInsightVisible && multi && <View style={{ height: 150 }} />}
          />
        )}
      </View>
      <Insight
        insight={args.insight}
        additionalContainerStyle={{
          left: MARGIN_HORZ,
          bottom: -120,
        }}
        onLinkPress={onLinkPress}
        visible={isInsightVisible}
      />
    </View>
  );
};

export default QuestionSelectV1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  subtitle: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  question: {
    fontFamily: 'Museo_700',
    fontSize: 24,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  additional: {
    paddingHorizontal: 24,
    fontFamily: 'Museo_300',
    fontSize: 14,
    lineHeight: 19,
    color: colors.greyDark2,
    marginTop: 6,
  },
  symptomsContainer: {
    flex: 1,
    marginTop: 32,
    marginLeft: wp('4%'),
    marginRight: wp('4%'),
  },
  iconText: {
    fontFamily: 'Museo_700',
    fontSize: 20,
    lineHeight: 28,
    color: '#fff',
  },
  borderStyle: {
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 16,
  },
});
