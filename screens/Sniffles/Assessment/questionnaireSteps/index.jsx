import Fever from './Fever';
import SoreThroat from './SoreThroat';
import Symptoms from './Symptoms';
import TestedCovid from './TestedCovid';
import HowToHelp from './HowToHelp';
import IntroQuestion from './IntroQuestion';
import TemperatureQuestion from './TemperatureQuestion';

const translationPath = 'screens.sniffles.assessmentQuestion';
const getThermometerStep = (isEnteringTemperature) =>
  isEnteringTemperature
    ? [
        {
          isDisable: false,
          component: TemperatureQuestion,
          analyticsName: 'Q1_ScanResult',
        },
      ]
    : [];

const questionnaireSteps = ({ isEnteringTemperature, skipLastQuestion, optionB }) => [
  {
    isDisable: false,
    component: IntroQuestion,
    title: `${translationPath}.intro.question`,
    analyticsName: 'Elim',
  },
  {
    isDisable: false,
    component: Fever,
    title: `${translationPath}.question1.question`,
    analyticsName: 'Q1',
  },
  ...getThermometerStep(isEnteringTemperature),
  {
    isDisable: false,
    component: SoreThroat,
    title: `${translationPath}.question2.question`,
    analyticsName: 'Q2',
  },
  {
    isDisable: false,
    component: Symptoms,
    title: `${translationPath}.question3.question`,
    analyticsName: 'Q3',
  },
  ...(skipLastQuestion
    ? [
        {
          isDisable: false,
          component: TestedCovid,
          title: `${translationPath}.question4.question`,
          analyticsName: 'Q4',
        },
      ]
    : []),
  ...(optionB
    ? [
        {
          isDisable: false,
          component: HowToHelp,
          title: `${translationPath}.question5.question`,
          analyticsName: 'MenuB',
        },
      ]
    : []),
];

export default questionnaireSteps;
