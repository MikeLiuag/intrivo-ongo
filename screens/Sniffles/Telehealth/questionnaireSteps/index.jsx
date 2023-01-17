import TermsConsent from '../../questionnaireSteps/TermsConsent';
import IntroToQuestions from './IntroToQuestions';
import PaymentInfo from './PaymentInfo';
import Pharmacy from './Pharmacy';
import Question1 from './Question1';
import Question2 from './Question2';
import Symptoms from './Symptoms';
import RiskFactors from './RiskFactors';
import SelectState from './SelectState';
import UserInfo from './UserInfo';
import Diagnosis from './Diagnosis';
import Question3 from './Question3';
import Question7 from './Question7';
import Question8 from './Question8';
import Question9 from './Question9';
import HealthProblems from './HealthProblems';
import InUseMedicationSelect from '../../../Medication/InUseMedicationSelect';
import AllergicMedicationSelect from '../../../Medication/AllergicMedicationSelect';
import ReviewDetails from './ReviewDetails';
import CodeCheck from './CodeCheck';

const translationsPath = 'screens.sniffles.snifflesTelehealth.questions';

const questionnaireSteps = ({
  userInfo,
  sexAtBirth,
  isMedications,
  isAllergic,
  isSmoke,
  isTobacco,
  isAlcohol,
  symptoms,
  riskFactors,
  healthProblems,
  diagnosis,
  skipCode = true,
  isRedeemed,
}) => [
  {
    isDisabled: false,
    component: UserInfo,
    title: `${translationsPath}.userInfo.title`,
    analyticName: 'Patient',
  },
  {
    withButton: true,
    isDisabled: !userInfo.state_id,
    component: SelectState,
    title: `${translationsPath}.location.title`,
    analyticName: 'Location',
  },
  {
    withButton: true,
    isDisabled: false,
    component: IntroToQuestions,
    analyticName: 'QIntro',
  },
  {
    withButton: true,
    isDisabled: !sexAtBirth,
    component: Question1,
    title: `${translationsPath}.question1.title`,
    analyticName: 'Q1',
  },
  {
    withButton: true,
    isDisabled: riskFactors === null || riskFactors === undefined || riskFactors?.length === 0,
    component: RiskFactors,
    title: `${translationsPath}.riskfactors.title`,
    subtitle: `${translationsPath}.riskfactors.subtitle`,
    analyticName: 'Q2',
  },
  {
    withButton: true,
    isDisabled:
      !symptoms.data ||
      symptoms?.data?.length === 0 ||
      (symptoms?.data?.length > 0 && !symptoms.startDate && !symptoms?.data[0]?.none),
    component: Symptoms,
    title: `${translationsPath}.symptoms.title`,
    subtitle: `${translationsPath}.symptoms.subtitle`,
    analyticName: 'Q3',
  },
  {
    withButton: true,
    component: Diagnosis,
    isDisabled: diagnosis === null || diagnosis === undefined || diagnosis?.length === 0,
    title: `${translationsPath}.diagnosis.title`,
    subtitle: `${translationsPath}.diagnosis.subtitle`,
    analyticName: 'Q4',
  },
  {
    withButton: true,
    component: Question2,
    isDisabled: isMedications === null,
    title: `${translationsPath}.question2.title`,
    skip: !isMedications,
    analyticName: 'Q5',
  },
  {
    component: InUseMedicationSelect,
    addStyle: { paddingHorizontal: 0 },
    isDisabled: true,
    withoutButton: true,
    name: 'InUseMedicationsCheck',
    title: `${translationsPath}.medical.title`,
    analyticName: 'Q5B',
  },
  {
    withButton: true,
    component: Question3,
    isDisabled: isAllergic === null,
    title: `${translationsPath}.question3.title`,
    skip: !isAllergic,
    analyticName: 'Q6',
  },
  {
    component: AllergicMedicationSelect,
    addStyle: { paddingHorizontal: 0 },
    isDisabled: true,
    withoutButton: true,
    name: 'InUseMedicationsCheck',
    title: `${translationsPath}.allergic.title`,
    analyticName: 'Q6B',
  },
  {
    withButton: true,
    component: Question7,
    isDisabled: isSmoke === null,
    title: `${translationsPath}.question7.title`,
    analyticName: 'Q7',
  },
  {
    withButton: true,
    component: Question8,
    isDisabled: isTobacco === null,
    title: `${translationsPath}.question8.title`,
    analyticName: 'Q8',
  },
  {
    withButton: true,
    component: Question9,
    isDisabled: isAlcohol === null,
    title: `${translationsPath}.question9.title`,
    analyticName: 'Q9',
  },
  {
    withButton: true,
    isDisabled:
      healthProblems === null || healthProblems === undefined || healthProblems?.length === 0,
    component: HealthProblems,
    title: `${translationsPath}.healthproblems.title`,
    subtitle: `${translationsPath}.healthproblems.subtitle`,
    analyticName: 'Q10',
  },
  {
    component: Pharmacy,
    title: `${translationsPath}.pharmacy.title`,
    subtitle: `${translationsPath}.pharmacy.description`,
    analyticName: 'Pharma',
  },
  {
    analyticName: 'Review',
    component: ReviewDetails,
    title: `${translationsPath}.review.title`,
  },
  {
    component: TermsConsent,
    title: `${translationsPath}.terms.title`,
    analyticName: 'TnC',
    skip: skipCode && !isRedeemed,
  },
  {
    component: CodeCheck,
    withoutButton: true,
    name: 'MedicationCodeVerify',
    title: `screens.medicationFlow.question9.title`,
    subtitle: `screens.medicationFlow.question9.subtitle`,
    analyticName: 'Code',
    isNext: true,
  },
  {
    isDisabled: false,
    title: `${translationsPath}.payment.title`,
    component: PaymentInfo,
    analyticName: 'Payment',
  },
];

export default questionnaireSteps;
