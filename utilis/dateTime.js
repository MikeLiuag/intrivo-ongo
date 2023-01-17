import {
  format,
  parse,
  isBefore,
  isAfter,
  differenceInDays,
  differenceInYears,
  differenceInMonths,
  formatDistanceToNow,
} from 'date-fns';

export const formats = Object.freeze({
  iso8601: 'yyyy-MM-dd',
  shortDate: 'MM/dd/yyyy',
  fullLongDate: 'MMMM dd, yyyy',
  longDate: 'MMM. dd',
  longDateWithFullMonthWithouYear: 'MMMM dd',
  longDateWithFullMonth: 'MMMM dd, yyyy',
  longDateWithTime: 'MMM. dd, yyyy h:mm a',
  longDateWithTimeAndFullMonth: 'MMMM dd, yyyy h:mm a',
  longDateWithDayOfWeek: 'EEE, MMM dd, yyyy',
  time: 'HH:mm',
  timeslots: 'eee MM/dd',
  timeslotsTime: 'p',
  time12Hour: 'h:mm a',
});

export const dateToIso8601 = (date) => format(date, formats.iso8601);

export const iso8601ToDate = (dateString) => {
  if (typeof dateString === 'object') {
    return dateString;
  }
  if (dateString.includes('T')) {
    return new Date(dateString.endsWith('Z') ? dateString : `${dateString}Z`);
  }
  return parse(dateString, formats.iso8601, new Date());
};

export const iso8601ToFormatted = (dateString, formatString) => {
  if (dateString) {
    return format(iso8601ToDate(dateString), formatString);
  }
  return null;
};

export const iso8601ToDateLong = (dateString) => iso8601ToFormatted(dateString, formats.longDate);

export const iso8601ToDateLongFull = (dateString) =>
  `${iso8601ToFormatted(dateString, formats.longDate)} at ${iso8601ToFormatted(
    dateString,
    formats.time12Hour
  )} ${getLocalTimeZone()}`;

export const getLocalTimeZone = () => {
  const localTimeArray = new Date()
    .toLocaleTimeString(undefined, { timeZoneName: 'short' })
    .split(' ');
  if (localTimeArray.length > 2) {
    return localTimeArray[2];
  }
  return '';
};

export const isCurrentTimeBetween = (start, end) => {
  const now = new Date();

  const beforeTime = parse(start, formats.time, now);
  const afterTime = parse(end, formats.time, now);

  return isAfter(now, beforeTime) && isBefore(now, afterTime);
};

export const isLessThan24HoursToDate = (date) => {
  const now = new Date();
  const then = iso8601ToDate(date);

  const diff = then.getTime() - now.getTime();
  return diff < 86400000;
};

export const getTomorrowDate = () => {
  const now = new Date();
  return new Date(now.setDate(now.getDate() + 1));
};

export const getDateInAMonth = () => {
  const now = new Date();
  return new Date(now.setDate(now.getDate() + 28));
};

export const getDifferenceInDays = (date) => differenceInDays(new Date(), iso8601ToDate(date));

export const getDifferenceInYears = (date) => differenceInYears(new Date(), iso8601ToDate(date));

export const getDifferenceInMonths = (date) => differenceInMonths(new Date(), iso8601ToDate(date));

export const getFromNow = (date) => formatDistanceToNow(iso8601ToDate(date));

export default {
  iso8601ToFormatted,
  isCurrentTimeBetween,
  iso8601ToDateLong,
  iso8601ToDateLongFull,
  getLocalTimeZone,
  dateToIso8601,
  iso8601ToDate,
  getFromNow,
};
