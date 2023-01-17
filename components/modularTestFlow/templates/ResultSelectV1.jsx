import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { colors } from '../../../theme';
import SelectorComponent from '../../SelectorComponent';
import { BlueButton } from '../../Buttons/BlueButton';
import Header from '../components/header';

const ResultSelectV1 = ({ props, onAction = () => null, handleClose }) => {
  const [answers, setAnswers] = useState(props.answers.options);

  const { answers: reduxAnswers } = useSelector((state) => state.modularTestFlow);
  const { uploadTestTypeAndUuid } = useSelector((state) => state.modularTestFlow);
  const { observationTypes } = useSelector((state) => state.app);
  const { uuid: observationId } = observationTypes['covid-19-rapid-antigen-test'];

  // cleaning
  useEffect(() => {
    setAnswers(props.answers.options);
  }, [props]);

  const handleSelect = (s) => {
    const newAnswers = props.answers.options.map((item) => {
      if (item.key === s.key) {
        return { ...item, selected: !item.selected };
      }
      return item;
    });
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const reduxData = [];
    reduxAnswers.forEach((item) => reduxData.push(item));
    answers.forEach((item) => {
      if (item.selected) {
        reduxData.push(item);
      }
    });
    const data = {
      answers: reduxData,
      uploadTestTypeAndUuid,
      observationId,
    };
    onAction({
      resultTemplate: props.submit_result,
      data,
      skipNavigation: true,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Header title={props.title} hideBackButton enableBackButton onExit={handleClose} />
      <Text style={[styles.subtitle, { textAlign: props.question ? 'left' : 'center' }]}>
        {props.subtitle}
      </Text>
      {props.question && <Text style={styles.question}>{props.question}</Text>}
      <View style={styles.symptomsContainer}>
        {answers?.map((s) => (
          <View
            style={[
              styles.borderStyle,
              {
                borderColor: s.selected ? colors.primaryBlue : colors.greyExtraLight,
              },
            ]}
          >
            <SelectorComponent
              type='inAll'
              arrow={false}
              data={[
                {
                  title: s.text,
                  description: s.subtitle,
                  onClick: () => handleSelect(s),
                  profileColor: s.icon_color,
                  isProfileCircle: true,
                  icon: <Text style={styles.iconText}>{s.icon}</Text>,
                },
              ]}
            />
          </View>
        ))}
      </View>
      <BlueButton
        style={styles.nextButton}
        title='Submit'
        nextEnabled={answers.filter((item) => item.selected)}
        action={handleSubmit}
      />
    </ScrollView>
  );
};

export default ResultSelectV1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: wp('4%'),
  },
  subtitle: {
    fontFamily: 'Museo_300',
    fontSize: 16,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  question: {
    fontFamily: 'Museo_500',
    fontSize: 18,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 30,
  },
  symptomsContainer: {
    flex: 1,
    marginTop: 32,
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
