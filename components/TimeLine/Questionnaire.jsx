import React from 'react';
import { Container, TestInfo } from './styles';

export default function Questionnaire({ data, onPress }) {
  const { date, result, name } = data;

  const onQuizResultClicked = () => {
    onPress(data);
  };

  return (
    <Container handlePress={onQuizResultClicked}>
      <TestInfo name={name} result={result} date={date} showVirus={false} showResult={false} />
    </Container>
  );
}
