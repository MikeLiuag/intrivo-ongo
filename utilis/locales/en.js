const en = {
  translation: {
    rate: {
      popUpTitle: 'Are you liking our app?',
      snifflesTelehealthPopUpTitle: 'Was your Sniffles consultation helpful?',
      snifflesMedicationPopUpTitle: 'Was your experience getting treatment easy to do?',
      paxlovidFeedBackDelivery: 'Was your Medication Delivery request helpful?',
      paxlovidFeedBackMedication: 'Was your Covid Treatment request helpful?',
      popUpThanks: 'Thanks for your input',
      assPopUpTitle: 'Was our assessment helpful?',
      carePopUpTitle: 'Was your consultation helpful?',
      appointmentPopUpTitle: 'Was your Sniffles appointment helpful?',
      buttons: {
        yes: 'Yes',
        notReally: 'Not really',
      },
      feedback: {
        header: 'Your opinion matters to us!',
        title: 'Share your feedback to help us get better.',
        placeholder: 'Enter feedback',
        button: 'Submit',
        thanks: 'Thank you for helping us get better!',
        max: 'Maximum characters: ',
      },
    },
    modals: {
      telehealthCallReady: {
        title: 'A Long COVID specialist is ready to talk',
        description: 'are you ready to get started?',
        buttonTitle: 'Get started',
      },
      temperature: {
        title1: 'Would you like to record your temperature?',
        title2: 'Do you need some help figuring it out?',
        description1: 'You can enter manually or scan the reading.',
        description2:
          'Use a thermometer, manually or scan the reading, and we can explain what it means...',
        skip: 'Skip',
        buttonTitle: 'Let’s do it',
      },
    },
    errors: {
      sniffles: {
        couponUsed: {
          title: 'Coupon code was already used',
          subtitle: 'Please make a new purchase',
        },
        couponInvalid: {
          title: 'Coupon code is not valid',
          subtitle: 'Please review your information',
        },
        slotUnavailable: {
          title: 'Looks like there was an issue scheduling your appointment.',
          subtitle:
            'Please reach out to our customer service team for help scheduling your appointment at {{phone}} (ext. 5)',
          button: 'Got it',
        },
        primaryAgeTooYoung: {
          title: 'Unable to book an appointment',
          subtitle:
            'Account holder must be 18 and above to book an appointment. You can book appointments for minors by adding them as dependents.',
          button: 'Got it',
        },
        dependentAgeTooYoung: {
          title: 'Unable to book an appointment',
          subtitle: 'Appointments can be booked for minors aged 3 and above.',
          button: 'Got it',
        },
        couponNotFound: {
          title: 'Coupon code is not valid',
          subTitle: 'Please review your information',
        },
        couponBeingUsed: {
          title: 'Coupon code was already used',
          subTitle: 'Please make a new purchase',
        },
        couponNotApplicable: {
          title: 'Coupon code not valid for this product',
          subTitle: 'Please review your information',
        },
      },
      login: 'Invalid username or password',
      token: {
        title: "We haven't seen you in a while",
        subtitle: 'Please enter your username and password',
      },
      email: {
        title: 'Email already exists',
        subtitle:
          'Please try a different email address to continue. Otherwise, go back to log in or reset your password',
      },
      phone: {
        title: 'Phone number entry failed',
        subtitle: 'Worth checking the information is correct, and then, trying again',
      },
      regist: {
        title: 'Entry failed',
        subtitle: 'Worth checking the information is correct, and then, trying again',
      },
      verify: {
        title: 'Incorrect code',
        subtitle: "Make sure you've entered the code most recently sent, and try again",
      },
      typical: {
        title: 'Sorry, something went wrong',
        subtitle: 'Please try again',
        subtitleWithMail: 'Please try again.If issue persist, contact us at support@letsongo.com',
        subtitleResend: 'Please select "resend code" to try again',
      },
      joinCode: {
        title: 'Code not recognized',
        subtitle: 'Confirm code entered is correct',
      },
      load: {
        title: 'Unable to load',
        subtitle:
          'Refresh screen to try again. If issue persists, contact us at support@letsongo.com',
      },
      notSaved: {
        title: 'Information not saved',
        subtitle: 'Please try again',
      },
      join: {
        title: 'Unable to join',
        subtitle: 'Please try again. If issue persists, contact us at support@letsongo.com',
      },
      store: {
        browseList: {
          title: 'Unable to load products',
          subtitle: 'Please try again. If issue persists, contact us at support@letsongo.com',
        },
        productInfo: {
          title: 'Unable to load product',
          subtitle: 'Please try again. If issue persists, contact us at support@letsongo.com',
        },
        cart: {
          products: {
            title: 'Unable to load products',
            subtitle: 'Please try again. If issue persists, contact us at support@letsongo.com',
          },
          checkout: {
            title: 'Unable to proceed',
            subtitle: 'Please try again. If issue persists, contact us at support@letsongo.com',
          },
        },
      },
      deliveryRequest: {
        invalidAddress: {
          title: 'Address is not valid',
          subtitle: 'Please review your information',
        },
        noDrivers: {
          title: 'Delivery drivers are not available',
          subtitle: 'Please try again later',
        },
        default: {
          title: 'Unable to schedule delivery',
          subtitle: 'Contact us at 888-965-0301 (ext. 5)',
        },
      },
    },
    tabBar: {
      test: 'COVID-19 Self-Test',
      event: '2Gather Events',
      vaccine: 'Upload vaccine card',
      buy: {
        title: 'Purchase tests',
        subTitle: 'On/Go online shop',
      },
      tooltip: {
        header: 'Your Sniffles care',
        description:
          'If you are prescribed medication, you will find them right here.\n\nCheck back soon!',
      },
    },
    button: {
      continue: 'Continue',
      setPass: 'Set password',
      verify: 'Verify',
      save: 'Save',
    },
    bioType: {
      fingerPrint: 'Fingerprint',
      touch: 'Touch ID',
      face: 'Face ID',
    },
    placeholder: {
      pass: 'Password',
      email: 'Email address',
      zip: 'Enter postal (zip) code',
      firstName: 'First Name',
      lastName: 'Last Name',
      birthday: 'Birthday',
      height: 'Height',
      weight: 'Weight (lb)',
      address1: 'Address 1',
      address2: 'Address 2',
      addredd2Optional: 'Address 2 (optional)',
      city: 'City',
      state: 'State',
      zipCode: 'Postal (zip) code',
      phone: 'Phone',
      phoneNumber: 'Phone number',
      cardNumber: 'Card number',
      expiryDate: 'Expiration date (MM/YY)',
      cvv: 'CVV',
      address: 'Address',
      emailOnly: 'Email',
      zipCodeOnly: 'Zip code',
      saveCheckbox: 'Save address to profile',
      saveHeightCheckbox: 'Save height and weight to profile',
      note: 'Note:',
    },
    userCommon: {
      first: 'First Name',
      middle: 'Middle Name',
      last: 'Last Name',
      height: 'Height',
      weight: 'Weight (lb)',
    },
    templates: {
      timeslots: {
        title: 'Upcoming appointment near {{location}}',
        viewCalendar: 'View full calendar',
        availableTime: 'Available times for selected date',
        timeZone: `(times are displayed in local timezone)`,
        noAvailableTimes:
          'There are currently no available times on this day. Try a different day.',
        contactUs: {
          title: 'Not finding a time that works for you?',
          subtitleFirst: 'Contact us at ',
          subtitleLast: ' for support.',
        },
      },
      timeslotsNoAvailability: {
        title: 'This service is not yet available in your area.',
        description:
          'We are working on adding more availability. For now, we recommend using one of the following.',
      },
      californiaCareOptions: {
        title: 'Here are other options you might be interested in...',
      },
      alternativeTreatment: {
        title: 'Seek alternative treatment',
        description:
          'Unfortunately, the provider evaluation for Flu or Strep prescriptions is not appropriate for you at this time. Consider one of the following options instead.',
      },
      serviceAvailability: {
        title: 'Treatment Evaluation is currenty not available in your area.',
        description:
          'We are working on adding more availability. For now, we recommend using one of the following.',
      },
    },
    screens: {
      notifications: {
        title: 'Notifications',
        newNotifications: '{{count}} new',
        emtyStateText: 'no notifications',
      },
      sniffles: {
        cta: 'Having symptoms? We can help',
        disclaimer: {
          beta: 'BETA',
          title: 'Sorry you feel yucky, but Sniffles can help!',
          description:
            'You’re invited to try the Sniffles quick fix to whatever has you sniffling. Feel better fast and share feedback that will help millions go from blah to yah.',
          buttonTitle: 'Let’s do it',
        },
        existingAppointmentModal: {
          title: 'Unable to schedule new appointment',
          subtitle:
            'Only one appointment at a time per user. After your current appointment, try again.',
          buttonTitle: 'View current appointment details',
        },
        checkLocationAvailability: {
          title: 'Check availability near you',
          subtitle: 'Enter the location of where you’d be testing to check availability.',
          buttonTitle: 'Next',
          successMessage: 'Testing available in your area!',
          warning: {
            title: 'No Strep or RSV testing available in California',
            desc: 'However, good news. California residents do qualify for the Flu test that also checks for COVID.',
            button: 'Got it',
            linkName: 'View fact sheet',
          },
        },
        assessmentQuestion: {
          intro: {
            question: 'Are you experiencing any of these serious symptoms?',
            option1: {
              title: 'Trouble breathing',
              subtitle: 'Difficulty breathing, faster breathing',
            },
            option2: {
              title: 'Have had a seizure',
              subtitle: 'In the last 24 hours',
            },
            option3: {
              title: 'Feeling disoriented or confused',
              subtitle: 'Including mood changes',
            },
            option4: {
              title: 'Can’t keep liquids down',
              subtitle: 'Continuous vomiting',
            },
            option5: {
              title: 'Can’t swallow liquids',
              subtitle: 'Throat is too tight',
            },
            warning: {
              title: 'Seek medical attention',
              subtitle:
                'The symptom(s) you selected are serious symptoms. We recommend you pursue emergency medical attention.',
            },
          },
          question1: {
            question: 'Do you have a fever or feel like you have a fever?',
            description:
              'Use a thermometer (the one in your Sniffles box if you have one) to check your temperature',
            option1: 'Yes',
            option2: 'No',
            option3: 'I’m not sure',
            temperatureButton: {
              title: 'Record my temperature',
              subtitle: 'Enter manually or scan reading',
            },
            temperatureForm: {
              title: 'Your temperature reading',
              scanCTA: 'Scan Sniffles thermometer instead',
              manualEnterCTA: 'Enter reading manually instead',
              label: 'Temperature',
              insight: {
                title: 'Severity matters...',
                text: 'If you are having a fever, this is usually a sign your body is fighting an infection.  Fevers are very common with the flu and can be as high as 103.5.  Strep may also bring a fever, but the fever tends to be lower than that of a flu.  While colds can also bring a fever, they are typically very mild.',
                sourceTitle: 'CDC',
              },
              cancelButton: 'Cancel',
              enterManuallyButton: 'Record manually instead',
              error: {
                message: 'Sorry, we are unable to read your thermometer',
                subtitle: 'Please enter your reading below',
              },
              warning:
                'Call your healthcare provider when temperature is higher than 103 F (39.4 C)',
            },
            note: {
              title: 'Pro tip: ',
              description:
                'Use a thermometer (the one in your Sniffles box if you have one) to check if your temperature is above 100.4F/38C.',
            },
            insight: {
              title: 'Severity matters...',
              text: 'If you are having a fever, this is usually a sign your body is fighting an infection.  Fevers are very common with the flu and can be as high as 103.5.  Strep may also bring a fever, but the fever tends to be lower than that of a flu.  While colds can also bring a fever, they are typically very mild. ',
              sourceTitle: 'CDC',
            },
          },
          question2: {
            question: 'Is a sore throat bothering you at the moment?',
            option1: 'Yes',
            option2: 'No',
            insight: {
              title: 'How to tell them apart...',
              text: 'A sore throat that develops quickly, is painful, makes swallowing difficult, and causes a fever are all common signs of strep throat. This is a bacterial infection. A sore throat with a cough, runny nose, and hoarse voice are all more typical of a virus such as those that cause the common cold.',
              sourceTitle: 'CDC',
            },
          },
          question3: {
            question: 'How long have you been experiencing symptoms?',
            option1: 'Today',
            option2: '1 or 2 days ago',
            option3: '3 to 7 days ago',
            option4: '7+ days ago',
            insight: {
              title: 'Symptoms that keep nagging...',
              text: 'COVID and the common cold can take a few days to develop and symptoms can linger for days.  Strep and flu, on the other hand, often come on suddenly and can last several days.',
              sourceTitle: 'NIH',
            },
          },
          question4: {
            question: 'Have you been tested for COVID-19 in the past couple of days?',
            option1: 'Yes',
            option2: 'No',
            insight: {
              title: 'Timing is important...',
              text: 'At-home COVID tests or antigen tests detect proteins produced by the SARS-CoV-2 virus during an infection.  If used during the early days of the infection, they are likely to give negative results. This is expected, and it is why the recommendation is to test again in 48 hours.',
              sourceTitle: 'FDA',
            },
          },
          question5: {
            question: "Here's how we can help you feel better fast",
            option1: 'I think I know what I have and just need medication',
            option2: 'I have questions and want to talk to a medical expert',
            option3: 'I want to confirm what I have through easy in-home testing',
          },
        },
        solutions: {
          title2: "Here's how we can help you feel better fast",
          title: 'How can we help you feel better fast?',
          tooltip:
            'Discount codes available with a Sniffles box purchase. Discount applied when requesting service.',
          info: 'Discount codes available with a Sniffles box purchase. Discount applied when requesting service.',
          code: 'with code',
          button: 'Reset',
        },
        solutionsOptionB: {
          telehealth: {
            headerTitle: 'Get your questions answered now',
            title: 'Talk to a medical expert virtually',
            description: 'Get your questions answered from a medical expert directly from you app.',
          },
          medication: {
            headerTitle: 'Let us get medication delivered to you fast',
            title: 'Request medication for Flu and Strep',
            description: '5 minutes, 5 questions, get your medication fast.',
          },
          appointment: {
            headerTitle: 'Skip the waiting room, we will come to you',
            title: 'Test for Flu, Strep, or RSV at home',
            description:
              "Skip the doctor's office. Confirm what you have from home so you can get the right treatment.",
          },
          otcMedication: {
            title: 'Get over the counter medication',
          },
          otherOptions: 'Other options...',
          button: 'Reset',
        },
        intro: {
          title: 'In-home testing with medical pro',
          bullet1:
            'Schedule in-home visit from medical provider to conduct nasal swab test for Flu, Strep and RSV. Same day results.',
          bullet2:
            'A member of our Sniffles medical team will come to your home and perform at-home tests',
          bullet3: 'Get test results in minutes!',
          button: 'Get your appointment',
          description: '<b>Skip urgent care, stay home</b> - only $99.99',
          description2: 'Service availability varies by location',
          descriptionLink: 'Check availability',
          availability: 'Sniffles at-home testing, currently available in the following markets:',
          tooltipText: '<b>Have a discount code?</b> You can apply it when requesting service.',
        },
        assessmentInfoVA: {
          title: 'Got the Sniffles?',
          link: 'Skip to Sniffles care options',
          description:
            'Whether you have a cold, the flu, COVID, strep throat or RSV, we can help you feel better fast without leaving home.',
          description2: 'Start here to get testing, diagnosis and treatment.',
          disclaimer: {
            title: '*Disclaimer: ',
            description:
              '<b>*Disclaimer:</b> the questions about upper respiratory illnesses and the information provided in this application are not intended to be considered medical advice, and are intended to be educational only.  If you have questions related to your specific medical situation, you should contact your health care professional.',
          },
          button: 'Get started',
        },
        assessmentInfoVB: {
          title: 'Still feeling symptoms?',
          description:
            'We can get you the care you need. Start here to get further testing, diagnosis and treatment.',
          disclaimer: {
            title: '*Disclaimer: ',
            description:
              '<b>*Disclaimer:</b> the questions about upper respiratory illnesses and the information provided in this application are not intended to be considered medical advice, and are intended to be educational only.  If you have questions related to your specific medical situation, you should contact your health care professional.',
          },
          button: 'Learn how we can help',
        },
        vaccinesLanding: {
          title: 'Get your vaccine today',
          description: `Make sure you're up to date with all your annual vaccines. Schedule an appointment today at your local pharmacy`,
        },
        questions: {
          location: {
            title: 'Enter appointment location',
            subtitle: 'Where will this appointment take place?',
            warningTitle: 'In California we are currently only able to offer Flu testing at home',
            warningDescription: `However, good news. California residents do qualify for the Flu test that also checks for COVID.`,
            warningQuestion: 'Would you still like to continue?',
            warningButtonRight: 'Yes, continue',
            warningButtonLeft: 'See more opitons',
            linkName: 'View fact sheet',
          },
          throatSymptoms: {
            title: 'Are you currently experiencing a sore throat?',
          },
          gender: {
            title: 'What was your sex at birth?',
            option1: 'Female',
            option2: 'Male',
          },
          contactInfo: {
            title: 'Confirm contact information',
            subtitle: 'Where we will contact you about your appointment.',
          },
          payment: {
            info: 'In-home testing appointment',
            provideEvaluation: 'Provider evaluation',
            codeButton: 'Have a Sniffles code?',
            buttonTitle: 'Submit',
            title: 'Go from blah to yah, fast!',
          },
        },
        review: {
          headerTitle: 'Review your information',
          title: 'Did we get it all correct?',
          section1: {
            title: 'Your information',
            name: 'Name:',
            birthday: 'Date of birth:',
          },
          section2: {
            title: 'Contact information',
            phone: 'Phone number:',
            email: 'Email address:',
          },
          section3: {
            title: 'Appointment location',
          },
          section4: {
            title: 'Appointment details',
          },
          section5: {
            title: 'Symptoms',
            value: 'Sore throat',
          },
          section6: {
            title: 'Payment',
            value: 'Credit Card payment for {{price}}',
          },
          button: 'Looking good so far',
          successTitle: 'All set!',
          successSubtitle: 'An appointment confirmation will be sent out shortly.',
          gotIt: 'Got it',
        },
        telehealthCTA: 'Speak to a medical expert',
        eligibilityCTA: 'Check treatment eligibility',
        prescriptionCTA: 'View prescriptions',
        payment: {
          info: 'Same day testing and treatment',
          codeButton: 'Have a code?',
          buttonTitle: 'Confirm payment',
        },
        snifflesTelehealth: {
          intro: {
            title: 'Find out if you qualify for',
            subtitle: 'Talk virtually to a medical expert',
            bullet1:
              'Talk now with a medical expert virtually to review your symptoms and get a treatment plan and prescription if needed.',
            bullet2:
              'Meet on-demand with a medical professional who can answer your questions, recommend treatment and prescribe medication.',
            bullet3:
              'Visits are available within the hour. Initial visits typically last between XX-XX minutes. ',
            description: '<b>Feel better fast</b> - only $49.99 ',
            toolTipText: '<b>Have a discount code?</b> You can apply it when requesting service.',
            button: 'Get started',
            backButton: 'Not now',
            privacy: 'Privacy policy',
            visitTime: 'Experts available between 8AM and 8PM EST',
          },
          questions: {
            userInfo: {
              title: 'Our doctors need a little information about you',
              note: 'Your address is required in the case a prescription is recommended.',
              note2: 'This is required in the case a prescription is recommended.',
              alertTitle: 'One quick thing...',
              alertMessage:
                'Saving address in profile will replace address currently in profile? Want to continue?',
            },
            location: {
              title: 'Where will you be for visit?',
            },
            introToQuestions: {
              title: 'In preparation for your visit',
              description:
                'Answer a few questions about yourself to help your medical provider get to know you.',
            },
            pharmacy: {
              title: 'Choose preferred pharmacy',
              description: 'Find a pharmacy near you for pick up or delivery',
            },
            medicalConditions: {
              title: 'Do you have any of the following medical conditions?',
            },
            symptoms: {
              title:
                'In the last 6-12 months, have you had any concerns, diagnosis, or illnesses in any of the following areas?',
              subtitle: 'Please select all that apply',
            },
            riskfactors: {
              title: 'Have you ever had any of the following?',
              subtitle: 'Please select all that apply',
            },
            diagnosis: {
              title:
                'Have you been exposed to anyone with the following diagnosis in the last 14 days?',
              subtitle: 'Please select all that apply',
            },
            question1: {
              title: 'What was your sex at birth?',
              answer1: 'Female',
              answer2: 'Male',
              answer3: 'Rather not answer',
            },
            question2: {
              title: 'Do you currently take any medications? (over-the-counter or prescription)',
            },
            question3: {
              title: 'Are you allergic to any medication? (over-the-counter or prescription)',
            },
            question7: {
              title: 'Do you smoke or have you in the past?',
            },
            question8: {
              title: 'Do you use other tobacco products?',
            },
            question9: {
              title: 'Do you consume alcohol?',
            },
            healthproblems: {
              title:
                'In the last 6-12 months, have you had any concerns, diagnosis, or illnesses in any of the following areas?',
              subtitle: 'Please select all that apply',
            },
            allergic: {
              title: 'Which medication(s) are you allergic to? (over-the-counter or prescription)',
            },
            medical: {
              title:
                'Which medication(s) are you currently taking? (over-the-counter or prescription)',
            },
            review: {
              title: 'Did we get it all correct?',
            },
            terms: {
              title: 'Almost done - please accept the terms and conditions',
            },
            payment: {
              info: 'Virtual consult appointment',
              codeButton: 'Have a Sniffles code?',
              buttonTitle: 'Submit',
              title: 'Go from blah to yah, fast!',
            },
          },
          review: {
            headerTitle: 'Review your information',
            title: 'Did we get it all correct?',
            userInfo: {
              title: 'Your information',
              name: 'Name:',
              birthday: 'Birthday:',
              height: 'Height:',
              weight: 'Weight:',
              email: 'Email:',
              phone: 'Phone:',
              address: 'Address:',
            },
            contactInfo: {
              title: 'Contact information',
              phone: 'Phone number:',
              email: 'Email address:',
            },
            visitLocation: {
              title: 'Visit location',
              state: 'State',
            },
            sexAtBirth: {
              title: 'Gender:',
            },
            riskFactors: {
              title: 'Conditions:',
            },
            symptoms: {
              title: 'Symptoms:',
            },
            diagnosis: {
              title: 'Exposures:',
            },
            activeMedications: {
              title: 'Medications:',
            },
            allergicMedications: {
              title: 'Allergies to medication:',
            },
            isSmoke: {
              title: 'Do you smoke?',
            },
            isTobacco: {
              title: 'Do you use tobacco products?',
            },
            isAlcohol: {
              title: 'Do you consume alcohol?',
            },
            healthProblems: {
              title: 'Concerns, diagnosis or illnesses',
            },
            selectedPharmacy: {
              title: 'Pharmacy location',
            },
            sectionPayment: {
              title: 'Payment',
              value: 'Credit Card payment for {{price}}',
            },
            none: 'None',
            button: 'Looking good so far',
          },
          success: {
            title: 'All set!',
            desctiption:
              'Your appointment will be scheduled within an hour (we will notify you if a medical expert is not available).',
            button: 'Got it',
          },
        },
        testRulingOut: {
          questions: {
            question1: {
              title: 'Do you have a COVID-19 test you would like to take?',
              answer1: 'Yes',
              answer2: 'No, I tested within the last 2 days',
              answer3: 'No, not right now',
            },
            question2: {
              title: 'What was the result of your COVID-19 test?',
              answer1: 'Negative',
              answer2: 'Positive',
              answer3: 'Invalid',
            },
            question3: {
              title: 'Okay. What would you like to do next?',
              answer1: 'Get help with my symptoms',
              answer2: 'Purchase a COVID-19 test',
            },
            question4: {
              title: 'Confirm your recent results',
              noneOption: 'Not my results',
            },
            warning: {
              title: 'You may qualify for FREE Covid Antiviral Treament!',
              subtitle:
                'In order to apply for free COVID treatment, a positive test result needs to be recorded in the On/Go app within the last 5 days.',
              linkText: 'If you have a test, proceed with testing. Ran out of tests? ',
              link: 'Buy now.',
              button: 'Start testing',
            },
          },
        },
      },
      medicationFlow: {
        intro: {
          title: 'Request medication online for Flu or Step',
          bullets: {
            1: 'Fill out a quick online form and a medical specialist will review your symptoms and provide a treatment plan and prescription if needed.',
          },
          description: 'Only $19.99 - <b>less than a co-pay</b>',
          notNow: 'Not now',
          check: 'Get started',
          toolTipText: '<b>Have a discount code?</b> You can apply it when requesting service.',
          bottomLink: 'See how it works',
          warning: {
            title: 'How provider evaluations work',
            description: `Your answers to the questions on the next few screens will be reviewed by a healthcare practitioner to determine if you are eligible for a prescription.

If you have not been exposed to the flu, are not having flu symptoms, or do not have a fever, you will likely not be prescribed any flu medication.

If it is determined that you are eligible for treatment a prescription will be automatically sent to the pharmacy you indicated.`,
            button: 'Got it',
          },
        },
        preSymptoms: {
          title: 'Are you experiencing any of these serious symptoms?',
          warning: {
            title: 'Seek medical attention',
            description:
              'The symptom(s) you selected are serious symptoms. We recommend you pursue emergency medical attention.',
            button: 'Done',
          },
        },
        applyConditions: {
          title: 'Do any of the following apply to you?',
          sticky:
            '<b>Note:</b> If you have not been exposed to the flu, are not having flu symptoms, or do not have a fever (temperature above 100.4), you will likely not be prescribed any flu medication.',
          warning: {
            title: 'Seek alternative treatment',
            description:
              'Unfortunately, the provider evaluation for Flu or Strep prescriptions is not appropriate for you at this time. Consider one of the following options instead.',
            content: {
              title: [
                'Get advice from a provider',
                'Get tested for Flu, Strep, and RSV',
                'Get over the counter medication',
                'Schedule vaccines',
              ],
              subtitle: [
                'For general questions and treatment',
                'from the comfort of your home',
                'and start feeling better soon',
                'and stay healthy this season',
              ],
            },
          },
        },
        userInfo: {
          header: 'Our doctors need a little information about you',
          alertTitle: 'One quick thing...',
          alertMessage:
            'Saving address in profile will replace address currently in profile? Want to continue?',
        },
        genderSelect: {
          title: 'What was your sex at birth?',
          options: ['Female', 'Male', 'Rather not answer'],
        },
        question1: {
          title: 'Are you experiencing any of the following symptoms?',
          options: [
            'Sore throat',
            'Runny nose',
            'Fever greater than 100.4 F / 38 C',
            'Sinus congestion',
            'Coughing',
            'Shortness of breath',
            'Nausea',
            'Headache',
            'Diarrhea',
            'New onset fatigue',
            'Swollen lymph nodes in your neck',
            'White spots on tonsils',
            'Wheezing',
            'Bloody nasal discharge',
            'Sinus tenderness',
            'Other',
          ],
        },
        question2: {
          title: 'Have you been exposed to anyone with the following diagnosis?',
        },
        question2B: {
          title: 'Have you tested positive for any of the following in the last week?',
        },
        exposedDiagnosis: {
          title:
            'Have you been exposed to anyone with the following diagnosis in the last 14 days?',
        },
        InUseMedicationSelect: {
          title: 'Which medication(s) are you currently taking? (over-the-counter or prescription)',
        },
        medicationInUse: {
          title: 'Do you currently take any medications? (over-the-counter or prescription)',
        },
        allergyStatus: {
          title: 'Are you allergic to any medication? (over-the-counter or prescription)',
        },
        allergicMedications: {
          title: 'Which medication(s) are you allergic to? (over-the-counter or prescription)',
        },
        question5: {
          title: 'Have you previously been hospitalized due to a respiratory illness?',
        },
        question6: {
          title: 'Do you have any new onset of fatigue?',
        },
        medicalConditions: {
          title: 'Do you have any of the following medical conditions?',
          subtitle: 'Please select all that apply',
          options: [
            'Untreated coronary artery disease',
            'Heart attack or stroke within the last six months',
            'Pregnant, or trying to get pregnant',
            'Breast-feeding',
            'Kidney disease',
            'Liver disease',
            'None of the above',
          ],
        },
        question8: {
          title: 'Do you have a code?',
          subtitle: 'This would be a code included in your Sniffles box.',
        },
        question9: {
          title: 'Enter code',
          subtitle: 'This is a code that would have been included with your Sniffles box.',
        },
        prescription: {
          subtitle: ['Is your order ready?', 'Is your prescription ready?'],
        },
        termsAndConditions: {
          title: 'Almost done - please accept the terms and conditions',
        },
        review: {
          header: 'Review',
          title: 'Did we get it all correct?',
          patientInfo: 'Your Information',
          name: 'Name:',
          birthday: 'Birthday:',
          height: 'Height:',
          weight: 'Weight:',
          email: 'Email:',
          phoneNumber: 'Phone Number:',
          address: 'Address:',
          symptoms: 'Symptoms:',
          gender: 'Gender:',
          beginSymptomsDate: 'Date symptoms began',
          recentExposures: 'Recent exposures',
          activieMedications: 'Medications:',
          allergiesToMedications: 'Allergies to medications:',
          pastRespiratoryIllnesses: 'Past hospitalizations?',
          riskFactors: 'Risk factors',
          preferredPharmacy: 'Pharmacy location',
          noSymptom: 'No Symptoms',
          submitSuccess: 'Treatment request submitted!',
          none: 'None',
          button: 'Looking good so far',
          discount: 'Discount applied',
        },
        payment: {
          title: 'Go from blah to yah, fast!',
          provider: 'Online medication request',
          buttonTitle: 'Submit',
          codeButton: 'Have a Sniffles code?',
          descr:
            'A medical specialist is reviewing your information to determine next steps. Expect to hear back ASAP - definitely within 24 hours.',
          gotIt: 'Got it',
          submitSuccess: 'All set!',
          submitSuccessDescription:
            'A provider is reviewing your information to determine next steps. You can expect to hear back within 24 hours.',
        },
        typical: {
          question: {
            subtitle: 'Please select all that apply',
          },
          forms: {
            symptomStartPlaceholder: 'When did symptoms begin?',
          },
          yesNo: {
            yes: 'Yes',
            no: 'No',
          },
          placeholder: {
            medication: 'Name of medication',
          },
        },
        buttons: {
          next: 'Next',
          addMedication: '+ add medication',
        },
      },
      scheduleDelivery: {
        checkboxQuestion:
          'Has your pharmacy contacted you to confirm that the following prescription(s) are ready for delivery?',
      },
      telehealth: {
        questions: {
          introToQuestions: {
            title: 'In preparation for your visit',
            description:
              'Answer a few questions about yourself to help your medical provider get to know you.',
          },
          selectThatApply: 'Please select all that apply',
          sex: {
            title: 'What was your sex at birth?',
            option1: 'Female',
            option2: 'Male',
            option3: 'Rather not answer',
          },
          pregnantOrNursingTitle: 'Are you currently pregnant or nursing?',
          disease: {
            title: 'Have you ever had any of the following?',
          },
          badHabits: {
            smoking: 'Do you smoke or have you in the past?',
            tobaccoProducts: 'Do you use other tobacco products?',
            alcohol: 'Do you consume alcohol?',
          },
          symptomsTitle: 'In the last 6-12 months, have you experienced any of the following?',
          sickAreasTitle:
            'In the last 6-12 months, have you had any concerns, diagnosis, or illnesses in any of the following areas?',
          paymentMethod: {
            title: 'How would you like to pay?',
            option1: 'Insurance',
            option1Description: 'Reimbursable by most insurances ',
            option2: 'Cash',
            option2Description: 'Initial visit cost is {{cost}}',
          },
          visitLocation: {
            title: 'Where will you be for visit?',
            placeholder: 'Enter zip code',
            toolTipText:
              'Looking for the state of the location where you will be completing your virtual visit from.',
          },
        },
        review: {
          header: 'Review',
          patientInfo: 'Your information',
          contactInfo: 'Contact information',
          insuranceInfo: 'Insurance information',
          name: 'Name',
          birthday: 'Birthday',
          number: 'Phone number',
          email: 'Email address',
          note: 'NOTE: ',
          description:
            'NOTE: a representative will be in touch with you to capture a copay or any necessary cash payment.',
          modalTitle: 'We’ve received your information',
          modalDescription:
            'Our team will contact you within XX minutes to confirm your details and get you started on your visit.',
          providerName: 'Provider name',
          firstName: 'Member first name',
          lastName: 'Member last name',
          relationship: 'Relationship to member',
          id: 'Member ID',
          button: 'Submit',
          visitLocation: 'Visit location',
          state: 'State',
          medicalProfileTitle: 'Medical profile',
          sex: 'Sex',
          conditions: 'Conditions',
          smoker: 'Smoker',
          otherTobacco: 'Other Tobacco Products',
          alcohol: 'Consumes Alcohol',
          conditionsInLastMonths: 'Conditions experienced in the last 6-12 months',
          concernsInLastMonths:
            'Concerns, diagnosis or illnesses experienced in the last 6-12 months',
          paymentInformation: 'Payment information',
          cashPay: 'Cash pay',
          none: 'None',
          allSet: 'All set!',
          gotIt: 'Got it!',
          successMessage:
            'Expect a call from us within the next hour to help set your appointment.',
        },
        payment: {
          title: 'How would you like to pay?',
          insurance: {
            title: 'Insurance',
            description: 'Reimbursable by most insurances ',
          },
          cash: {
            title: 'Cash',
            description: 'Starting at $XX',
          },
        },
        insurance: {
          header: 'Let’s find out if you are covered',
          title:
            'Provide your insurance information and pictures of ID card. Most insurances are reimburable with co-pay.',
          profileHeader: 'Insurance information',
          placeholders: {
            insuranceName: 'Insurance Name',
            firstName: 'Policy holder first name',
            lastName: 'Policy holder last name',
            birthDay: 'Policy holder’s birthday',
            relationship: 'Relationship to member',
            id: 'Member ID',
            front: 'Front of card',
            back: 'Back of card',
          },
          preview: {
            front: 'Insurance card (front)',
            back: 'Insurance card (back)',
          },
          checkbox: 'Skip this step next time! Save info to profile.',
          skip: 'Choosing cash pay option',
          next: 'Next',
          confirmSelect: 'File selected!',
        },
        termsAndConditions: {
          title: 'One last step - please accept the terms and conditions ',
          checkboxLabelDependent: 'As a parent or legal guardian, I have read and understand',
        },
        info: {
          header: 'Virtual Long COVID Clinic',
          title: 'Get seen virtually by a medical expert',
          newTitle: 'Consultation with a\nLong COVID specialist',
          description1:
            'Answer a few questions, talk to a specialized provider, and receive a personalized care plan for Long COVID.',
          description2:
            'Reimbursable by most insurances (with co-pay), <b>$99.99</b> cash pay option also available.',
          description3:
            'Reimbursable by most insurances after co-pay, cash pay option is also available.',
          visitTime: 'Visits available between 8AM and 8PM EST',
          button: 'Connect with a provider today ',
          privacyPolicy1:
            'Only the information you provide while requesting care with a provider will be shared with Openloop, our clinical care partner.',
          privacyPolicy2:
            'Any additional information currently in your account, including test results will not be shared.',
          privacyPolicy3:
            'Visit <a href="https://www.letsongo.com/privacy-policy">On/Go’s privacy policy</a> to learn more about how we protect your information.',
          visit: 'Visit available between 8AM and 8PM EST',
          privacyPolicy: 'Privacy policy',
          buttonCTA: 'Connect today',
          buttonNTN: 'Not now',
        },
        patient: {
          header: 'To start, confirm patient info',
          hint1: 'Where we will contact you to confirm your info.',
          hint2: 'Where you will receive an after visit summary.',
          name: 'Name: ',
          birthday: 'Birthday: ',
          number: 'Phone number: ',
          email: 'Email address: ',
          info1: 'NOTE:',
          info2: 'if you need to update your contact information, please do so in ',
          info3: 'Profile.',
          tooltip: 'For dependents, we will use phone number and email on file for main user.',
          note: 'a parent or legal guardian needs to provide consent and be present for this appointment.',
          navigateProfile: 'Are you sure you want to proceed to profile?',
        },
        policy: `Placeholde text goes here. Placeholde text goes here. Placeholde text goes here. Placeholde text goes here. Placeholde text goes here. Placeholde text goes here. Placeholde text goes here.

  Placeholde text goes here. Placeholde text goes here. Placeholde text goes here. Placeholde text goes here. Placeholde text goes here.

  Placeholde text goes here. Placeholde text goes here. Placeholde text goes here. Placeholde text goes here. Placeholde text goes here. Placeholde text goes here. Placeholde text goes here. Placeholde text goes here. `,
        zoom: {
          endedTitle: 'Call ended',
          endedDescription:
            'Thanks for connecting, you will soon have access to your after visit summary.',
        },
      },
      longCovid: {
        info: {
          title: 'Worried about Long Covid?',
          description1:
            'Our questionnaire makes it easy for you to find out how your symptoms compare to others who might be experiencing Long COVID*',
          description2:
            'We’ve made it easier for you to learn about how your health compares to others who might be experiencing Long COVID.',
          description3: 'Simply answer a few questions to learn more.*',
          footer: '* Source:',
          link: ' WHO',
          buttons: {
            start: 'Start here',
          },
          disclaimer: {
            title: '*Disclaimer: ',
            description:
              'the questions about Long COVID and the information provided in this application are not intended to be considered medical advice, and are intended to be educational only.  If you have questions related to your specific medical situation, you should contact your health care professional.',
          },
        },
        result: {
          header: 'Questionnaire Results',
          share: 'Share your results',
          chanceText: ' likelihood of developing Long COVID',
          likelihood: {
            title: 'Why is your likelihood {{type}}?',
            switchText: 'Want to set a reminder to complete self-assessment again in a few weeks?',
            description: {
              UC1_2: {
                paragraph1:
                  'If you are not sure if you’ve had COVID-19 previously, and have yet to test positive, it is unlikely that you have Long COVID.',
                paragraph2:
                  'If you are currently experiencing any symptoms, talk to your doctor, as this might be related to other conditions or issues.',
              },
              UC3_4: {
                paragraph1:
                  'While you previously tested positive for COVID-19, your likelihood of having Long COVID is low due to no symptoms being present.',
                paragraph2:
                  'Other factors that come into play include your age, your sex, and not having any chronic condition.',
              },
              UC5: {
                paragraph1:
                  'Long COVID is more common in people whose symptoms have persisted for more than 2 months',
                paragraph2:
                  'At this point, continue to track the progression of your symptoms. If your symptoms persist longer than 2 months, reach out to a Long COVID practitioner to discuss further.',
              },
              UC6_12: {
                pargraph1FirstPart: 'Based on your answers, the ',
                paragraph1LastPart: ' put you at an increased risk for getting Long COVID.',
                paragraph2:
                  'Reach out to a Long COVID practitioner to discuss your results and possible next steps.',
              },
            },
            link: 'Learn how your results are analyzed',
          },
          info: {
            title: 'What to know about Long COVID',
            firstPoint:
              'One of the ways to diagnose is for a provider to rule out any other condition',
            secondPoint:
              'At present, there is no specific medication for Long COVID, however data suggests holistic care can help',
            thridPoint:
              'Alternatively, participating in Clinical Trials can be another opportunity to seek treatment',
            lastPoint: 'Patients experiencing Long COVID symptoms could qualify for disability',
            footer: 'Reference ',
            link: 'source V',
          },
          chart: {
            more: ' more common',
            less: ' less common',
            description:
              ' of your responses are similar to the ones given by others experiencing Long COVID',
            similarResponses: 'similar responses',
            responseSummary: 'Your response summary',
            footer: {
              title: 'Content curated by',
              subtitle: 'On/Go Medical Advisors',
            },
          },
          connect: {
            title: 'Virtual Long COVID clinic',
            subtitle: 'Talk to a practitioner specializing in Long COVID now.',
            button: 'Make an appointment',
            link: 'Learn more',
            longCovidSymptoms: 'Long COVID symptoms',
          },
          symptoms: {
            link: 'Explore all symptoms',
            explainde: {
              red: 'represents symptoms you’ve experienced',
              green: 'represents symptoms you’ve not experienced',
              header: 'Symptoms explained',
              title: 'Below is information to explain what your symptoms could mean.',
              footer: 'Sources: ',
              link: 'sources X and XI',
            },
            neurological: {
              title: 'Neurological',
              description:
                'Some individuals who have had COVID infection develop medium to long-term neurological symptoms, including brain fog, fatigue, headaches and dizzines.',
            },
            cardiovascular: {
              title: 'Cardiovascular',
              description:
                'Studies have shown that people who have recovered from COVID (even mild cases) had signs of ongoing inflammation, which could lead to palpitation and rapid heartbeat.',
            },
            respiratory: {
              title: 'Respiratory',
              description:
                'A bad case of COVID can produce permanent problems in the lungs. Even mild infections can cause persistent shortness of breath. Lung recovery is possible, but takes time. Breathing exercises and respiratory therapy can help.',
            },
            joint_pain: {
              title: 'Joint pain',
              description:
                'The severity of the pain and where the pain is felt varies between indivuals who have previously had COVID. Research has shown that a personalized recovery plan with a physical therapist could help. ',
            },
            mental: {
              title: 'Mental',
              description:
                'Isolation, stress from job loss, deaths of loved ones (all caused by COVID in some way) can increase one’s anxiety, depression and other mental health issues.',
            },
            gastrointestinal: {
              title: 'Gastrointestinal',
              description:
                'Patients with post-COVID have experienced abdominal pain, constipation, diarrhea and vomiting, amongst others. Experts believe that the general inflammation caused by COVID can disrupt the normal bacteria that live in the gut - they recommend hydrating and eating a healthy diet (fad and extreme diets have not been found to be helpful).',
            },
            general: {
              title: 'General',
              description:
                'Other, less common issues can persist after a COVID infection, including loss of taste and smell. Loss of taste and sense, while not life-threatening, persist for longer than a couple of weeks for most who have had COVID (sometimes up to a year). Other common symptoms of Long COVID are fever and fatigue - often linked or related to other symptoms. ',
            },
            other: {
              title: 'Other',
              description:
                'Post-COVID conditions may not affect everyone the same, therefore it is not uncommon to also experience rashes, changes in menstrual cycle, and worsening symptoms due to any type of activity. ',
            },
          },
          source: {
            explainde: {
              header: 'Our sources',
            },
          },
          answers: {
            explainde: {
              header: 'Responses explained',
              red: 'represents responses common in research',
              green: 'represents responses less common in research',
              footer: 'Reference ',
              link: 'sources II to III, IX, and XII to XV',
            },
            question1: {
              title: 'Tested positive, or suspected having it?',
              description:
                'Long COVID can be found in anyone who has been infected with COVID-19, even people who had mild illness or no symptoms. While most people with Long COVID conditions have evidence of COVID-19 illness, in some cases, a person with post-COVID conditions may not have tested positive for the virus or known they were infected.',
            },
            question3: {
              title: 'Severity of past infection(s)',
              description:
                'Anyone who has been infected with COVID-19 can experience Long COVID, but it is more often found in people who had severe COVID illness, especially those who were hospitalized.',
            },
            question4: {
              title: 'Presence of symptoms',
              description:
                'People with Long COVID conditions can have a wide range of symptoms. Symptoms can persist from the initial illness, or begin after recovery. Symptoms may come and go or relapse over time.',
            },
            question5: {
              title: 'Duration of symptom(s)',
              description:
                'Long COVID symptoms can start with the initial infection or weeks after infection. Symptoms and effects from COVID can last for at least 2 months. ',
            },
            question7: {
              title: 'Vaccination status',
              description:
                'Research suggests that people who are vaccinated but experience a breakthrough infection are less likely to report post-COVID conditions, compared to people who are unvaccinated.',
            },
            question8: {
              title: 'Age range',
              description:
                'Post COVID can impact any age but does appear to occur less in children. Some studies have shown that for each decade the rates increase and many studies show the highest rates in the oldest populations.',
            },
            question9: {
              title: 'Sex',
              description:
                'New studies suggest that Women were more likely to experience Long COVID than men. ',
            },
            question10: {
              title: 'Conditions',
              description:
                'Some studies have found higher rates of Long COVID in people who were overweight or had chronic physical or mental health problems before becoming infected. More studies will help to determine if these factors are just a reflection of being less healthy, and thus prone to more severe infections.',
            },
          },
          buttons: {
            clinic: 'Long COVID Clinical Trials',
            resources: 'Additional resources',
          },
        },
        carePlan: {
          headerTitle: 'Care plan',
          virtualConsultation: 'Virtual consultations',
          upcomingVisit: 'Upcoming visit',
          changeAppointment: 'Change appointment',
          pastConsultations: 'Past consultations',
        },
      },
      sendTest: {
        popup: {
          title: 'You can now upload past results',
          subtitle: 'Manually add previously compelted test results to your timeline',
        },
        titles: {
          symp: 'Symptoms',
          choose: 'Select date',
          result: 'Select test result',
        },
        subtitles: {
          sypm: 'Did you have any symptoms at the time of testing?',
          choose: 'When was test completed?',
        },
        savedTitle: 'Result saved!',
      },
      vitamiDQuiz: {
        banner: {
          title: 'Vitamin D and COVID-19',
          subtitle: 'These two have something in common...',
          button: 'Learn more',
        },
        info: {
          title: 'Did you know...',
          firstParagraph:
            'Vitamin D is essential in helping fight diseases and supporting your immune system. Low levels of Vitamin D can mean loss of bone density, amongst other diseases',
          secondParagraph: 'Take a short quiz to understand your possible risk level.',
          buttons: {
            notNow: 'Not now',
            start: 'Start quiz',
          },
        },
        result: {
          title: 'Vitamin D Risk assessment',
          chanceLow: 'Low',
          chanceMid: 'Moderate',
          chanceIncreased: 'Increased',
          chanceText: ' risk of Vitamin D deficiency',
          risk: {
            title: 'Your risk level explained',
            age: {
              title: 'Age',
              description:
                'Recent medical information has found that those under 65 have a higher risk of low vitamin D levels.  This is likely to the fact that many people over 65 are on supplements.  If you are over 65 and have never been on a multivitamin or supplement of vitamin D you may be at increased risk for low vitamin D levels. ',
            },
            race: {
              title: 'Race/ethnicity',
              description:
                'Studies have shown that individuals with darker skin pigmentation tend to make less vitamin D in the sun than people with lighter skin.',
            },
            chronic: {
              title: 'Chronic conditions',
              description:
                'Some research has shown that individuals with certain bowel diseases may have more difficulty absorbing dietary fat, which means likely higher risk of vitamin D deficiency.  Smokers, diabetics and those with obesity also have increased likelihood of deficiencies in vitamin D.',
            },
            lifeStyle: {
              title: 'Diet/lifestyle',
              description:
                'A vitamin D enriched diet is another way to keep your levels up. Fatty fish, milk, orange juice and eggs are good sources of vitamin D.  In fact daily milk consumption lowers your risk significantly. ',
            },
            button: {
              title: 'Keeping up with vitamin D',
              subtitle: 'Learn more on how to keep your vitamin D levels up.',
              notNow: 'Not now',
              learn: 'Learn more',
            },
          },
        },
      },
      careCard: {
        title: 'COVID-19 resources and care',
        subtitle: 'Stay healthy and safe!',
        button: 'View care solutions',
      },
      carePopup: {
        title: 'To help you feel better soon...',
        subtitle: 'We’ve curated an array of services to get you through this...',
        row: {
          1: 'Guidance on what to do next',
          2: 'Medical care with doctors',
          3: 'Resources for your top questions',
        },
        footer: 'And more...',
        buttons: {
          notNow: 'Not now',
          explore: 'Explore care',
        },
      },
      vitamin: {
        title: 'Did you know...',
        paragraphTitle: 'Vitamin D deficiency',
        firstParagraph:
          ' is belived to increase the risk of COVID-19 infection and the likelihood of severe disease*.',
        secondParagraph:
          'Unfortunately, 42% of Americans are estimated to be vitamin D deficient** and that was before the pandemic left everyone inside for 2+ years...',
        thridParagraph:
          'To help fight COVID-19, we’ve curated resources about what you can do to assess your personal risk and improve your vitamin D levels.',
        buttons: {
          notNow: 'Not now',
          learn: 'Learn More',
        },
        firstLink: '* https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0263069',
        secondLink:
          '** https://www.cantonmercy.org/healthchat/42-percent-of-americans-are-vitamin-d-deficient/',
      },
      vitaminInfo: {
        title: 'Increasing Vitamin D Intake',
        secondTitle: 'About Vitamin D',
        first:
          'Vitamin D is an essential part of keeping the immune system working properly and may be helpful in protecting against COVID-19.',
        second: 'Vitamin D deficiency is more common for the following individuals*: ',
        p1: '• Hispanic and Black population',
        p2: '• People over the age of 65',
        p3: '• High-risk and immunocompromised individuals',
        thrid:
          'Consult your primary care physician if you believe you may be vitamin D deficient. They may determine if prescription vitamin D is appropriate for you.  In the meantime, here are some other ways to increase your vitamin D intake**.',
        rows: {
          1: 'Spend some time in the sun',
          2: 'Consume fatty fish (salmon is a great option)',
          3: 'Include some mushrooms in your salad',
          4: 'Have some eggs for breakfast (it is all in those egg yolks)',
          5: 'Drink some commonly fortified foods such as cow’s milk and oj',
        },
        firstLink:
          '* https://www.mayoclinic.org/diseases-conditions/coronavirus/expert-answers/coronavirus-and-vitamin-d/faq-20493088',
        secondLink:
          '** https://health.ucdavis.edu/coronavirus/news/headlines/what-is-the-link-between-vitamin-d-levels-and-covid-19/2022/02',
        button: 'Back to home',
      },
      accSettings: {
        title: 'Account Settings',
        edit: 'Edit',
        enable: 'Enable',
        version: 'App Version',
        deleteAccount: 'Delete account',
        requestedDeleteTitle: 'Request to delete account in progress',
        requestedDeleteContent1: 'Submitted on {{date}}. Reach out to ',
        requestedDeleteContent2: 'support@letsongo.com ',
        requestedDeleteContent3: 'if you have any questions.',
        reporting: 'Reporting',
        noSelection: '(no selection made)',
      },
      home: {
        activity: 'Activity',
        routine: 'Routines',
        testTrack: 'Your {{test}} in on the way!',
        track: 'Track',
        buttons: {
          test: 'Start test',
          care: 'Get care',
          buy: 'Buy tests',
          code: 'Redeem code',
        },
        emptyOrg: {
          title: 'You are up to date!',
          subtitle: "Don't forget you can ",
          button: 'test any time.',
        },
        sniffles: {
          title: 'Got sniffles?',
          subtitle: 'We can help!',
          button1: 'Start here',
          button2: 'View options',
        },
        covid_test: {
          title: 'Take a COVID-19 Self-test',
          button: 'Start here',
        },
        vaccine: {
          title: 'Upload vaccine card',
          subtitle: 'Access and share anytime',
        },
        task: {
          overdue: 'Overdue',
          upcoming: 'Upcoming',
          today: 'Due today',
          dueToday: 'Due Today',
          dueTomorrow: 'Due tomorrow',
        },
        banner: {
          type: {
            virtual: 'Virtual consult appointment',
            testing: 'In-home testing appointment',
          },
          time: {
            now: 'Now',
            pending: 'Pending',
          },
        },
      },
      appointmentDetails: {
        menu: {
          reschedule: 'Reschedule appointment',
          cancel: 'Cancel appointment',
          close: 'Close',
        },
        pending: {
          title: 'Pending',
          description1:
            'Your information is being reviewed by a medical provider. We will notify you when an appointment time is confirmed.',
          description2: 'If you need to speak to someone now, reach out to us at',
        },
        testing: {
          note: {
            title: 'NOTE: ',
            description:
              'You will be testing for Strep, Flu, RSV and/or COVID, depending on the medicalexpert’s recommendation.',
          },
          button: 'Edit appointment',
        },
        virtual: {
          description:
            'Talk to a medical expert virtually to discuss your symptoms and receive a personalized care plan for Flu, Strep and RSV.',
          buttons: {
            start: 'Start appointment',
            edit: 'Edit appointment',
          },
        },
        date: 'Appointment date',
        title: 'Details',
        reschedule: 'Re-schedule',
        cancel: 'Cancel',
        testingFor: 'You will be testing for:',
        forAppointment: 'For your appointment:',
        forQeustions1:
          'For questions or to track the status of your provider, please contact us at',
        forQeustions2: '(ext. 5)',
        track: 'Track provider',
        getStarted: 'Get started',
        rescheduleTitle: 'Select date and time',
        rescheduleButton: 'Submit',
        rescheduleAlert: {
          title: 'Does this look right?',
          subtitle: 'New appointment date and time will be {{date}}',
        },
        cancelAlert: {
          title: 'Are you sure?',
          subtitle:
            'Canceling appointment does not guarantee same availability for new appointment',
        },
        testingForOptions: "Flu/Strep/RSV depending on the provider's recommendation",
        testingAdultNonCaliforniaOptions: 'In-home testing',
        testingAdultCaliforniaOptions: 'Flu and Covid',
        testingMinorNonCaliforniaOptions: 'Flu or Strep or RSV; combination of Flu, Strep, RSV',
        testingMinorCaliforniaOptions: 'Flu and Covid',
        appointmentInfo: {
          1: 'Make sure you have an ID available',
          2: 'Be prepared for a nasal or throat swab (more than 1 maybe required depending on the tests ordered)',
          3: 'If testing for a minor, remember a parent or legal guardian must be present during the appointment.',
        },
        appointmentVirtualInfo: {
          1: 'For your appointment: Set aside 20-30 minutes for your appointment.',
          2: 'If testing for a minor, remember a parent or legal guardian must be present during the appointment.',
        },
        contactInfo: 'For questions or to track the status of your provider, please contact us at ',
      },
      intro: {
        step: 'Step',
      },
      login: {
        alertBio: {
          setup: `Setup {{biotype}}`,
          question: `Do you want to use {{biotype}} for a faster login next time?`,
          dontAllow: "Don't allow",
          firstLogin: `Please login to enable {{biotype}}`,
        },
        new: 'New user?',
        singUp: 'Sign up',
        loginButt: 'Log in',
        forgPass: 'Forgot password',
      },
      noRedLine: {
        anotherTest: 'Please perform another test.',
        exit: 'Exit',
      },
      scanBar: {
        headerQR: 'Scan QR code',
        headerTest: 'Choose test',
        getStarted: 'Great, Let’s get started!',
        infoQR:
          'Use this reader to scan the QR code located on the outside of your test packaging.',
        manually: {
          title: "Don't have a QR code?",
          button: 'Start test manually',
          chooseTest: 'Which test would you like to take?',
        },
        button: 'Next',
      },
      shop: {
        passport: 'Passport',
        alert: {
          title: 'On/Go Health Passport',
          subtitle:
            'Others can scan this badge to share your most recent test results.Badge will expire after 30 minutes.',
        },
        test: 'COVID-19 Test status',
        vaccine: 'Vaccination status',
        vaccStatus: 'Vaccinated',
        fda: 'FDA Emergency Use Authorization',
        share: 'Share status',
        modal: {
          title: 'View health passport for',
        },
      },
      singleTest: {
        title: 'PAST TESTS',
        subtitle: 'Test name here',
      },
      started: {
        title: 'Together is better',
        button: 'Get started',
        haveAccount: 'Already have an account?',
        signIn: 'Sign in',
        modal: {
          title: 'App must have network or WIFI connection to properly function',
          subtitle:
            'This app checks network connection and WiFi status to make sure it will function correctly, including saving your test results so that you can reference them later.',
          button: 'Continue',
        },
      },
      testingDetails: {
        title: 'Testing details',
        question: 'How are you planning on using your test?',
        personal: {
          title: 'For personal use',
          subtitle: 'Test at home or anywhere',
        },
        event: {
          title: 'For an event',
          subtitle: 'Plan testing before your event',
        },
      },
      testResult: {
        covid: 'for COVID-19.',
        title: 'Your test has been successfully interpreted.\nYour result is ',
        sympt: 'Symptoms',
        noSympt: 'No symptoms reported',
        date: 'Date and time',
        testType: 'Test name',
        next: {
          title: 'What next?',
          negativeTitle: "Great, tested negative. What's next?",
          vaccine: 'Stay healthy this season',
          vaccineDesc: 'Schedule your vaccine today',
          care: 'View Care Solutions',
          cdc: 'View CDC guidelines',
          another: 'Take another test',
          treatmentNegative: 'Want to figure out your symptoms?',
          treatmentDescNegative: 'Find out how we can help',
          treatmentPositive: 'Time to feel better',
          treatmentDescPositive: 'Find the right treatment for you',
        },
        positive: {
          type: 'POSITIVE',
        },
        negative: {
          type: 'NEGATIVE',
        },
        invalid: {
          type: 'INVALID',
          reason: 'for the following reason: test expired.',
        },
        warning: {
          header: 'Important: ',
          text: 'If used for serial testing, a second test should be taken between 24 and 48 hours from now',
        },
      },
      update: {
        title: 'New upgrade available',
        experience: `In order to get the best experience, please update your app to the
          latest version.`,
        security: `As an added security measure, please use the Forgot Password link to
          update your password the first time you use the new version.`,
        button: 'Update now',
      },
      webView: {
        alert: "Error, sharing isn't available on your platform",
      },
      dependent: {
        edit: {
          add: 'Add new dependent',
          date: 'Please Enter Date of Birth',
          birthday: 'Birthday',
          vaccination: {
            title: 'Vaccination card',
            view: 'View vaccination card',
            upload: 'Upload vaccine card',
          },
          button: 'Save',
          modalTitle: 'Dependent saved!',
          modal: {
            delete: 'Delete dependent’s account',
            cancel: 'Cancel',
          },
          optional: 'Optional',
        },
        info: {
          alert: {
            title: 'Delete dependent',
            subtitle:
              'Are you sure you want to delete this dependent? You will also lose access to their tests and reports.',
          },
          basic: 'Basic Info',
          routine: 'Routines',
          org: 'Organizations',
          modal: {
            delete: 'Delete dependent',
            cancel: 'Cancel',
          },
        },
      },
      newPass: {
        firstRow: 'Please enter a new',
        secondRow: 'password below',
        char: '• 8+ characters',
        symb: '• 1 symbols',
        upper: '• 1 uppercase',
        numb: '• 1 number',
        placeholder: 'Re-enter password',
        button: 'Set password',
      },
      org: {
        activeRout: 'Active routines',
        listHeader: 'Organizations',
      },
      telehealthPermissionsModal: {
        title: 'App leverages camera and microphone to enable telehealth visits.',
        body: 'This app leverages your camera, audio, microphone, and audio recording to allow you to have a conversation with a provider.',
        button: 'Continue',
      },
      proctoring: {
        end: 'End Session',
        live: {
          header: 'Live Support',
          chat: 'App leverages audio and microphone to enable live chat with Care Guide',
          speak:
            'This app leverages your audio and microphone to allow you to speak with a with a Care Guide.',
          button: 'Continue',
        },
        cameraTitle: 'Check that you are happy with your video before continuing',
        modal: {
          title: 'Call complete',
          descr: 'Thanks for connecting. You will receive a Care Solutions email shortly',
        },
      },
      question: {
        first: {
          title: 'Do you take more than 10 mg per day of biotin (Vitamin B7) supplements?',
          subtitle: `High biotin levels (>10 mg per day) can interfere with this test. If you are unsure, please consult your physician.`,
          yes: 'Yes',
          no: 'NO or Not Sure',
        },
      },
      timeline: {
        title: 'Timeline',
        noResults: 'NO PAST RESULTS',
        overdue: 'OVERDUE',
        upcoming: 'UPCOMING',
        past: 'PAST RESULTS',
      },
      deleteAccount: {
        title: 'Submit request to delete',
        content1:
          'Deleting an On/Go account is permanent. If you choose to proceed, you will lose access to testing and vaccine records.\n\n',
        content2: 'Please note: ',
        content3:
          'account will be deleted in a timely manner. In the meantime, please reach out to ',
        content4: 'support@letsongo.com ',
        content5: 'if you have any questions.\n\n',
        content6: 'Are you sure you want to continue with the request?',
        cancel: 'Cancel',
        submit: 'Submit request',
        submittedTitle: 'Request submitted',
        submittedSubtitle:
          'You will be notified via email once your account has been successfully deleted.',
      },
      updateCheck: {
        loading: 'Your app is about to get\neven better!',
      },
    },
    profile: {
      basicInfo: {
        header: 'Basic Info',
        compModal: 'Basic info saved!',
        placeholderZip: 'Postal (zip) code',
      },
      health: {
        header: 'Health Profile',
        birthday: 'Birthday',
        compModal: 'Health info saved!',
        insurance: {
          view: 'View insurance info',
          upload: 'Upload insurance info',
        },
      },
      list: {
        header: 'Profile',
        logout: 'Log out',
        passport: 'Passport',
        basic: 'Basic info',
        health: 'Health profile',
        prescriptions: 'Prescriptions',
        depend: 'Dependents',
        events: '2gather events',
        org: 'Organizations',
        routine: 'Routines',
        accountSett: 'Account settings',
        faq: 'Get help / FAQ',
        policy: 'Privacy policy',
        orderHistory: 'Order history',
        carePlan: 'Care plan',
        pictureSaved: 'Picture saved!',
      },
      routine: {
        date: 'Date enrolled',
        org: 'Organization',
        description: {
          title: 'Description',
          description: `COVID-19 testing protocol for apple employees that travel
            more than 3 times per month. Employees are required to take
            a COVID-19 antigen test 2/week.`,
        },
        sharing: {
          title: 'Sharing settings',
        },
        antigen: 'COVID-19 Antigen tests',
        pcr: 'COVID-19 PCR tests',
        overdue: 'Overdue',
        upcoming: 'Upcoming',
        past: 'Past results',
      },
      carePlan: {
        covidTitle: 'Covid care plan',
        snifflesTitle: 'Sniffles care plan',
        upcomingVisit: 'UPCOMING VISIT',
        changeAppointment: 'Change appointment',
        requestAppointment: 'Request appointment',
        noAppointment: 'No upcoming appointment',
        viewDetails: 'View details',
        virtualConsultation: 'Virtual consultations',
        longCovidConsultation: 'Long COVID consultation',
        snifflesCosultation: 'Sniffles consultation',
        testing: 'Testing',
        imaging: 'Imaging',
        noDocument: 'No documents available',
        peningSchedule: 'Pending scheduling with a provider',
        getHelp: 'Get help',
        medications: {
          title: 'Medications',
          viewPrescriptions: 'View all your current prescriptions',
        },
        pastConsultaion: {
          title: 'Past consultations',
          notes: 'Notes',
          afterVisitSummary: 'After visit summary',
          virtualLongCovid: 'Virtual consultation - Long COVID',
          virtualSniffles: 'Virtual consultation - Sniffles',
          noConsultation: 'No Past Consultations',
        },
        treatmentEvaluation: {
          title: 'Treatment evaluations',
          recent: 'RECENT EVALUATIONS',
          past: 'Past evaluations',
          noEvaluations: 'No recent evaluations are available',
          viewDetails: 'View details',
          snifflesTreatment: 'Sniffles treatment',
          covidTreatment: 'Covid-19 treatment',
          treatmentForSniffles: 'Sniffles treatment {{observations}}',
          treatmentForCovid: 'Antiviral treatment for Covid-19',
          medication: 'Medication <b>{{status}}</b> {{reason}}',
          reviewed: 'Reviewed by <b>{{doctorName}}</b> on {{date}}',
          viewPrescriptions: 'View my prescriptions',
          scheduleNow: 'Schedule now',
          folloupConsultation: 'Follow-up virtual consultation is recommended. ',
          folloupPlans: 'Follow-up testing for {{plans}} is recommended. ',
          providerRecommendation: 'Provider recommendation',
          pending:
            'Your evaluation is being reviewed by a medical provider. You can expect to hear back within 24 hours of your submission.',
        },
      },
      carePlanSelector: {
        headerTitle: 'Care plans',
        longCovid: 'COVID',
        sniffles: 'Sniffles',
      },
    },
    vaccine: {
      header: 'Vaccine Card',
      add: {
        header: 'Add dose information',
        date: 'Date received',
        subtitle: 'One of the following fields is required, include both if available.',
        healthcare: 'Healthcare Professional',
        clinic: 'Clinic Site',
        compModal: 'Vaccine dose saved!',
        remove: 'Remove',
        cancel: 'Cancel',
      },
      edit: {
        header: 'Dose information',
        alert: {
          title: 'Re-upload Vaccine Card',
          subtitle: 'Are you sure you want continue? You will lose your current vaccination card.',
        },
        depend: {
          title: "Who's vaccination card is this?",
          header: 'Choose user',
        },
        preview: 'Click here to preview your pdf file!',
      },
      picker: {
        title: 'How would you like to upload your vaccination card?',
        photo: 'Take photo',
        library: 'From photo library',
        file: 'Upload file',
        org: {
          question: 'Don’t have your vaccination information at the moment?',
          skip: ' Skip for now',
        },
        comp: 'File uploaded!',
        modal: {
          title: `App requests access to your photos and files for uploads.`,
          subtitle: `If you choose to upload a photo or file from your device, we request access to your device’s external storage.`,
        },
      },
      button: {
        remove: 'Remove',
        cancel: 'Cancel',
        reupload: 'Re-upload',
        continue: 'Continue',
      },
    },
    passwordRequirment: `Your password must contain at least 8 characters, at least one uppercase, at least one lowercase letter, at least one number, and at least one
      special character.`,
    dependentsList: {
      title: 'Who is this test for?',
      header: 'Choose user',
    },
    footer: {
      onBack: 'Back',
      onStartTimer: 'Start timer',
      onNext: 'Next Step',
      onExit: 'Exit',
      Next: 'Next',
      Home: 'Home',
      Complete: 'Complete',
    },
    exitAlert: {
      Text: 'Are you sure you want to exit?',
      Title: 'Confirm',
    },
    permissionsLocation: {
      EnableLocation: 'Enable location access',
      PermissionsNeeded: 'Permission needed',
      SettingsIOS: 'Please open Settings > Privacy > Location and enable IntrivoEye.',
      SettingsAndroid: 'To use location features, turn on Location permission.',
      Settings: 'Settings',
      CancelIOS: 'Cancel',
      CancelAndroid: 'Dismiss',
    },
    yesNo: {
      Yes: 'Yes',
      No: 'No',
    },
    firstScreen: {
      Title: 'CareStart™',
      Subtitle: 'COVID-19 Antigen Home Test',
      Start: 'Start',
      Version: 'Version',
      Alert: 'Please make sure you are connected to the internet.',
      Attention: 'Attention',
    },
    secondScreen: {
      Title: 'Let’s Get Started!',
      Text: 'We will now walk you through the steps needed to properly conduct your CareStart™ COVID-19 Antigen Home Test and guide you through getting your results.',
    },
    selectAge: {
      Title: 'What is the age of the person being tested?',
      SubTitle: 'Important:​',
      Text: 'Test procedures may differ with age group of patient',
      Younger: '13 years and younger',
      YoungerRed:
        'Warning: Only parent or legal guardian must collect sample and proceed the test for minors.',
      Older: '14 years and older',
    },
    warning: {
      Title: 'Please find our terms and conditions below.',
      Text: `Immediately use after opening the test device in the pouch.
  In order to obtain accurate results, the test must follow provided test procedures.
  Excess blood or mucus on the swab specimen may interfere with test performance and may yield a false-positive result.
  Do not interpret the test result before 10 minutes and after 15 minutes starting the test.
  Inadequate or inappropriate sample collection, storage, and transport can result in incorrect results.If specimen storage is necessary, swabs can be placed into extraction buffer for up to four hours. Specimens should not be stored dry.
  Do not use if the test device package is damaged.
  Do not use the kit contents beyond the expiration date.
  Do not eat, drink, or smoke in the area where the specimens and kit contents are handled.
  Use appropriate precautions in the collection, handling, storage, and disposal of patient samples and used kit contents.
  If the extraction buffer contacts the skin or eye, flush with copious amounts of water.
  Do not interchange kit contents from different lots.
  Do not re-use any contents in the kit as they are single-use only.
        `,
      CheckBoxText: 'I have read and understand​',
      CheckBoxTextMinor: 'As a parent or legal guardian, I have read and understand',
      Scroll: '(Scroll to bottom of page to agree)',
      Text1:
        'This product has been authorized only for the detection of proteins from SARS-CoV-2, not for any other viruses or pathogens.',
      Text2:
        'As with all diagnostic tests, all results must be interpreted together with other clinical information available to the physician.',
      Text3: 'Immediately use after opening the test device in the pouch.',
      Text4: 'In order to obtain accurate results, the test must follow provided test procedures.',
      Text5:
        'Excess blood or mucus on the swab specimen may interfere with test performance and may yield a false-positive result.',
      Text6:
        'Do not interpret the test result before 10 minutes and after 15 minutes starting the test.',
      Text7:
        'Inadequate or inappropriate sample collection, storage, and transport can result in incorrect results.If specimen storage is necessary, swabs can be placed into extraction buffer for up to four hours. Specimens should not be stored dry.',
      Text8: 'Do not use if the test device package is damaged.',
      Text9: 'Do not use the kit contents beyond the expiration date.',
      Text10:
        'Do not eat, drink, or smoke in the area where the specimens and kit contents are handled.',
      Text11:
        'Use appropriate precautions in the collection, handling, storage, and disposal of patient samples and used kit contents.',
      Text12:
        'If the extraction buffer contacts the skin or eye, flush with copious amounts of water.',
      Text13: 'Do not interchange kit contents from different lots.',
      Text14: 'Do not re-use any contents in the kit as they are single-use only.',
    },
    searchAddressPlaceholder: 'Enter address here',
    introSteps: {
      1: {
        title: 'Let’s start with your',
        title2: 'email address',
        subtitle: 'Please enter a valid email',
      },
      2: {
        title: 'Set your password',
        characters: '• 8+ characters',
        symbols: '• 1 symbols',
        uppercase: '• 1 uppercase',
        number: '• 1 number',
      },
      3: {
        title: 'Let’s setup two factor authentication',
        skipTitle: 'Let’s add a phone number',
        subtitle: 'Please enter your mobile phone number.',
      },
      4: {
        title: 'Verify your account',
        subtitle: 'Enter the code sent to ',
        helpText: 'Having trouble?',
        helpButton: 'Get help',
        supportMailSubjectLogin: 'Help with OnGo App two factor identification during Sign In',
        supportMailSubjectOnboarding:
          'Help with OnGo App two factor identification during onboarding',
        supportMailBody:
          "I'm having trouble receiving the two factor code sent to my mobile phone. Here are my specifics to help with troubleshooting:  ",
        sendCodeToMail: 'Use my email address instead',
        sendCodeToPhone: 'Use my phone number instead',
        newCode: 'Send me a new code',
        phone: 'phone number',
        sendCode: 'Send me a new code',
      },
      5: {
        title: 'END USER LICENSE AGREEMENT',
        subtitle: `This End User License Agreement (“Agreement”) is a binding legal contract between you (either an individual or a legal entity) and Intrivo Diagnostics, Inc. (“Intrivo”, “us” or “we”).  By downloading, installing, accessing or using the accompanying software (the “Application”) you will be bound by the terms of this Agreement and the terms and conditions found at <a href="https://www.intrivo.com/terms-and-conditions">https://www.intrivo.com/terms-and-conditions</a> (the “Terms”), and our Privacy Policy, found at intrivo.com/privacy-policy/, which are hereby incorporated into this Agreement. The terms of this Agreement will control to the extent there is any conflict between terms of this Agreement and the Terms with respect to your use of the Application. If you are an individual using the Application on behalf of an entity, you represent and warrant that you have the legal authority to bind such entity to this Agreement and that such entity agrees to be responsible to us in the event you violate this Agreement. Except for the prior sentence, when we say “you” throughout this Agreement, we mean you as an individual and such legal entity. If you do not agree to the terms of this Agreement, including the MANDATORY ARBITRATION AND CLASS ACTION WAIVER referenced in Sections 22 and 23 below, then you may not download, install, access, use or copy the Application.

The Application is licensed to you, not sold. Except for the limited license granted in this Agreement, we and our licensors retain all right, title and interest in the Application and all proprietary rights in the Application, including copyrights, patents, trademarks and trade secret rights.

1. Grant of License. We grant you a limited, non-sublicensable, revocable, nontransferable (except as provided below), personal, nonexclusive license to use the object code version of the Application for use on your personal mobile device.  You may not install or use the Application on a device that you do not own or control.  The Application may be accessed and used by other accounts associated with you via family sharing or volume purchasing.

2. Limitations On License. The license granted to you in this Agreement is restricted as follows:

  Limitations on Copying and Distribution.  You may not copy or distribute the Application except to the extent that copying is necessary to use the Application as described in this Agreement.

  Limitations on Reverse Engineering and Modification; APIs.  You may not (i) access or use the application programming interfaces (“APIs”) for any purpose other than your licensed use of the Application or (ii) reverse engineer, decompile, disassemble, modify or create works derivative of the Application, except to the extent expressly permitted by applicable law.

  Sublicense, Rental and Third Party Use.  You may not assign, sublicense, rent, timeshare, loan, lease or otherwise transfer the Application, or directly or indirectly permit any third party to copy and install the Application on a device not owned and controlled by you.

Proprietary Notices.  You may not remove, alter, or obscure any proprietary notices (e.g., copyright and trademark notices) from the Application or its documentation.

Use in Accordance with Documentation.  All use of the Application must be in accordance with its then current documentation, if any, provided with the Application or made available on our web site. You may not input, upload, transmit
        or otherwise provide to or through the Application any unlawful or malicious information, materials or code.

Confidentiality.  You must hold the Application and any related documentation in strict confidence for your own use only.

Compliance with Applicable Law.  You are solely responsible for ensuring your use of the Application is in compliance with all applicable foreign, federal, state and local laws, and rules and regulations. You will not use the Application in any manner that is inconsistent with the terms herein or that infringes the intellectual property rights of Intrivo or any third party.

App Store Rules.  You must use the Application in strict compliance with all rules and usage requirements of the app store from which you downloaded the Application.  You are responsible for locating and reviewing those rules and usage requirements.

3. Account Set-Up. You agree to: (a) provide true, accurate, current, and complete information when registering to use the Application and establishing your account (“Registration Information”) and (b) maintain and promptly update the Registration Information to keep it true, accurate, current, and complete. If you provide any information that is untrue, inaccurate, not current, or incomplete, or we have reasonable grounds to suspect your information is untrue, inaccurate, not current, or incomplete, we may suspend or terminate your account. You are entirely responsible for maintaining the confidentiality of any passwords and any usage and activities that occur in connection with your account. You agree not to allow others to access your account or utilize your password.  Doing so will compromise the security of your account.

4. No Included Maintenance and Support. Intrivo may deploy changes, updates, or enhancements to the Application at any time. Intrivo may provide maintenance and support for the Application, but has no obligation whatsoever to furnish such services to you and may terminate such services at any time without notice. You acknowledge that neither Apple (for iOS Mobile App) nor Google (for Android Mobile App) or any other third party, has an obligation to furnish any maintenance or support services in connection with the Application.

5. Online Services Associated with the Application. The Application may be used to access certain online services.  In some cases, you will not receive a separate notice when the Application connects to those services.  Using the Application constitutes your consent to the transmission of standard device information (including, but not limited to, technical information about your device, system, and application software) to those services.  Your use of those services may be governed by additional terms and conditions.  Using the online services will constitute your acceptance of and agreement to be bound by those additional terms and conditions, if any.  You may not use any online services in any way that could harm those services, disrupt their operation, or impair any other user’s use of those services or the wireless network through which they are accessed.  You may not use the online services to gain unauthorized access to or use of any service, data, account, or network by any means.

6. IP and Feedback. The Application is licensed, not sold. Intrivo and its licensors retain all right, title and interest in and to the Application, and all intellectual property rights therein, including any updates and improvements, copies, translations, adaptations, modifications, derivations and enhancements of the Application. Except for the rights and licenses as set forth in this Agreement, Intrivo does not grant or transfer to you any right, title or interest in or to the Application by implication, estoppel or otherwise. Intrivo, the Intrivo logo and all service names contained in the Application are the trademarks of Intrivo and its affiliates. You may provide suggestions, comments or other feedback (collectively, "Feedback”) regarding our products and services, including the Application. Feedback is voluntary.  We may use Feedback for any purpose without obligation of any kind.  To the extent a license is required under your intellectual property rights to make use of the Feedback, you grant us an irrevocable, world-wide, non-exclusive, perpetual, fully-paid-up, royalty-free license to use the Feedback in connection with our business, including the enhancement of the Application and the provision of products and services to our customers.

7. Termination. This Agreement and license will automatically terminate in the event you breach any term in this Agreement or in the Terms.  In the event of a claim of intellectual property infringement by any third party relating to the Application, we may immediately terminate this Agreement.

8. In-App Purchases. You may elect to purchase additional features or functionality for the Application through in-app purchases.  You agree to pay all fees associated with purchases made through the Application. All fees are non-refundable, non-cancellable. To be able to pay for such products or services, you must supply certain information relevant to your transaction, including, without limitation, your credit or debit card number, the expiration date of your credit or debit card, the name on your credit or debit card, and/or your billing address. YOU REPRESENT AND WARRANT THAT YOU HAVE THE LEGAL RIGHT TO USE ANY CREDIT OR DEBIT CARD OR OTHER PAYMENT METHOD UTILIZED IN CONNECTION WITH ANY TRANSACTION.”

9. Privacy. For more information on our privacy practices and to review our Privacy Statement please visit <a href="https://intrivo.com/privacy-policy/">https://intrivo.com/privacy-policy/</a>.

10. Location-Enabled Features. Certain location-enabled functionality made available in the Application is provided by Google Inc., Apple Inc., and/or other third party providers.  Your use of that functionality may be subject to additional terms and conditions (as updated from time-to-time): <a href="http://www.google.com/intl/en-US_US/help/terms_maps.html">http://www.google.com/intl/en-US_US/help/terms_maps.html</a> and <a href="https://www.apple.com/legal/internet-services/maps/terms-en.html">https://www.apple.com/legal/internet-services/maps/terms-en.html</a>.   You must exercise your own judgment as to the adequacy and appropriateness of the information.  All location-based information is provided entirely “as-is,” without warranties of any kind.

11. Application Support; Functionality. All questions and requests relating to Application support must be directed to us at the contact address below.  The Third Parties, as defined in Section 15, are not responsible for providing support for the Application and may not be contacted for support.  We may change or remove functionality and other features of the Application at any time, without notice.

12. Your Warranties. You represent and warrant that (i) you are not located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a “terrorist supporting” country; and (ii) you are not listed on any U.S. Government list of prohibited or restricted parties. You will not use the Application if any applicable laws in your country prohibit you from doing so in
accordance with these terms.

13. Warranty Disclaimer; Refund. THE APPLICATION IS PROVIDED ON AN “AS AVAILABLE,” “AS IS” BASIS.  TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE AND OUR SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES WITH RESPECT TO THE APPLICATION, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF NON-INFRINGEMENT, TITLE, MERCHANTABILITY, QUITE ENJOYMENT, QUALITY OF INFORMATION, AND FITNESS FOR A PARTICULAR PURPOSE.  WE AND OUR SUPPLIERS AND LICENSORS DO NOT WARRANT THAT THE  APPLICATION WILL MEET YOUR REQUIREMENTS, OR THAT THE OPERATION OF THE APPLICATION WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT DEFECTS IN THE APPLICATION WILL BE CORRECTED.  In the event of any failure of the Application to operate in material accordance with  its then current documentation, you may notify the app store provider, and, subject to the app store provider’s then current policies and terms, they will refund the purchase price, if any, paid for the Application to you; and that, to the maximum extent permitted by applicable law, the app store provider will have no other obligation whatsoever with respect to the Application, and any other claims, losses, liabilities, damages, costs or expenses attributable to any failure of the Application to operate in material accordance with its then current documentation will be governed by the terms of this Agreement.

14. Modified Devices and Operating Systems. We have no liability for errors, unreliable operation, or other issues resulting from use of the Application on or in connection with rooted or jail broken devices or use on any mobile device that is not in conformance with the manufacturer’s original specifications, including use of modified versions of the operating system (collectively, “Modified Devices”).  Use of the Application on Modified Devices will be at your sole and exclusive risk and liability.

15. No Liability for Third Parties, App Stores, Wireless Carriers. Your wireless carrier, the manufacturer and retailer of your mobile device, the developer of the operating system for your mobile device, the operator of any application store, marketplace, or similar service through which you obtain the Application, Apple Inc., Google LLC, and their respective affiliates, suppliers, and licensors (collectively, the “Third Parties”) are not parties to this Agreement and they do not own and are not responsible for the Application, including, but not limited to claims for: (i) product liability; (ii) any claim that the Application fails to conform to any applicable legal or regulatory requirement; and (iii) claims arising under consumer protection, privacy, or similar legislation.  You are responsible for complying with all application store and other applicable Third Party terms and conditions.  YOU AGREE (I) THE THIRD PARTIES DISCLAIM ALL WARRANTIES, EXPRESS AND IMPLIED, WITH RESPECT TO THE APPLICATION, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF NON-INFRINGEMENT, TITLE, MERCHANTABILITY, QUIET ENJOYMENT, QUALITY OF INFORMATION, AND FITNESS FOR A PARTICULAR PURPOSE; (II) IN NO EVENT WILL THE THIRD PARTIES BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, PUNITIVE, EXEMPLARY, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES (WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE) ARISING OUT OF THIS AGREEMENT OR THE APPLICATION, EVEN IF THEY HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES OR LOSSES; (III) IN ANY EVENT, THE MAXIMUM LIABILITY OF ANY THIRD PARTY FOR ALL CLAIMS (WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE) OF EVERY KIND WILL IN NOT EXCEED FIVE DOLLARS ($5.00); AND (IV) YOU WAIVE ANY AND ALL CLAIMS, NOW KNOWN OR LATER DISCOVERED, THAT YOU MAY HAVE AGAINST THE THIRD PARTIES ARISING OUT OF THE APPLICATION AND THIS AGREEMENT.  THE THIRD PARTIES ARE INTENDED THIRD PARTY BENEFICIARIES OF THIS AGREEMENT, CAPABLE OF DIRECTLY ENFORCING ITS TERMS.  NOTHING CONTAINED IN THIS AGREEMENT WILL BE CONSTRUED AS MODIFYING OR AMENDING ANY AGREEMENTS OR OTHER TERMS BETWEEN YOU AND THE THIRD PARTIES WITH REGARD TO THEIR SUBJECT MATTER.  In the event of any claim that the Application or your possession and use of the Application infringes a third party’s intellectual property rights, the Third Parties are not responsible for the investigation, defense, settlement, or discharge of the infringement claim.

16. Limitation Of Liability. TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL WE OR OUR SUPPLIERS AND LICENSORS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, PUNITIVE, OR INDIRECT DAMAGES (WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE), WHICH INCLUDE, WITHOUT LIMITATION, DAMAGES FOR PERSONAL INJURY, LOST PROFITS, LOST DATA AND BUSINESS INTERRUPTION, ARISING OUT OF THE USE OR INABILITY TO USE THE APPLICATION, EVEN IF THEY HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.  WITHOUT LIMITING THE FOREGOING, OUR ENTIRE LIABILITY AND THAT OF OUR SUPPLIERS AND LICENSORS UNDER THIS AGREEMENT FOR ALL DAMAGES, LOSSES, AND CAUSES OF ACTION (WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE) WITH RESPECT TO YOUR USE OF THE APPLICATION IS LIMITED  FIFTY DOLLARS ($50.00).
OUR SUPPLIERS AND LICENSORS ARE THIRD PARTY BENEFICIARIES OF THIS AGREEMENT, CAPABLE OF DIRECTLY ENFORCING THIS AGREEMENT AGAINST YOU AS A THIRD PARTY BENEFICIARY.  YOU WAIVE ANY AND ALL CLAIMS, NOW KNOWN OR LATER DISCOVERED, THAT YOU MAY HAVE AGAINST OUR SUPPLIERS AND LICENSORS ARISING OUT OF THE LICENSE OF THE APPLICATION AND ITS MARKETING, YOUR USE OF THE APPLICATION, AND THIS AGREEMENT.  YOUR SOLE AND EXCLUSIVE REMEDIES ARE AGAINST US AND SUBJECT TO THE PROVISIONS OF THIS AGREEMENT.
Some states do not allow the exclusion of incidental or consequential damages, or the limitation on how long an implied warranty lasts, so some of the above may not apply to you.

17. Social Media and Other Third Party Services and Materials. The Application may be used to access and use certain third party services (e.g., Twitter, Facebook, Dropbox, etc.) and may display, include, or make available third-party content (including data, information, applications, and other products, services, and/or materials) or provide links to third-party websites, including through third-party advertising ("Third-Party Materials").  You acknowledge and agree that Company is not responsible for Third-Party Materials, including their accuracy, completeness, timeliness, validity, copyright compliance, legality, decency, quality, or any other aspect thereof. Company does not assume and will not have any liability or responsibility to you or any other person or entity for any Third-Party Materials. Third-Party Materials and links thereto are provided solely as a convenience to you, and you access and use them entirely at your own risk and subject to such third parties' terms and conditions. In addition to the terms of this Agreement, your use of those Third Party Materials will be subject to the applicable third party service’s terms and conditions, including their privacy policies.  You are responsible for reviewing and accepting those terms prior to transferring or posting any information to their services.  You understand and agree that those Third Party Materials are not provided by our agents and that we have no responsibility or liability for them.  All Third Party Materials are provided as-is and as-available, without warranties of any kind.

18. Your Indemnity. You will indemnify, defend, and hold us and our suppliers and licensors and the Third Parties harmless from and against all damages, liabilities, costs, fines, sanctions, and expenses, including attorneys’ fees, arising out of or related to your breach of this Agreement or the Terms.

19. Export and Import Restrictions.
You will comply with all U.S. or other applicable export control laws regarding the export of items, software or technology including ensuring that: (a) no equipment, technical data, or Application is exported or reexported to any country, person or entity in violation of any U.S. or other applicable export controls or sanctions;
and/or (b) that anything received from Intrivo is not used or re-exported for a prohibited use under U.S. or other applicable export control laws.

20. Government Restrictions. Any software or other programming provided by us in connection with this Agreement is commercial computer software as described in DFARS 252.227-7014(a)(1) and FAR 2.101.  If acquired by or on behalf of the United States Department of Defense or any component thereof, the United States Government acquires this commercial computer software and commercial computer software documentation subject to the terms of this Agreement as specified in DFARS 227.7202-3, Rights in Commercial Computer Software or Commercial Computer Software Documentation.  If acquired by or on behalf of any civilian agency, the United States Government acquires this commercial computer software and commercial computer software documentation subject to the terms of this Agreement as specified in FAR 12.212, Computer Software.

21. General. This Agreement will be construed, interpreted, and performed exclusively according to the laws of the State of California, United States of America, without giving effect to any principles of conflicts of law.  Any action at law or in equity arising out of or directly or indirectly relating to this Agreement may be instituted only in the Federal or state courts located in Los Angeles, California. You and we consent and submit to the personal jurisdiction of those courts for the purposes of any action related to this Agreement, and to extra-territorial service of process. You agree that regardless of any statute or law to the contrary, any claim or cause of action that you may have arising out of or related to this Agreement must be filed within one (1) year after the claim or cause of action arose.  This Agreement constitutes the entire understanding and agreement between us and you with respect to the transactions contemplated in this Agreement and supersedes all prior or contemporaneous oral or written communications with respect to the subject matter of this Agreement, all of which are merged in this Agreement.  We reserve the right to modify this EULA at any time and for any reason. Intrivo will post the most current version of this EULA at https://www.letsongo.com/end-user-license-agreement. If Intrivo makes material changes to this EULA, you will receive notification as required by law..  In the event any provision of this Agreement is found invalid or unenforceable pursuant to judicial decree, the remainder of this Agreement will remain valid and enforceable according to its terms.  Any failure by us to strictly enforce any provision of this Agreement will not operate as a waiver of that provision or any subsequent breach of that provision.  The disclaimers and limitations of liability and your indemnity will survive any termination or expiration of this Agreement.  This Agreement may be accepted in electronic form (e.g., by an electronic or other means of demonstrating assent) and your acceptance will be deemed binding between you and us. Neither you nor we will contest the validity or enforceability of this Agreement, including under any applicable statute of frauds, because it was accepted or signed in electronic form. Electronically maintained records when produced in hard copy form shall constitute business records and shall have the same validity as any other generally recognized business records.  IT IS EXPRESSLY UNDERSTOOD AND AGREED THAT IN THE EVENT ANY REMEDY HEREUNDER IS DETERMINED TO HAVE FAILED OF ITS ESSENTIAL PURPOSE, ALL LIMITATIONS OF LIABILITY AND EXCLUSIONS OF DAMAGES WILL REMAIN IN EFFECT.

22. Arbitration. In the event, the parties are not able to resolve any dispute between them arising out of or concerning this Agreement, or any provisions hereof, whether in contract, tort, or otherwise at law or in equity for damages or any other relief, then such dispute shall be resolved only by final and binding arbitration pursuant to the Federal Arbitration Act, conducted by a single neutral arbitrator and administered by the American Arbitration Association, or a similar arbitration service selected by the parties, in a location mutually agreed upon by the parties. The arbitrator’s award shall be final, and judgment may be entered upon it in any court having jurisdiction. In the event that any legal or equitable action, proceeding or arbitration arises out of or concerns this Agreement, the prevailing party shall be entitled to recover its costs and reasonable attorney’s fees. The parties agree to arbitrate all disputes and claims in regards to this Agreement or any disputes arising as a result of this Agreement, whether directly or indirectly, including Tort claims that are a result of this Agreement. The parties agree that the Federal Arbitration Act governs the interpretation and enforcement of this provision. The entire dispute, including the scope and enforceability of this arbitration provision shall be determined by the Arbitrator. This arbitration provision shall survive the termination of these this Agreement.

23. Class Action Waiver. Any arbitration under this Agreement will take place on an individual basis; class arbitrations and class/representative/collective actions are not permitted. THE PARTIES AGREE THAT A PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN EACH’S INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN MY PUTATIVE CLASS, COLLECTIVE AND/ OR REPRESENTATIVE PROCEEDING, SUCH AS IN THE FORM OF A PRIVATE ATTORNEY GENERAL ACTION AGAINST THE OTHER. Further, unless both you and Intrivo agree otherwise, the arbitrator may not consolidate more than one person’s claims, and may not otherwise preside over any form of a representative or class proceeding.

The app is protected by reCAPTCHA and the <a href="https://www.google.com/intl/en/policies/privacy/">Google Privacy Policy</a> and <a href="https://www.google.com/intl/en/policies/terms/">Terms of Service</a> apply`,
      },
      // 6: {
      //   title: "Disclaimer",
      //   subtitle:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget congue tellus. Donec nec elementum orci, commodo tempor augue. Suspendisse et risus quis velit tempor efficitur. Donec id magna ac risus cursus luctus eget nec eros. Morbi suscipit a orci ut semper. In hac habitasse platea dictumst. Nullam in urna id neque tempus viverra in in libero. Aenean mollis dolor at lectus fermentum, non varius ante dignissim. Aenean fringilla ac diam id egestas. Vivamus magna risus, tristique at dignissim non, euismod ac ex. Duis varius gravida lacus, et pellentesque nisi dapibus quis. Donec in elit in ex ornare pretium.",
      // },
      6: {
        title: 'Enter the postal code',
        title2: 'where you currently live',
        subtitle: 'Please enter a valid postal (zip) code',
        placeholderZip: 'Enter postal (zip) code',
      },
      7: {
        optional: 'Optional',
        title: 'Tell us a bit about yourself',
        subtitle: 'Please enter your basic info',
        infoDisclosureCTA: 'Learn about why we ask for this info',
        infoDisclosureDescription1:
          'At Intrivo we treat your information as though it were our own. We don’t sell it, it simply helps us provide you with a better experience.\n\n',
        infoDisclosureDescription2:
          'Here is more detail on how your information will be used...\n\n',
        infoDisclosureDescription3: `We ask for an email address to create your account, and your phone number to keep your information and account extra secure (after all, the app will be storing your test and vaccine records!).

We also ask for your first and last name to make sure your records are clearly marked as yours, and your birthday to help us further customize your experience when testing. For example, testing for children is slightly different to testing for adults.`,
      },
      8: {
        1: {
          title: 'Do you plan to test any dependents?',
        },
        2: {
          title: 'Tell us about your first dependent',
          subtitle: 'Please enter their info below',
        },
      },
    },
    zip: {
      Title: 'Please indicate the ZIP code of your current location.',
      Placeholder: 'Enter Zip Code',
      Error: 'ERROR: Invalid Zip Code',
    },
    selectSymptoms: {
      Title: 'Please select ALL symptoms you have had.',
      Subtitle: 'Please select all that apply.',
      Options: {
        1: 'Fever over 100.4F/38C or chills',
        2: 'Cough',
        3: 'Shortness of breath or difficulty breathing',
        4: 'Fatigue',
        5: 'Muscle or body aches',
        6: 'Headache',
        7: 'New loss of taste or smell',
        8: 'Sore throat',
        9: 'Congestion or runny nose',
        10: 'Diarrhea',
        11: 'None of the above',
      },
    },
    anySymptoms: {
      Title: 'Have you had any of the following symptoms?',
      Options: {
        1: 'Fever over 100.4F/38C or chills',
        2: 'Cough',
        3: 'Shortness of breath or difficulty breathing',
        4: 'Fatigue',
        5: 'Muscle or body aches',
        6: 'Headache',
        7: 'New loss of taste or smell',
        8: 'Sore throat',
        9: 'Congestion or runny nose',
        10: 'Diarrhea',
        11: 'None of the above',
      },
    },
    dateSymptoms: {
      Title: 'When did your symptoms first start?',
      DatePicker: 'Date Picker',
      No: 'I’m not sure',
    },
    note: {
      Title: 'Note:',
      Text: 'The clinical performance of CareStart™ COVID-19 Antigen Test was validated for the individuals suspected of COVID-19 within 5 days of symptom onset.',
    },
    biotin: {
      Title: 'Limitations for users taking Biotin (Vitamin B7) supplement:',
      Text: 'False negative results may occur in patients who have indicated or whose clinical status or history would indicate they are currently taking high doses of Biotin (> 10 mg per day).',
    },
    video: {
      Title: 'Testing Procedure Video',
      Text: 'This video will provide a complete overview of testing procedures. The Step-by-Step testing instructions will be followed next.',
      Play: 'Press Play to Begin​',
      Important: 'IMPORTANT: Do not open the box or perform the test during this video.',
    },
    steps: {
      1: {
        Title: 'Step 1:',
        Text: 'Wash your hands thoroughly.',
      },
      2: {
        Title: 'Step 2:',
        Text: 'Unpack your CareStart™ COVID-19 Antigen test components from the box.',
      },
      3: {
        Title: 'Step 3:',
        Text: 'Remove the test cassette and place it on a flat, clean surface.',
      },
      4: {
        Title: 'Step 4:',
        Text: 'Locate the extraction vial and gently peel off the aluminum foil seal, being sure to keep the vial upright and place it in the provided rack.',
      },
      5: {
        Title: 'Step 5:',
        Text: 'Locate a nasal swab and remove from the pouch. Be careful not to touch the swab tip.',
      },
      6: {
        Title: 'Step 6:',
        Text1: 'Gently insert the swab no more than ¾ inch into the',
        BoldText: ' LEFT ',
        Text2:
          'nostril. Then, slowly rotate the swab at least 5 times in a circular path for a total of 15 seconds.',
        Text3: 'If you have questions, see the ',
      },
      7: {
        Title: 'Step 7:',
        Text1: 'Gently remove the swab from the',
        BoldText1: ' LEFT ',
        Text2: 'nostril and place directly into the',
        BoldText2: ' RIGHT ',
        Text3:
          'nostril, repeating the process of rotating at least 5 times in a circular path for a total of 15 seconds. Remove the swab from the',
        BoldText3: ' RIGHT ',
        Text4: 'nostril.',
      },
      8: {
        Title: 'Step 8:',
        Text: 'Place the swab into the extraction vial. Rotate the swab vigorously at least 5 times.',
      },
      9: {
        Title: 'Step 9:',
        Text: 'Remove the swab by rotating against the extraction vial while squeezing the sides of the vial to release the liquid from the swab.',
        Text2: 'Discard the swab in trash.',
      },
      10: {
        Title: 'Step 10:',
        Text: 'Close the vial by pushing the cap firmly onto the vial.',
      },
      11: {
        Title: 'Step 11:',
        Text: 'With your finger, mix thoroughly by flicking the bottom of the vial.',
      },
      12: {
        Title: 'Step 12:',
        Text1:
          'Invert the extraction vial and hold the sample vertically above the sample well. Squeeze the vial gently. Allow ',
        BoldText: 'THREE (3)',
        Text2: 'drops of sample to fall into the sample well.',
        TextRed: 'Click the button below as soon as the sample is added.',
        Button: 'Click Here After Applying Sample',
      },
    },
    timer: {
      Title1: 'The test is doing its job!',
      Text1: 'The test will be ready to read when the timer completes.',
      Remaining: 'Remaining',
      Button1: 'Please wait…​',
      Title2: 'Result Interpretation',
      Text2:
        'Your test is now ready for interpretation. Please place your test cassette on a flat surface and make sure there is good lighting in order to take a photo.',
      Button2: 'Take photo​',
      Start: 'Start Timer',
      Complete: 'Complete!',
      Important:
        'Important: Do not move or lift the test cassette during this time. Do not exit the app during this process.',
    },
    scanner: {
      IPosition: 'Position the device within the marked area.',
      IFocus: 'Make sure that it is in focus and properly oriented.',
      ICapture: 'When you are ready, press the camera button to capture the image.',
      IReady: 'Go ahead!',
      IRetry1: 'Image not accepted!\rLet’s try again.',
      IRetry2: 'Image not accepted!\rLet’s try one more time.',
      Text: '',
      AlertTitle: 'Info',
      AlertText:
        'In good lighting, line up the test device within the outline provided. Make sure the barcode is within the top window and the test area is fully within the bottom window. Allow the camera to focus and press the button.',
    },
    questions: {
      redLine: {
        Text: 'Confirm result',
        Title1: 'Is there a',
        Red: ' RED ',
        Or: 'or',
        Pink: ' PINK ',
        Title2: 'line next to ‘C’ on the test?',
        Options: {
          1: 'YES – there is RED/PINK line​',
          2: 'NO – I don’t see this line.',
        },
        alert: {
          Title: '',
          Text1: 'Are you certain there is NO red line next to ‘C’ on the test?',
          Text2: 'Are you certain there is a red line next to ‘C’ on the test?',
        },
      },
      blueLine: {
        Text: 'Confirm result',
        Title1: 'Is there a',
        Blue: ' BLUE ',
        Title2: 'line next to ‘T’ on the test?',
        Options: {
          1: 'YES – there is BLUE line',
          2: 'NO – I don’t see this line.',
        },
      },
      certenBlue: {
        Subtext: 'Are you sure',
        Title1: 'Are you certain there is a',
        Blue: ' BLUE ',
        Title2: 'line next to ‘T’ on the test?',
        Text: 'Similar to what appears in any of the images below, even if very faint?​',
        Options: {
          1: 'YES – there is BLUE line​',
          2: 'NO – I don’t see this line.',
        },
      },
    },
    testResult: {
      Title1: 'Test Complete',
      Title2: 'Test result',
      Text3:
        'You have completed your test.Please dispose used test device and other components into the trash.',
      Text4: 'Dispose used test device and other components into the trash.',
      Detected: {
        Status: 'Positive',
        Title: 'COVID-19 Detected',
        Subtitle: 'Your test has been successfully interpreted. Your result is',
        Text: 'CDC Guidelines: ',
        1: 'Stay home.',
        2: 'Isolate yourself from others.',
        3: 'Contact your Healthcare provider to determine the best treatment plan for you.',
      },
      NotDetected: {
        Status: 'Negative',
        Title: 'COVID-19 Not Detected',
        Subtitle: 'Your test has been successfully interpreted. Your result is',
        Text: 'CDC Guidelines: Wear a mask that covers your nose and mouth. Stay 6 feet apart from others. Avoid crowds. Wash your hands often. Avoid poorly ventilated indoor spaces.',
      },
      Invalid: {
        Status: 'Invalid',
        Title: 'Test Invalid',
        Text: 'Re-test with COVID-19 tests may be needed.',
        Text2: 'CDC Guidelines: ',
        1: 'Wear a mask that covers your nose and mouth.',
        2: 'Stay 6 feet apart from others.',
        3: 'Avoid crowds.',
        4: 'Wash your hands often.',
        5: 'Avoid poorly ventilated indoor spaces.',
        Text3: 'Read more at ',
        Sorry:
          'Sorry – The time to take a picture of test cartridge has expired. Please restart the process.',
      },
    },
    seeResult: {
      Title: 'See result',
    },
    anthem: {
      Title: 'Data sharing consent',
      Description:
        'By scanning the QR code on your 2-test CareStart test kit box, you acknowledge that the tests are provided for the use of the named Anthem member only and that the test results that you report on the app will be shared with Anthem.  As noted in the insert included with the test kit, after use of the first test, please save the test kit box so that you can scan the QR code again when using the second provided test. The Notice of Privacy Policy contained in this app describes how your protected health information may be used or disclosed for purposes that are permitted or required by law.',
      Button: 'Next',
    },
    forgetPassword: {
      title: 'Enter the email address\nyou used to sign up',
      textDescription: 'We will send a verification code to the email',
      placeholder: 'Email address',
      button: 'Continue',
    },
    resetPassword: {
      enterCode: 'Enter the 6 digit code we sent to your mobile phone',
      enterEmailCode: 'Enter the 6 digit code we sent to your email',
      enterEmailCodeSubtitle: `Enter the code sent to {{email}}`,
      enterCodeSubtitle: `Enter the code sent to {{phone}}`,
      needHelp: 'Having trouble?',
      emailUs: 'Get help',
      resend: 'Resend code',
      supportMailSubject: 'Help with OnGo App forgot password code',
      code: 'Verification code',
      supportMailBody:
        "I'm having trouble receiving the two factor code sent to my mobile phone, while trying to rest my password. Here are my specifics to help with troubleshooting: ",
    },
    cameraPermission: {
      header: 'Camera access',
      title: 'Allow access to your camera to continue.',
      testProcess:
        'Test Process - This app uses the camera to take photos of the test cassete, capture documents, and participate in live sessions.',
      vaccineCard:
        'Vaccine Card - This app uses the camera to take photos of a vaccine card, capture documents, and participate in live sessions.',
      liveChat:
        'Live Chat - This app uses the camera to provide live face to face support with a medical expert.',
      button: 'Continue',
    },
    alertMessage: {
      // temporary text may need to be changed
      removeVaccinationCard: 'Do you agree to the removal of the vaccination card?',
    },
    organizationInvite: {
      subTitle: '{{name}} would like you to join their organization',
      sharingSubtitle:
        'By accepting this invitation you agree to share COVID-19 test data with {{name}}',
      cancelButton: 'No thanks',
      submitButton: 'Continue',
      leaveTitle: 'Leave organization',
      leaveSubtitle: 'Are you sure. You will lose access to all their routines?',
      leaveCancel: 'NO',
      leaveSubmit: 'YES',
    },
    updateConsent: {
      title: 'We’ve updated our terms. Please accept to proceed.',
    },
    organizationConsent: {
      title: 'Vaccination Information\nDisclaimer and Consent',
      consent: `By clicking below and uploading my proof of COVID-19 vaccination, or confirmation that I am not vaccinated against COVID-19 (collectively “Data”), into the On/Go app, I acknowledge and agree that I am voluntarily providing my proof of COVID-19 vaccination or confirmation that I am not vaccinated against COVID-19 (“Vaccination Status”) and other information including name, email address, postal address and phone number to United Rentals (“UR”) and Intrivo Diagnostics, Inc. (“Intrivo”) and I expressly consent to UR’s and Intrivo’s collection, storage, use and transfer of my Vaccination Status as set out below.

  If I am not vaccinated against COVID-19, I hereby further authorize UR and Intrivo to collect, store, use and transfer my Vaccination Status, and COVID-19 test results, if applicable (collectively, “Health Information”) to each other and states/counties/provinces/ authorities (if applicable) as required by law.

  I acknowledge and agree that the purpose of UR’s collection, storage, use and transfer of my Health Information is to permit UR to:

  a.) prevent or lessen the serious and imminent threat that COVID-19 presents to the health and safety of UR’s employees, contractors, visitors and the community at large;

  b.) help facilitate COVID-related information or other benefits (e.g. sick leave, medical benefits, disability benefits, etc.), to the extent permitted by law; and,

  c.) confirm individuals are vaccinated to comply with UR’s legal obligations (collectively the “UR Purposes”).

  I acknowledge and agree that the purpose of Intrivo’s collection, storage and transfer of my Health Information is to facilitate UR’s collection of the Health Information for the UR Purposes.

  I understand and agree that UR may disclose my Health Information to designated members of UR’s HR, Legal and Corporate Safety teams as necessary to know, administer, or use the information for the UR Purposes and I hereby voluntarily provide my consent for UR to do so.

  UR and Intrivo will take appropriate technical and organizational security measures to protect my Health Information from loss, misuse, unauthorized access, and disclosure and will restrict access to those who need to know, administer, or use that information.

  Further, I understand and agree that my Health Information will be stored in the United States and, as such, will be subject to laws applicable in the United States, including any law permitting or requiring disclosure of the information to the government, government agencies, courts and law enforcement in that jurisdiction.

  I understand that I may have a right to request access and rectification of my Health Information under applicable law and I may exercise these rights by contacting privacy@ur.com.

  I understand that my consent is voluntary. However, if I do not consent, UR will consider me to be unvaccinated unless I make alternate arrangements to provide my Vaccination Status with UR HR, and I will not be eligible to utilize Intrivo’s testing program. I understand that I may revoke my consent at any time for any reason and have a right to a copy of this authorization.`,
      acceptShowResult:
        'By accepting this invitation you agree to share COVID-19 test results data with',
      acceptHideResult:
        'By accepting this invitation you agree to share COVID-19 test completion status with',
    },
    updateVaccineStatus: {
      title: 'Tell us about your\nvaccination status',
      vaccinated: 'I am vaccinated',
      partiallyVaccinated: 'I am partially vaccinated',
      notVaccinated: 'I am NOT vaccinated',
      dontShare: 'I do not wish to share',
      statusSaved: 'Vaccine status saved',
    },
    event: {
      share: 'Share event to invite guests',
      eventCode: {
        title: 'Enter code',
        subtitle: 'This includes invite, discount and purchase codes',
        enter: 'Please enter your code',
        button: 'Next',
        successMessage: 'Great, we found your Sniffles activation code!',
      },
      dependentList: {
        title: 'Choose user',
        subtitle: 'Who is this for?',
      },
      emptyEvent: {
        title: '2Gather Events',
        subtitle:
          'Peace of mind for friends, families and colleagues through our easy testing solution.',
        steps: {
          1: 'Host creates an event ',
          2: 'Guest join and share they’ve tested',
          3: 'Everyone feels good event',
        },
      },
      eventsList: {
        title: 'Events',
        newEvent: 'Create or join',
        host: 'EVENTS HOSTED BY YOU',
        guest: 'EVENTS YOU ARE INVITED TO',
      },
      eventInfo: {
        date: 'Date',
        time: 'Event time',
        host: 'Host',
        tabEventInfo: 'Event info',
        tabEventMembers: 'Guests',
        tested: 'Test completed on time',
        notTested: 'Not yet tested',
        shareEvent: 'Share event with guests',
        joinEvent: 'Yes, join event',
        back: 'Back to events',
        deleteEvent: 'Delete event',
        leaveEvent: 'Leave event',
        deleteAlertTitle: 'Delete event',
        deleteAlertSubtitle:
          'Are you sure you want to delete your event? You will no longer have access to the event details.',
        deleteAlertConfirm: 'YES',
        deleteAlertCancel: 'NO',
        cancel: 'Cancel',
        inviteTitle: 'Invite Templates',
        leaveTitle: 'Leave event',
        leaveSubtitle: 'Are you sure you want to leave the event?',
        inviteText:
          'Hi,\n\nIn preparation for the {{description}} event on {{date}} at {{time}}, I’d like to invite you to take a COVID-19 test within {{testTime}} hours of the event. Here is how to get started.\n\nStep 1: Download the On/Go App at app.letsongo.com  \n\nStep 2: To join the event and get a free COVID test use the code: {{code}}  \n\nThanks in advance, \n{{user}}',
      },
      eventsType: {
        create: {
          title: 'Create new event',
          subtitle: 'Plan testing before your event',
          final: 'Event created!',
        },
        join: {
          title: 'Join existing event',
          subtitle: 'Enter an event code to join',
          final: 'You’ve joined the event!',
          info: {
            title: 'Is this the event you will be joining?',
            subtitle: `{{host}} is inviting you to complete a COVID test ahead of {{eventName}}. Select “Yes, join event” and you’ll be given access to a FREE On/Go test.

  Accepting this invitation also means that you agree to share any completed test within {{time}} hours from the start of the event (test results will not be shared, only test status).

  If you test POSITIVE for COVID-19, follow CDC guidelines and stay home.`,
          },
          joinedInfo: {
            title: 'Remember',
            subtitle: `You must complete a test within {{time}} hours before the start of this event.

  If you’ve  completed an On/Go test within the timeframe, your host will be notified.`,
            discountHost: `{{host}} has paid for your test, now we just need your shipping information. 👇`,
            discountHostNone: `Unfortunately, all free tests reserved by {{host}} are gone. You can still purchase your own test.`,
            // discountCode: `Use discount code {{discount}} in checkout.`
            discountInfo: `You must complete a test within {{time}} hours before the start of this event. If you’ve  completed an On/Go test within the timeframe, your host will be notified.`,
          },
        },
      },
      createEvent: {
        title: '2Gather Event details',
        name: 'Event name',
        date: 'Event date',
        time: 'Event time',
        save: 'Save event',
        moreTitle: 'Easy COVID testing for events',
        moreSubtitle:
          'Prior to your event, invite your guests to test with discounted On/Go tests. ',
        moreSubtitleLink: 'More Info',
        question: 'What are the details for your event?',
        button: 'Continue',
        limitTitle: 'Note: ',
        limitSubtitle: 'limit of 100 guests per event invite.',
      },
      moreInfo: {
        header: 'More info',
        title: 'Easy COVID testing for events',
        subtitle: 'Are you planning an event and would like your guests to test ahead of time?',
        stepTitle: 'It’s easy. Here is how it works.',
        steps: {
          1: 'Create event and buy tests for your \nguests at a discount',
          2: 'Invite guests to join and receive \ntheir test at home',
          3: 'Check your guests have tested before your event',
        },
        footer: 'Everyone feels good gathering!',
        button: 'Back to event details',
      },
      payment: {
        edit: 'Edit',
        discount: 'Discount',
        standard: 'Includes standard shipping',
        button: 'Confirm payment',
        test: 'test(s)',
      },
      quantity: {
        header: 'Test quantity',
        question: 'How many guests will need tests?',
        estimated: 'estimated total \nincluding shipping',
        button: 'Continue to payment',
        limit: 'limit: 100 guests',
        limitError: 'Limit per invite is 100',
      },
    },
    bulkTesting: {
      cta: {
        title: 'On-site testing',
        subTitle: 'Test your {{userType}}',
      },
      groups: {
        title: 'Select group',
      },
      employees: {
        title: 'On-site testing',
        searchPlaceholder: 'Search {{userType}}',
        addEmployee: '+ Add new {{userType}}',
        incomplete: 'Incomplete',
        complete: 'Complete',
        pending: 'PENDING',
        fail: 'Routine failed',
        dueNow: '| Due now',
        nextDue: '| Next due',
        notTested: 'Not yet tested',
        lastTested: 'Last tested on ',
      },
      addEmployee: {
        title: 'Add new {{userType}}',
        firstName: 'First name',
        lastName: 'Last name',
        employeeId: '{{userType}} Id',
        email: 'Email address (optional)',
        phone: 'Phone number (optional)',
        group: 'Assign to group',
        invite: 'Send invite',
        save: 'Add',
        saved: 'New {{userType}} saved!',
      },
      employeeDetail: {
        empty: 'No activity available.',
        lastTested: 'LAST TESTED ON:',
        nextTesting: 'NEXT TESTING DUE:',
        recordTest: '+ Record test',
        negative: 'Negative',
        positive: 'Positive',
        invalid: 'Invalid',
      },
      selectTest: {
        title: 'Select test result',
        invalidWarning: '{{userType}} will be required to test again',
        button: 'Record result',
        modal: 'Result saved!',
      },
      schoolDetail: {
        title: 'Choose user’s group',
        selectGroupPlaceholder: 'Select group',
        submitButton: 'Add user',
        saved: 'User added to {{schoolName}}’s {{groupName}}',
      },
    },
    disclosureScreen: {
      title: 'Before we begin...',
      description:
        'Our Care Guides can help you navigate COVID-19 resources, but they’re not medical professionals. They are not able to diagnose or treat medical conditions. Please consult your doctor or pharmacist for any health related questions or before starting any treatment, including over-the-counter medications.\n\nIf you’re experiencing a life-threatening emergency, please call 911 right away.',
      buttonContinue: 'Continue',
      buttonNoThanks: 'No thanks',
    },
    careSolutions: {
      loader: {
        findingGuide: {
          title: 'Finding next available Care Guide',
          description: 'Things you may want to ask...',
          questions: [
            'How do I keep my family safe?',
            'How to schedule a doctor’s visit today?',
            'How to make quarintine fun',
            'What should I do if I test positive for Covid-19?',
            'What are the current CDC isolation and quarantine guidelines?',
            'Or how long should I isolate for?',
          ],
        },
        findingFailure: {
          title: 'Sorry, we are currently helping others',
          description: 'Please try again later',
        },
      },
      list: {
        title: 'Care Solutions',
        browseByCondition: 'Browse by condition',
        browseByService: 'Browse by service',
        otherServices: 'Other services',
      },
    },
    store: {
      title: 'Store',
      addToCart: 'Add to cart',
      added: 'Added',
      top: 'TOP',
      exploreOther: 'Explore other products',
      learn: 'Learn more',
      startingAt: 'starting at',
      test: 'test',
    },
    cart: {
      title: 'Cart',
      orderSummary: 'Order summary',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      estimatedTax: 'Estimated tax',
      coupon: 'Coupon',
      total: 'Total',
      estimatedTotal: 'Estimated total',
      proceedCheckout: 'Proceed to checkout',
      free: 'FREE',
      promocodePlaceholder: 'Enter promo code',
      emptyCart: {
        title: 'Your cart is empty',
        startShopping: 'Start shopping',
        otherProductTitle: 'On/Go COVID-19 Self-Test',
        otherProductDescription:
          'COVID-19 self-test with two tests per box, offering results in just 10 minutes.',
      },
    },
    checkout: {
      title: 'Checkout',
      shipping: 'Shipping',
      payment: 'Payment',
      review: 'Review',
      shippingMethod: 'Shipping method',
      standardShipping: 'Standard shipping',
      expeditedDayShipping: 'Expedited {{day}}-day shipping',
      fedExOvernight: 'FedEx overnight',
      continuePayment: 'Continue to payment',
      continueReview: 'Continue to review',
      billingInformation: 'Billing information',
      phoneToolTip: 'Just in case we need to contact you about your order',
      shippingInformation: 'Shipping information',
      contactInformation: 'Contact Information',
      edit: 'Edit',
      cvvToolTip:
        '3 digit security code typically found on the back of your card. For American Express cards, it is a 4 digit code on the front of the card.',
      sameAsShipping: 'Same as shipping address',
      useDifferentAddress: 'Use a different billing address',
      paymentInformation: 'Payment information',
      confirmation: 'Confirmation',
      backToHome: 'Back to home',
      submitOrder: 'Submit order',
      thankPurchase: 'Thank you for your purchase!',
      orderConfirm:
        'Your order is confirmed. We’re now getting it ready to be shipped. We will notify you when it has been sent.',
      orderNumber: 'Order number',
      expires: 'Expires',
    },
    calendar: {
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      today: 'Today',
    },
    orderHistory: {
      title: 'Order history',
      past: 'Past',
      pending: 'Pending',
    },
    orderDetail: {
      title: 'Order details',
      placeOn: 'Placed on',
      deliveredOn: 'Delivered on',
      payment: 'Payment',
      endingOn: 'ending in',
      forSupport: 'For support with your order, please contact',
      email: 'support@letsongo.com',
      tracking: 'Tracking',
      startPrep: 'Start prepping for your upcoming testing.',
      viewChecklist: 'View checklist',
    },
    reporting: {
      title: 'Reporting',
      shareResult: 'Share results',
      shareHelp: 'Share results and help build better COVID-19 public data',
      helpBuild: 'Help build better COVID-19 public data',
      learnAbout: 'Learn about why we ask for this info',
      option1: 'Report results',
      option1Subtitle: 'Your test results and your personal info will be shared.',
      option2: 'Report results anonymously',
      option2Subtitle: 'Your test results will be shared, but your personal info will not be.',
      option3: 'Do not report results',
      option3Subtitle: 'Neither your test results nor your personal info will be shared.',
      note: 'NOTE',
      noteDescription:
        ' your selection will apply to all your tests and dependents’ tests moving forward. Update your preference in <blue>Account Settings</blue> any time.',
      content1:
        'Self-administered COVID-19 tests, like On/Go, reflect a significant shift from traditional testing in laboratories.  While results from a test like On/Go can remain private, this is your opportunity to help improve public health data on COVID-19 infections. \n\nYour options include:',
      reportResultDescription:
        'Your test result and your personal information (name, address, etc.) will be reported to your state health department, if your state has opted to receive this information.  Your state may use this information to contact you (for example, to perform contact tracing).  Your test result will also be reported anonymously to the CDC, without any information that identifies you as the person who took the test.',
      resultsAnonymouslyDescription:
        'Your test result will be reported anonymously to the CDC, without any information that identifies you as the person who took the test.  Your state health department may also receive this same information.',
      notReportResult:
        'Your test result and all other information you provide will not be shared with your state health department or with the CDC.',
      shareNote:
        'These options apply to data being shared with the government and not for On/Go’s purpose.',
      informationShared: 'See what information will be shared',
      instruction:
        'If you’d like to help improve public data further, you can also provide address, sex, race and ethnicity (optional fields)',
      instruction1: 'All fields are optional, unless marked with an *',
      instruction2: '(name will not be shared)',
      informationSaved: 'Information saved!',
    },
    pretestChecklist: {
      title: 'Pre-test checklist',
      trackYourOrder: 'Track your order',
      whatToDo: 'What to do ahead of time',
      content1: 'Drink lots of water',
      description1:
        'Drink lots of water the 24 hours before taking the test. This will make it easier to produce the necessary blood sample.',
      content2: 'Reduce finger stress',
      description2:
        'Don’t plan any physical activities for up to 8 hours after you take the test. You may experience some light finger bruising.',
      content3: 'Plan shipping ahead of time',
      description3:
        'You will want to make sure you can drop off your sample at the  post office, or schedule a pick-up within 1 hour of completing the test.',
      resources: 'Resources',
      learnVitamin: 'Learn about Vitamin D',
    },
    paxlovid: {
      intro: {
        title: 'Find out if you qualify for\n<b>FREE Covid Antiviral treatment</b>',
        newTitle: 'Sorry you tested positive for COVID, but we can help!',
        subTitle:
          'Simply answer a few questions to see if you qualify for FREE Antiviral medication ... no need to speak to a provider.',
        newDescription:
          'Pick up from your pharmacy or get it delivered to your doorstep within hours. ',
        bullets: {
          1: 'Fill out a quick form',
          2: 'Get FREE medication delivered',
          3: 'Reduce your risk of serious infection',
        },
        description:
          'If eligible, your prescription will be available for pickup or delivery from your pharmacy of choice.',
        notNow: 'Not now',
        check: 'Your road to recovery starts here',
      },
      elimanation: {
        title: 'Does any of the following apply to you?',
      },
      alternativeTreatment: {
        title: 'Seek alternative treatment',
        description:
          'Unfortunately, the Covid antiviral treatment is not appropriate for you at this time. Consider one of the following options instead.',
      },
      insurance: {
        headerTitle: 'Keeping you safe',
        title: 'Let’s confirm your identity',
        subtitle:
          'Take a picture of the front of your ID/drivers license and a picture of your face. For your protection, we want to make sure it’s you.',
        infoSubTitle:
          'Your info is safe. It will only be shared with our medical advisors to confirm your identity.',
        cardButton: 'Take a photo of ID card',
        viewIdCard: 'View front of ID card',
        selfieButton: 'Take a selfie',
        viewSelfie: 'View selfie',
        cardPickerTitle: 'How would you like to upload your ID or drivers license?',
        cardPreviewTitle: 'ID Card',
        selfiePickerTitle: 'How would you like to upload your selfie (photo of your face)?',
        selfiePreviewTitle: 'Selfie',
        cardMask: 'Front of ID card',
      },
      eligibility: {
        title: 'Eligibility form',
        formTitle: 'About you',
        subtitle: 'Find out if you qualify for treatment',
        userInfo: {
          // step1
          drugName: 'Drug name',
          drugNameValue: 'Paxlovid Antiviral',
          patientInfo: 'Your information',
          header: 'Our doctors need a little information about you',
          placeholderFirstName: 'First name',
          placeholderLastName: 'Last name',
          placeholderDob: 'Birthday',
          placeholderHeight: 'Height',
          placeholderWeight: 'Weight',
          placeholderEmail: 'Email address',
          placeholderPhone: 'Phone number',
          placeholderZipcode: 'Zip code',
          patientSymptomsHeader: 'Confirm your symptoms',
          patientSymptoms: 'Your symptoms',
          patientSymptomStart: 'Date symptoms began: ',
          patientSymptomStartPlaceholder: 'When did symptoms begin?',
          patientSymptomLastPositive: 'Date of last positive test: ',
          patientSymptomLastPositivePlaceholder: 'What is the date of your last positive test?',
          dateNotAvailable: 'N/A',
          edit: 'Edit',
          date: 'Date',
          submit: 'Next',
          tooltip:
            'Paxlovid is an oral antiviral pill that can be taken at home to help keep high-risk patients from getting a serious infection due to Covid-19.',
          tooltipContact:
            'We ask for it in case we need to get in touch to discuss your application.',
          tooltipZipcode:
            'Note: Users requesting medication in the following states will be contacted by the prescriber before authorization - DC, DE, ID, KS, NH, NJ, NM and WV',
          elibilityError: {
            title: 'Sorry, looks like you’re not eligible',
            message:
              'Based on the information provided you are not eligible for Paxlovid. Questions, reach us at <a href="tel:888-965-0301">888-965-0301</a> (ext. 5).',
          },
          noSymptom: 'No Symptoms',
        },
        boosterStatus: {
          // step 3
          title: 'Vaccination Status',
          subtitle: 'Have you received at least one COVID-19 vaccine booster?',
          yes: 'Yes',
          no: 'No',
          submit: 'Next',
        },
        riskFactorStatus: {
          // step 6
          title: 'Risk factors',
          subtitle: 'Do any of the following risk factors apply to you?',
          submit: 'Next',
          skip: 'Skip',
        },
        eligibilityCTA: 'Check eligibility for treatment',
        orderDetailsCTA: 'Check prescription order details',
        // step 3
        medicationSelect: {
          title: 'Which medication(s) are you currently taking? (over-the-counter or prescription)',
          subTitle: 'Please select all that apply',
          inputPlaceholder: 'Search',
          medications: 'Medications',
          medicationsQ:
            'From the list below, please select the medications you are currently taking',
          noneOfMeds: 'None of the medications listed',
        },
        vaccinationStatus: {
          // step 2
          title: 'Vaccination Status',
          subtitle: 'Have you been fully vaccinated for COVID-19?',
          yes: 'Yes',
          no: 'No',
          submit: 'Next',
          tooltip:
            'Fully vaccinated means you have received all doses in the primary series of the vaccine you received.',
        },
        medicationStatus: {
          // step 4
          title: 'Medications',
          subtitle: 'Do you currently take any prescription medication?',
          yes: 'Yes',
          no: 'No',
          submit: 'Next',
        },
        riskFactors: {
          // step 6
          title: 'Risk factors',
          subtitle: 'Do any of the following risk factors apply to you?',
          submit: 'Next',
          skip: 'Skip',
        },
        prescriptionDetails: {
          headerTitle: 'Prescription order details',
          approveTitle: 'Your Rx request has been',
          approveHint: 'Contact your pharmacy for status of your order.',
          rejectedTitle: 'Unfortunately, your Rx request has been',
          rejectedHint:
            'Unfortunately, you do not currently qualify for the Paxlovid treatment based on the information provided. Please refer to FDA patient eligibility checklist for more details',
          receivedTitle: 'Your Rx request has been',
          receivedHint: 'Expect to hear from us within the next 2 hours.',
          drugInfo: 'Drug info',
          pickupLocation: 'Your pickup location',
          getDirections: 'Get directions',
          support: 'Support',
          talkToDoctor: 'Talk to a doctor',
          haveQuestions: 'Have questions?',
          careSolutions: 'Care Solutions',
        },
        pharmacySelection: {
          headerSubtitle: 'Find out if you qualify for treatment',
          title: 'Choose preferred pharmacy',
          subtitle: 'Find a pharmacy near you for pick up or delivery',
          // inputPlaceholder: 'Enter city and state, or zip code',  // uncomment when search by city and state is available
          inputPlaceholder: 'Enter zip code',
          buttonTitle: 'Choose location',
        },
        genderSelect: {
          title: 'What was your sex at birth?',
          options: ['Female', 'Male', 'Rather not answer'],
        },
        pregnantSelect: {
          title: 'Are you pregnant, planning to become pregnant, or breastfeeding',
          options: [
            'Pregnant',
            'Planning to become pregnant',
            'Breastfeeding',
            'None of the above',
          ],
          periodDate: 'What was the first day of your last menstrual period?',
        },
        allergy: {
          title: 'Are you allergic to any medication? (over-the-counter or prescription)',
        },
        allergySelect: {
          title: 'Which medication(s) are you allergic to? (over-the-counter or prescription)',
        },
      },
      prescriptionDetails: {
        displayedStatusNames: {
          approved: 'Approved',
          rejected: 'Rejected',
          received: 'Received',
          pending: 'Pending',
          pendingApproval: 'Pending Approval',
        },
        orderStatus: 'Your order status',
        headerTitle: 'Prescription order details',
        description: {
          pending:
            'We are working on your request and should get back to you as soon as possible.'.concat(
              '\n\n<b>For delivery:</b> return to the app once your prescription is ready at the pharmacy.'
            ),
          approved:
            'Contact your preferred pharmacy below for status of your order. When it’s ready, you can pick it up or schedule a same day delivery.',
          received:
            'Expect to hear from us within the next 2 hours. Contact us at <a href="tel:888-965-0301">888-965-0301</a> (ext. 5) for questions.'.concat(
              '\n\n<b>For delivery:</b> return to the app once your prescription is ready at the pharmacy.'
            ),
          rejected:
            'Unfortunately, you do not currently qualify for the Paxlovid treatment based on the information provided. Please refer to <a href="https://www.fda.gov/media/158165/download">FDA patient eligibility checklist</a> for more details',
        },

        drugInfo: 'Drug fact sheet',
        note: 'Note',
        pharmacyUpdated: 'your pharmacy was updated',
        prefferedPharmacy: 'Preferred pharmacy',
        directions: 'Directions',
        scheduleDelivery: 'Schedule delivery',
        support: 'Support',
        talkToDoctor: 'Talk to a doctor',
        haveQuestions: 'Have questions?',
        careSolutions: 'Care Solutions',
      },
      terms: {
        termsTitle: 'Terms and conditions',
        next: 'Next',
      },
      review: {
        reviewTitle: 'Review',
        title: 'Did we get it all correct?',
        patientInformationTitle: 'Your information',
        name: `<b>Name:</b>`,
        birthday: `<b>Birthday:</b>`,
        email: `<b>Email address:</b>`,
        phone: `<b>Phone number:</b>`,
        height: `<b>Height:</b>`,
        weight: `<b>Weight:</b>`,
        address: `<b>Address:</b>`,
        city: `<b>City:</b>`,
        state: `<b>State:</b>`,
        gender: `<b>Gender:</b>`,
        pregnancy: `<b>Pregnancy:</b>`,
        menstrualPeriod: 'First day of last menstrual period:',
        symptomsTitle: 'Symptoms',
        dateSymptomsBegan: `<b>Date symptoms began:</b>`,
        dateLastPositive: `<b>Date of last positive test:</b>`,
        symptomsNote:
          'NOTE: if available, a picture of your last positive test cassette will also be shared as part of your eligibility check.',
        vaccinationStatusTitle: 'Vaccination status',
        medicationsTitle: 'Medications',
        allergiesMedication: 'Allergies to medication:',
        riskFactorsTitle: 'Risk factors',
        preferredPharmacyTitle: 'Preferred pharmacy',
        statusFullyVaccinatedBooster: 'Fully vaccinated with booster',
        statusFullyVaccinated: 'Fully vaccinated',
        statusNotVaccinated: 'Not vaccinated',
        none: 'None',
        submit: 'Submit',
        submitSuccess: 'Success!',
        submitSuccessDescription:
          'We are working on your order. You can expect to hear back within 2 hours.',
      },
      scheduleDelivery: {
        headerTitle: 'Delivery information',
        title: 'Is your prescription ready?',
        name: 'Name',
        birthday: 'Birthday',
        phoneNumber: 'Phone number',
        deliveryDate: 'Delivery date',
        time: 'Time',
        hint: 'Customer details are shared with delivery partner for verification at the pharmacy ',
        schedule: 'Schedule',
        successMessageTitle: 'Delivery scheduled',
        successMessageDescription: 'Please wait a moment while we update tracking on your delivery',
        checkboxQuestion:
          'Has your pharmacy contacted you to confirm that your prescription is ready for delivery?',
        checkboxLabel: 'Yes, I’ve confirmed with the pharmacy',
        addressInfo: 'Please share the address you would like your order delivered to',
      },
      deliveryStatus: {
        headerTitle: 'Delivery tracking',
        orderTitle: 'Order inclues',
        deliveryStatus: 'Delivery status',
        awaitingPickup: 'Awaiting pickup',
        pickup: 'Pickup',
        dropoff: 'Dropoff',
        drugName: 'Drug name',
        hint1: 'Contact us at',
        hint2: '(ext. 5) for questions.',
        buttonTitle: 'Update tracking',
        prescriptionTooltip: 'Tooltip here',
      },
    },
    prescriptionList: {
      title: 'Your prescriptions',
      footer:
        'For questions related to the status of your prescription, contact your pharmacy directly.\n\nIf you\'d like to speak with a provider to discuss your treatment plan, call <a href="tel:{{phone}}">{{phone_display}}</a>.',
    },
  },
};

export default en;
