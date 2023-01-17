import AppointmentLocation from './AppointmentLocation';
import Scheduling from './Scheduling';
import ContactInfo from './ContactInfo';
import SoreThroat from './SoreThroat';
import CodeCheck from './CodeCheck';
import PaymentInfo from './PaymentInfo';
import TermsConsent from './TermsConsent';
import Review from './Review';
import Gender from './Gender';

const translationsPath = 'screens.sniffles.questions';

const getPaymentInfoStep = (hasCouponCode) => {
  if (!hasCouponCode) return [];

  return [
    {
      component: CodeCheck,
      withoutButton: true,
      title: `screens.medicationFlow.question9.title`,
      subtitle: `screens.medicationFlow.question9.subtitle`,
      isNext: true,
      analyticsName: 'Code',
    },
    {
      component: PaymentInfo,
      title: `${translationsPath}.payment.title`,
      analyticsName: 'Payment',
      withoutButton: true,
    },
  ];
};

const questionnaireSteps = ({
  hasCouponCode,
  contactInfo: { phoneNumber, email },
  soreThroat,
  skipCode = true,
  sexAtBirth,
}) => [
  {
    component: AppointmentLocation,
    title: `${translationsPath}.location.title`,
    isDisabled: false,
    analyticsName: 'Address',
  },
  {
    component: Scheduling,
    title: 'Select date and time',
    isDisabled: false,
    analyticsName: 'Slot',
  },
  {
    component: Gender,
    title: 'What was your sex at birth?',
    isDisabled: sexAtBirth === null,
    analyticsName: 'Sex',
  },
  {
    component: SoreThroat,
    title: `${translationsPath}.throatSymptoms.title`,
    isDisabled: soreThroat === null,
    analyticsName: 'SoreThroat',
  },
  {
    component: ContactInfo,
    title: `${translationsPath}.contactInfo.title`,
    subtitle: `${translationsPath}.contactInfo.subtitle`,
    isDisabled: !phoneNumber && !email,
    analyticsName: 'Contact',
  },
  {
    component: Review,
    analyticsName: 'Review',
  },
  {
    component: TermsConsent,
    title: 'Almost done - please accept the terms and conditions ',
    skip: !hasCouponCode && skipCode,
    analyticsName: 'TermsConsent',
  },
  ...getPaymentInfoStep(!hasCouponCode),
];

export default questionnaireSteps;
