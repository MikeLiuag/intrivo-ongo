/* eslint-disable camelcase */
import * as Sentry from 'sentry-expo';
import { states } from './mock';
import { firstCharToUpperCase } from './strings';

export const isUndefined = (value) => typeof value === 'undefined';

export const filterArrayByString = (arr = [], search = '') => {
  const searchLower = search.toLowerCase();
  return arr.filter((med) => med.toLowerCase().includes(searchLower));
};

export const sortStringsAlphabetically = (strings = []) =>
  strings.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

export const createDictionaryFromArray = (arr = []) => {
  const sortedArr = sortStringsAlphabetically(arr);
  const dictionary = [];
  const keys = [];

  sortedArr.forEach((el) => {
    if (keys.includes(el[0])) {
      dictionary.find(({ title }) => title === el[0])?.data.push(el);
    } else {
      keys.push(el[0]);
      dictionary.push({ title: el[0], data: [el] });
    }
  });

  return dictionary;
};

export const getLocationsFromDeliveryJob = ({ pickup, dropoff }) => {
  const pickUpLocation = {
    addressLine1: pickup?.address_1,
    addressLine2: pickup?.address_2,
    city: pickup?.city,
    state: pickup?.state,
    zipcode: pickup?.zipcode,
  };

  const dropOffLocation = {
    addressLine1: dropoff?.address_1,
    addressLine2: dropoff?.address_2,
    city: dropoff?.city,
    state: dropoff?.state,
    zipcode: dropoff?.zipcode,
  };

  return { pickUpLocation, dropOffLocation };
};

export const getGenderFromDisplayName = (displayName) => {
  const lowerDisplayName = displayName.toLowerCase();
  const isOther = lowerDisplayName !== 'male' && lowerDisplayName !== 'female';

  return isOther ? 'other' : lowerDisplayName;
};

export const getUploadImageObjectFromFile = (file = {}) => ({
  uri: file.uri,
  type: 'image/jpeg',
  name: new Date().getTime() + file.uri.split('/').pop(),
});

export const getStateNameByStateId = (id) => states.find(({ value }) => value === id)?.label;

export const getDisplayedDeliveryStatus = (status = '') =>
  firstCharToUpperCase(status.replace(/_/g, ' '));

export const convertInchesToFeetInches = (height) => {
  const feet = Math.floor(height / 12);
  const inches = height - feet * 12;
  return `${feet}'${inches}"`;
};

export const stitchArrayIntoCommaList = (listToStich, seperatorChar, finalSeperatorChar) => {
  if (!Array.isArray(listToStich)) return undefined;

  const defaultSepartor = ', ';
  const defaultFinalSepartor = ' and ';

  const seperator = seperatorChar || defaultSepartor;
  const finalSeperator = seperatorChar ? finalSeperatorChar || seperatorChar : defaultFinalSepartor;

  return listToStich
    .slice(1)
    .reduce(
      (acc, cur, i) => `${acc}${i !== listToStich.length - 2 ? seperator : finalSeperator}${cur}`,
      listToStich[0]
    );
};

/**
 * Returns 1 if version1 > version2, 0 if version1 = version2, -1 if version1 < version2
 * @param {string} version1
 * @param {string} version2
 */
export const compareVersion = (version1, version2) => {
  const v1 = version1.split('-')[0].split('.');
  const v2 = version2.split('-')[0].split('.');
  const length = Math.max(v1.length, v2.length);
  for (let i = 0; i < length; i++) {
    const seg1 = parseInt(v1[i] || '0', 10);
    const seg2 = parseInt(v2[i] || '0', 10);
    if (seg1 !== seg2) {
      return seg1 - seg2 > 0 ? 1 : -1;
    }
  }
  return 0;
};

export const logException = (err) => {
  Sentry.Native.captureException(err);
};

export const parseTextScannerResponse = (data) => {
  const textAnnotations = data.responses[0].textAnnotations || [];

  const numberMatches = textAnnotations
    .map(({ description }) => description.match(/[0-9.]{3,4}/g)?.[0])
    .filter(Boolean);

  const stringMatches = textAnnotations
    .filter(({ description }) => ['f', 'c'].includes(description?.toLowerCase()))
    .map(({ description }) => description?.toUpperCase());

  return {
    numberMatches,
    stringMatches,
  };
};
