/* eslint-disable import/prefer-default-export */
import { Platform } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { IS_DEV } from './utilis/axios';

export const LogOnboarding = (step, goBack, authEmail) => {
  const type = goBack ? 'click_Back' : 'screen';
  switch (step) {
    case 1:
      LogEvent(`OnboardingEmail_${type}`);
      break;
    case 2:
      LogEvent(`OnboardingPassword_${type}`);
      break;
    case 3:
      LogEvent(`OnboardingPhone_${type}`);
      break;
    case 4:
      if (authEmail) {
        LogEvent(`OnboardingAuthEmail_${type}`);
      } else {
        LogEvent(`OnboardingAuthPhone_${type}`);
      }
      break;
    case 5:
      LogEvent(`OnboardingTerms_${type}`);
      break;
    case 6:
      LogEvent(`OnboardingLocation_${type}`);
      break;
    case 7:
      LogEvent(`OnboardingInfo_${type}`);
      break;
    default:
      break;
  }
};

export const LogEvent = async (eventName, param) => {
  if (IS_DEV) {
    console.log('Event name: ', eventName);
    console.log('Event param: ', param);
  }
  if (Platform.OS !== 'web') {
    await analytics().logEvent(eventName, param ? { param } : {});
  } else {
    console.log('LOG: ', eventName, param ? { param } : {});
  }
};

export const SetCurrentScreen = async (screen) => {
  analytics().logScreenView({
    screen_name: screen,
    screen_class: screen,
  });
  console.log(`send screen changed to ${screen}`);
};
