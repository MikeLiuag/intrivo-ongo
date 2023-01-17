import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AgreementCheck from '../../components/AgreementCheck';
import { dimensions } from './styles';
import { getDifferenceInYears } from '../../utilis/dateTime';

export default function TermsConsent({ onChangeState, termsConsent, userInfo }) {
  const { t } = useTranslation();

  const {
    app: { paxlovidTerms },
  } = useSelector((state) => state);

  const age = userInfo.dob && getDifferenceInYears(userInfo.dob);
  const postScrollText = age >= 18 ? t('warning.CheckBoxText') : t('warning.CheckBoxTextMinor');

  const onTermsPress = (checked) => {
    onChangeState(checked, 'termsConsent');
  };

  return (
    <View style={{ flex: 1, marginBottom: 20 }}>
      <AgreementCheck
        agreementText={paxlovidTerms}
        style={styles.content}
        preScrollText={t('warning.Scroll')}
        postScrollText={postScrollText}
        isChecked={termsConsent}
        onChecked={(checked) => onTermsPress(checked)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: dimensions.pageMarginHorizontal,
  },
  bottomButton: {
    marginBottom: 20,
    marginHorizontal: 24,
  },
});

const terms = `<b>One last step - please accept the terms and conditions to finalize your eligibility request.</b>

By acknowledging my consent below, I understand and agree to the following:

 • I understand that Telehealth is a mode of delivering health care services via communication technologies (e.g., internet or cellphone) to facilitate diagnosis, consultation, treatment, education, care management, and self-management of a patient’s health care.

 • I understand that Intrivo and affiliate Openloop Healthcare Partners, PC offer Telehealth consultations, which are conducted through videoconferencing, telephonic, and asynchronous technology and my Telehealth provider will not be present in the room with me.

 • I understand there are potential risks to the use of Telehealth technology, including but not limited to, interruptions, delays, unauthorized access, and or other technical difficulties.  I understand that either my Telehealth provider or I can discontinue the Telehealth appointment if the technical connections are not adequate for my visit.

 • I understand that I could seek an in-office visit rather than obtain care from a Telehealth provider, and I am choosing to participate in a Telehealth consultation with Intrivo, an affiliate of Openloop Healthcare Partners, PC provider.

 • To protect the confidentiality of my health information, I agree to undertake my Telehealth consultation in a private location, and I understand that my Telehealth provider will similarly be in a private location.

 • I understand that I am responsible for payment of any amounts due and owing resulting from my Telehealth visit.

 • In an emergent situation, I understand that the responsibility of my Telehealth provider may be to direct me to emergency medical services, such as an emergency room.


By acknowledging below, I certify:

• That I have read this form and/or had it explained to me

• That I understand the risks and benefits of a Telehealth appointment

• That I have been given the opportunity to ask questions and that such questions have been answered to my satisfaction.


AUTHORIZATION TO BILL INSURANCE AND ASSIGNMENT OF BENEFITS
The above information is true to the best of my knowledge. I authorize OpenLoop Healthcare Partners to directly bill my insurance company and I further authorize any third-party payer through which I have benefits to make payment directly to OpenLoop Healthcare Partners. I understand that I am financially responsible for any balance. I also authorize OpenLoop Healthcare Partners or insurance company to use and disclose of any healthcare information for the purpose of obtaining payment for services and
determining insurance benefits. Services provided by outside companies (i.e. lab, pathology, radiology) are billed separately by those companies.

CONSENT TO TEXT OR EMAIL USAGE FOR APPOINTMENT REMINDERS AND OTHER HEALTHCARE REMINDERS
By signing below, I consent to receive text messages from the practice at my phone number or email to receive appointment reminders and general health reminders of information. I understand that this request is to receive emails and/or text messages will apply to all future appointment reminders/feedback/health information unless I request a change in writing. I also acknowledge this means of communication is not considered secure for the transmission of private information.
`;
