import MedicationFormIdentify from './MedicationFormIdentify';
import MedicationUserInfo from './MedicationUserInfo';
import MedicationSymptomsCheck from './MedicationSymptomsCheck';
import MedicationExposedDiagnosis from './MedicationExposedDiagnosis';
import MedicationUseStatus from './MedicationUseStatus';
import InUseMedicationSelect from './InUseMedicationSelect';
import MedicationAllergyStatus from './MedicationAllergyStatus';
import AllergicMedicationSelect from './AllergicMedicationSelect';
import MedicationRespiratoryStatus from './MedicationRespiratoryStatus';
import PharmacySelection from './PharmacySelection';
import MedicationCodeVerify from './MedicationCodeVerify';
import MedicationStripePayment from './MedicationStripePayment';
import TermsConsent from './TermsConsent';
import MedicationGenderSelect from './MedicationGenderSelect';
import MedicationReview from './MedicationReview';
import ApplyConditionsCheck from './ApplyConditionsCheck';
import SeriousSymptomsCheck from './SeriousSymptomsCheck';

const translationPath = 'screens.medicationFlow';

const INTRO_BULLETS = [`${translationPath}.intro.bullets.1`];

const getFirstStep = (showFirstQuestion, existFluStrepIn14) =>
  showFirstQuestion && !existFluStrepIn14
    ? [
        {
          component: SeriousSymptomsCheck,
          withoutButton: true,
          name: 'SeriousSymptomsCheck',
          title: `${translationPath}.preSymptoms.title`,
          analyticName: 'ElimOne',
        },
      ]
    : [];

const getMedicationExposedDiagnosis = (existFluStrepIn14, exposedDiagnosis) =>
  !existFluStrepIn14
    ? [
        {
          component: MedicationExposedDiagnosis,
          isDisabled: exposedDiagnosis === null || exposedDiagnosis?.length === 0,
          withoutButton: false,
          name: 'MedicationExposedDiagnosis',
          title: `${translationPath}.exposedDiagnosis.title`,
          subtitle: `${translationPath}.typical.question.subtitle`,
          analyticName: 'Q3',
        },
      ]
    : [];

export const medicationQuestionnaireSteps = ({
  sexAtBirth,
  exposedDiagnosis,
  isHospitalized,
  selectedPharmacy,
  termsConsent,
  promoCode,
  showFirstQuestion,
  existFluStrepIn14,
}) => [
  ...getFirstStep(showFirstQuestion, existFluStrepIn14),
  {
    component: ApplyConditionsCheck,
    withoutButton: true,
    name: 'ApplyConditionsCheck',
    title: `${translationPath}.applyConditions.title`,
    analyticName: 'ElimTwo',
  },
  {
    component: MedicationUserInfo,
    withoutButton: true,
    name: 'MedicationUserInfo',
    analyticName: 'Patient',
  },
  {
    component: MedicationFormIdentify,
    withoutButton: true,
    name: 'MedicationFormIdentify',
    analyticName: 'IDConf',
  },
  {
    component: MedicationGenderSelect,
    isDisabled: !sexAtBirth,
    withoutButton: false,
    name: 'MedicationGenderSelect',
    title: `${translationPath}.genderSelect.title`,
    analyticName: 'Q1',
  },
  {
    component: MedicationSymptomsCheck,
    withoutButton: true,
    name: 'MedicationSymptomsCheck',
    title: `${translationPath}.question1.title`,
    subtitle: `${translationPath}.typical.question.subtitle`,
    analyticName: 'Q2',
  },
  ...getMedicationExposedDiagnosis(existFluStrepIn14, exposedDiagnosis),
  {
    component: MedicationUseStatus,
    isDisabled: true,
    withoutButton: true,
    name: 'MedicationUseStatus',
    title: `${translationPath}.medicationInUse.title`,
    analyticName: 'Q4',
  },
  {
    component: InUseMedicationSelect,
    isDisabled: true,
    withoutButton: true,
    name: 'InUseMedicationsCheck',
    title: `${translationPath}.InUseMedicationSelect.title`,
    analyticName: 'Q4B',
  },
  {
    component: MedicationAllergyStatus,
    isDisabled: true,
    withoutButton: true,
    name: 'MedicationAllergyStatus',
    title: `${translationPath}.allergyStatus.title`,
    analyticName: 'Q5',
  },
  {
    component: AllergicMedicationSelect,
    isDisabled: true,
    withoutButton: true,
    name: 'AllergicMedicationSelect',
    title: `${translationPath}.allergicMedications.title`,
    analyticName: 'Q5B',
  },
  {
    component: MedicationRespiratoryStatus,
    isDisabled: !isHospitalized,
    withoutButton: false,
    name: 'MedicationRespiratoryStatus',
    title: `${translationPath}.question5.title`,
    analyticName: 'Q6',
  },
  {
    component: PharmacySelection,
    isDisabled: !(selectedPharmacy && Object.keys(selectedPharmacy).length > 0),
    withoutButton: false,
    name: 'PharmacySelection',
    title: 'paxlovid.eligibility.pharmacySelection.title',
    subtitle: 'paxlovid.eligibility.pharmacySelection.subtitle',
    analyticName: 'Pharma',
  },
  {
    component: MedicationReview,
    isDisabled: false,
    withoutButton: true,
    name: 'MedicationReview',
    title: `${translationPath}.review.title`,
    buttonTitle: `${translationPath}.review.button`,
    analyticName: 'Review',
  },
  {
    component: TermsConsent,
    isDisabled: !termsConsent,
    withoutButton: false,
    name: 'TermsConsent',
    title: `${translationPath}.termsAndConditions.title`,
    analyticName: 'TnC',
  },
  {
    component: MedicationCodeVerify,
    isDisabled: !promoCode,
    withoutButton: true,
    name: 'MedicationCodeVerify',
    title: `${translationPath}.question9.title`,
    subtitle: `${translationPath}.question9.subtitle`,
    analyticName: 'EnterCode',
  },
  {
    component: MedicationStripePayment,
    title: `${translationPath}.payment.title`,
    isDisabled: true,
    withoutButton: true,
    name: 'MedicationStripePayment',
    analyticName: 'Payment',
  },
];

export { INTRO_BULLETS };
export default { medicationQuestionnaireSteps };
