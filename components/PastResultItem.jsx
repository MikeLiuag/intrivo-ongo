import React from 'react';
import { useSelector } from 'react-redux';
import { Appointment, Questionnaire, Observation } from './TimeLine';

const PastResultItem = ({ data } = {}) => {
  const { users, usersLookup } = useSelector((state) => state.user);

  const isObservation = data?.name.includes('Antigen Self-Test');
  const isSniffle = data?.name?.includes('Sniffle');
  const isQuestionQuiz = data?.name === 'COVID-19 questionnaire';

  return (
    <>
      {isSniffle && <Appointment data={data} />}
      {isQuestionQuiz && <Questionnaire data={data} />}
      {isObservation && <Observation data={data} users={users} usersLookup={usersLookup} />}
    </>
  );
};

export default PastResultItem;
