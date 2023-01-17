const SINGLE_OPTION = 'single_option';
const ANY_OPTION = 'any_option';
const ONE_OF_OPTION = 'one_of_option';
const NONE_OPTION = 'none_option';

const COMBINATION_OF_RESULTS = [
  {
    outcome: 'UC1',
    answers: {
      question1: {
        type: SINGLE_OPTION,
        payload: 0,
      },
      question4: {
        type: ANY_OPTION,
      },
      question5: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question6: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question7: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question8: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question9: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question10: {
        type: NONE_OPTION,
      },
    },
  },
  {
    outcome: 'UC2',
    answers: {
      question1: {
        type: SINGLE_OPTION,
        payload: 0,
      },
      question4: {
        type: NONE_OPTION,
      },
      question7: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question8: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question9: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question10: {
        type: NONE_OPTION,
      },
    },
  },
  {
    outcome: 'UC3',
    answers: {
      question1: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question3: {
        type: ONE_OF_OPTION,
        payload: [0, 1, 2],
      },
      question4: {
        type: ANY_OPTION,
      },
      question5: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question6: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question7: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question8: {
        type: SINGLE_OPTION,
        payload: 0,
      },
      question9: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question10: {
        type: NONE_OPTION,
      },
    },
  },
  {
    outcome: 'UC4',
    answers: {
      question1: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question3: {
        type: ONE_OF_OPTION,
        payload: [0, 1, 2],
      },
      question4: {
        type: NONE_OPTION,
      },
      question7: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question8: {
        type: SINGLE_OPTION,
        payload: 0,
      },
      question9: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question10: {
        type: NONE_OPTION,
      },
    },
  },
  {
    outcome: 'UC5',
    answers: {
      question1: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question3: {
        type: ONE_OF_OPTION,
        payload: [0, 1, 2],
      },
      question4: {
        type: ANY_OPTION,
      },
      question5: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question6: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question7: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question8: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question10: {
        type: NONE_OPTION,
      },
    },
  },
  {
    outcome: 'UC6',
    answers: {
      question1: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question3: {
        type: SINGLE_OPTION,
        payload: 3,
      },
      question4: {
        type: NONE_OPTION,
      },
      question7: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question8: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question10: {
        type: NONE_OPTION,
      },
    },
  },
  {
    outcome: 'UC7',
    answers: {
      question1: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question3: {
        type: SINGLE_OPTION,
        payload: 3,
      },
      question4: {
        type: ANY_OPTION,
      },
      question5: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question6: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question7: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question8: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question10: {
        type: NONE_OPTION,
      },
    },
  },
  {
    outcome: 'UC8',
    answers: {
      question1: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question3: {
        type: ANY_OPTION,
      },
      question4: {
        type: ANY_OPTION,
      },
      question5: {
        type: SINGLE_OPTION,
        payload: 0,
      },
      question6: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question7: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question8: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question10: {
        type: NONE_OPTION,
      },
    },
  },
  {
    outcome: 'UC9',
    answers: {
      question1: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question3: {
        type: ANY_OPTION,
      },
      question4: {
        type: ANY_OPTION,
      },
      question5: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question6: {
        type: SINGLE_OPTION,
        payload: 2,
      },
      question7: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question8: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question10: {
        type: NONE_OPTION,
      },
    },
  },
  {
    outcome: 'UC10',
    answers: {
      question1: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question3: {
        type: ANY_OPTION,
      },
      question4: {
        type: ANY_OPTION,
      },
      question5: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question6: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question7: {
        type: SINGLE_OPTION,
        payload: 0,
      },
      question8: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question10: {
        type: NONE_OPTION,
      },
    },
  },
  {
    outcome: 'UC11',
    answers: {
      question1: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question3: {
        type: ANY_OPTION,
      },
      question4: {
        type: ANY_OPTION,
      },
      question5: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question6: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question7: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question8: {
        type: SINGLE_OPTION,
        payload: 2,
      },
      question10: {
        type: NONE_OPTION,
      },
    },
  },
  {
    outcome: 'UC12',
    answers: {
      question1: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question3: {
        type: ANY_OPTION,
      },
      question4: {
        type: ANY_OPTION,
      },
      question5: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question6: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question7: {
        type: SINGLE_OPTION,
        payload: 1,
      },
      question8: {
        type: ONE_OF_OPTION,
        payload: [0, 1],
      },
      question10: {
        type: ANY_OPTION,
      },
    },
  },
];

export { COMBINATION_OF_RESULTS, SINGLE_OPTION, ANY_OPTION, ONE_OF_OPTION, NONE_OPTION };
