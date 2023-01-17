import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const DISCOUNT_URLS_KEY = 'discount_urls_key';
export const BANNER_KEY = 'closed_banner_key';
export const NOTIFICATION_KEY = 'notification_key';
export const HINT_UPLOAD_TEST = 'hint_upload_test';
export const INSURANCE_KEY = 'isurance_key';
export const SNIFFLES_ASSESSMENT_KEY = 'sniffles_assessment_key';
export const FEEDBACK_MEDICATION_ID_KEY = 'feedback_medication_id_key';
export const SNIFFLES_DISCLAIMER_KEY = 'sniffles_disclaimer';

export const saveToLocalStorage = async (key, value, isSecure = false) => {
  if (isSecure && Platform.OS !== 'web') await SecureStore.setItemAsync(key, JSON.stringify(value));
  else await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = async (key, isSecure = false) => {
  if (isSecure && Platform.OS !== 'web') {
    const val = await SecureStore.getItemAsync(key);
    let parsed = null;
    try {
      parsed = JSON.parse(val);
    } catch (err) {
      parsed = val;
    }
    return parsed;
  }
  return JSON.parse(await AsyncStorage.getItem(key));
};

export const deleteFromLocalStorage = async (key, isSecure = false) => {
  if (isSecure && Platform.OS !== 'web') await SecureStore.deleteItemAsync(key);
  await AsyncStorage.removeItem(key);
};
