import ChooseGender from './questionnaireSteps/ChooseGender';
import Diseases from './questionnaireSteps/Diseases';
import IntroToQuestions from './questionnaireSteps/IntroToQuestions';
import PatientInfo from './questionnaireSteps/PatientInfo';
import Smoking from './questionnaireSteps/Smoking';
import VisitLocation from './questionnaireSteps/VisitLocation';
import TobaccoProducts from './questionnaireSteps/TobaccoProducts';
import Alcohol from './questionnaireSteps/Alcohol';
import Symptoms from './questionnaireSteps/Symptoms';
import SickAreas from './questionnaireSteps/SickAreas';
import PaymentMethod from './questionnaireSteps/PaymentMethod';
import Insurance from './questionnaireSteps/Insurance';
import TermsConsent from './questionnaireSteps/TermsConsent';
import { isUndefined } from '../../utilis/helpers';
import PregnantOrNursing from './questionnaireSteps/PregnantOrNursing';

const translationsPath = 'screens.telehealth.questions';

const getExtraSteps = (isMale, pregnantOrNursing) =>
  isMale
    ? []
    : [
        {
          component: PregnantOrNursing,
          title: `${translationsPath}.pregnantOrNursingTitle`,
          isDisabled: isUndefined(pregnantOrNursing),
          analytics: 'LCOVID_Virtual_Q1B',
        },
      ];

const telehealthQuestionnaireSteps = ({
  gender,
  symptoms,
  sickAreas,
  diseases,
  isSmoking,
  stateId,
  pregnantOrNursing,
  isConsumingAlcohol,
  isUsingTobaccoProducts,
  termsAndConditionsAccepted,
}) => [
  {
    component: PatientInfo,
    title: 'screens.medicationFlow.userInfo.header',
    isDisabled: false,
    analytics: 'LCOVID_Virtual_Confirm',
    withoutButton: true,
  },
  {
    component: VisitLocation,
    title: `${translationsPath}.visitLocation.title`,
    isDisabled: !stateId,
    analytics: 'LCOVID_Virtual_Location',
  },
  {
    component: IntroToQuestions,
    title: `${translationsPath}.introToQuestions.title`,
    analytics: 'LCOVID_Virtual_IntroQ',
    isDisabled: false,
  },
  {
    component: ChooseGender,
    title: `${translationsPath}.sex.title`,
    analytics: 'LCOVID_Virtual_Q1',
    isDisabled: !gender,
  },
  ...getExtraSteps(gender === 'Male', pregnantOrNursing),
  {
    component: Diseases,
    hasSeveralAnswers: true,
    title: `${translationsPath}.disease.title`,
    isDisabled: !diseases,
    analytics: 'LCOVID_Virtual_Q2',
  },
  {
    component: Smoking,
    title: `${translationsPath}.badHabits.smoking`,
    analytics: 'LCOVID_Virtual_Q3',
    isDisabled: isUndefined(isSmoking),
  },
  {
    component: TobaccoProducts,
    title: `${translationsPath}.badHabits.tobaccoProducts`,
    analytics: 'LCOVID_Virtual_Q4',
    isDisabled: isUndefined(isUsingTobaccoProducts),
  },
  {
    component: Alcohol,
    title: `${translationsPath}.badHabits.alcohol`,
    analytics: 'LCOVID_Virtual_Q5',
    isDisabled: isUndefined(isConsumingAlcohol),
  },
  {
    component: Symptoms,
    hasSeveralAnswers: true,
    title: `${translationsPath}.symptomsTitle`,
    isDisabled: !symptoms,
    analytics: 'LCOVID_Virtual_Q6',
  },
  {
    component: SickAreas,
    hasSeveralAnswers: true,
    title: `${translationsPath}.sickAreasTitle`,
    isDisabled: !sickAreas,
    analytics: 'LCOVID_Virtual_Q7',
  },
  {
    component: PaymentMethod,
    title: `${translationsPath}.paymentMethod.title`,
    analytics: 'LCOVID_Virtual_Payment',
    isDisabled: false,
    withoutButton: true,
  },
  {
    component: Insurance,
    title: 'screens.telehealth.insurance.header',
    analytics: 'LCOVID_Virtual_Insurance',
    isDisabled: false,
    withoutButton: true,
  },
  {
    component: TermsConsent,
    title: 'screens.telehealth.termsAndConditions.title',
    analytics: 'LCOVID_Virtual_Terms',
    isDisabled: !termsAndConditionsAccepted,
  },
];

export default telehealthQuestionnaireSteps;
