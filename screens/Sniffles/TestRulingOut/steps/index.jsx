import ConfirmTestResult from './ConfirmTestResult';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';

const translationsPath = 'screens.sniffles.testRulingOut.questions';

const questionnaireSteps = ({
  hadCovidTest,
  covidTestResult,
  next,
  skipSecond,
  positiveResults,
  isTestedPositive,
}) => [
  {
    showBack: false,
    withButton: true,
    isDisabled: !hadCovidTest,
    component: Question1,
    skip: skipSecond,
    title: `${translationsPath}.question1.title`,
    analyticName: 'Q1',
  },
  {
    withButton: true,
    isDisabled: !covidTestResult,
    component: Question2,
    title: `${translationsPath}.question2.title`,
    analyticName: 'Q2',
  },
  positiveResults.length && isTestedPositive
    ? {
        component: ConfirmTestResult,
        title: `${translationsPath}.question4.title`,
        analyticName: 'Q3A',
      }
    : {
        withButton: true,
        isDisabled: !next,
        component: Question3,
        title: `${translationsPath}.question3.title`,
        analyticName: 'Q4',
      },
];

export default questionnaireSteps;
