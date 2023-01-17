const addresses = [
  '417 Clayton st. 5',
  '417 Clayton st. 11',
  '421 Clayton st. 5',
  '433 Clayton st. 11',
  '433 Clayton st. 5',
  '461 New Avenue st. 11',
];

export const mock = (success, search = '', timeout) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        if (search) {
          resolve(addresses.filter((item) => item.includes(search)));
        }
        resolve(addresses);
      } else {
        reject(new Error({ message: 'Error' }));
      }
    }, timeout || 1000);
  });

export const feet = [
  {
    label: '3 ft',
    value: 3,
  },
  {
    label: '4 ft',
    value: 4,
  },
  {
    label: '5 ft',
    value: 5,
  },
  {
    label: '6 ft',
    value: 6,
  },
  {
    label: '7 ft',
    value: 7,
  },
  {
    label: '8 ft',
    value: 8,
  },
];

export const inch = [
  {
    label: '0 in',
    value: 0,
  },
  {
    label: '1 in',
    value: 1,
  },
  {
    label: '2 in',
    value: 2,
  },
  {
    label: '3 in',
    value: 3,
  },
  {
    label: '4 in',
    value: 4,
  },
  {
    label: '5 in',
    value: 5,
  },
  {
    label: '6 in',
    value: 6,
  },
  {
    label: '7 in',
    value: 7,
  },
  {
    label: '8 in',
    value: 8,
  },
  {
    label: '9 in',
    value: 9,
  },
  {
    label: '10 in',
    value: 10,
  },
  {
    label: '11 in',
    value: 11,
  },
];
export const height = [
  {
    label: '',
    value: null,
  },
  {
    label: '3ft 0in',
    value: 36,
  },
  {
    label: '3ft 1in',
    value: 37,
  },
  {
    label: '3ft 2in',
    value: 38,
  },
  {
    label: '3ft 3in',
    value: 39,
  },
  {
    label: '3ft 4in',
    value: 40,
  },
  {
    label: '3ft 5in',
    value: 41,
  },
  {
    label: '3ft 6in',
    value: 42,
  },
  {
    label: '3ft 7in',
    value: 43,
  },
  {
    label: '3ft 8in',
    value: 44,
  },
  {
    label: '3ft 9in',
    value: 45,
  },
  {
    label: '3ft 10in',
    value: 46,
  },
  {
    label: '3ft 11in',
    value: 47,
  },
  {
    label: '4ft 0in',
    value: 48,
  },
  {
    label: '4ft 1in',
    value: 49,
  },
  {
    label: '4ft 2in',
    value: 50,
  },
  {
    label: '4ft 3in',
    value: 51,
  },
  {
    label: '4ft 4in',
    value: 52,
  },
  {
    label: '4ft 5in',
    value: 53,
  },
  {
    label: '4ft 6in',
    value: 54,
  },
  {
    label: '4ft 7in',
    value: 55,
  },
  {
    label: '4ft 8in',
    value: 56,
  },
  {
    label: '4ft 9in',
    value: 57,
  },
  {
    label: '4ft 10in',
    value: 58,
  },
  {
    label: '4ft 11in',
    value: 59,
  },
  {
    label: '5ft 0in',
    value: 60,
  },
  {
    label: '5ft 1in',
    value: 61,
  },
  {
    label: '5ft 2in',
    value: 62,
  },
  {
    label: '5ft 3in',
    value: 63,
  },
  {
    label: '5ft 4in',
    value: 64,
  },
  {
    label: '5ft 5in',
    value: 65,
  },
  {
    label: '5ft 6in',
    value: 66,
  },
  {
    label: '5ft 7in',
    value: 67,
  },
  {
    label: '5ft 8in',
    value: 68,
  },
  {
    label: '5ft 9in',
    value: 69,
  },
  {
    label: '5ft 10in',
    value: 70,
  },
  {
    label: '5ft 11in',
    value: 71,
  },
  {
    label: '6ft 0in',
    value: 72,
  },
  {
    label: '6ft 1in',
    value: 73,
  },
  {
    label: '6ft 2in',
    value: 74,
  },
  {
    label: '6ft 3in',
    value: 75,
  },
  {
    label: '6ft 4in',
    value: 76,
  },
  {
    label: '6ft 5in',
    value: 77,
  },
  {
    label: '6ft 6in',
    value: 78,
  },
  {
    label: '6ft 7in',
    value: 79,
  },
  {
    label: '6ft 8in',
    value: 80,
  },
  {
    label: '6ft 9in',
    value: 81,
  },
  {
    label: '6ft 10in',
    value: 82,
  },
  {
    label: '6ft 11in',
    value: 83,
  },
  {
    label: '7ft 0in',
    value: 84,
  },
  {
    label: '7ft 1in',
    value: 85,
  },
  {
    label: '7ft 2in',
    value: 86,
  },
  {
    label: '7ft 3in',
    value: 87,
  },
  {
    label: '7ft 4in',
    value: 88,
  },
  {
    label: '7ft 5in',
    value: 89,
  },
  {
    label: '7ft 6in',
    value: 90,
  },
  {
    label: '7ft 7in',
    value: 91,
  },
  {
    label: '7ft 8in',
    value: 92,
  },
  {
    label: '7ft 9in',
    value: 93,
  },
  {
    label: '7ft 10in',
    value: 94,
  },
  {
    label: '7ft 11in',
    value: 95,
  },
  {
    label: '8ft 0in',
    value: 96,
  },
  {
    label: '8ft 1in',
    value: 97,
  },
  {
    label: '8ft 2in',
    value: 98,
  },
  {
    label: '8ft 3in',
    value: 99,
  },
  {
    label: '8ft 4in',
    value: 100,
  },
  {
    label: '8ft 5in',
    value: 101,
  },
  {
    label: '8ft 6in',
    value: 102,
  },
  {
    label: '8ft 7in',
    value: 103,
  },
  {
    label: '8ft 8in',
    value: 104,
  },
  {
    label: '8ft 9in',
    value: 105,
  },
  {
    label: '8ft 10in',
    value: 106,
  },
  {
    label: '8ft 11in',
    value: 107,
  },
];

export const states = [
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Delaware', value: 'DE' },
  { label: 'District Of Columbia', value: 'DC' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Massachussets', value: 'MA' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'NH' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Rhode Island', value: 'RI' },
  { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota', value: 'SD' },
  { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' },
  { label: 'Utah', value: 'UT' },
  { label: 'Vermont', value: 'VT' },
  { label: 'Virginia', value: 'VA' },
  { label: 'Washington', value: 'WA' },
  { label: 'West Virginia', value: 'WV' },
  { label: 'Wisconsin', value: 'WI' },
  { label: 'Wyoming', value: 'WY' },
];

export const sex = [
  { label: 'Female', value: 'F' },
  { label: 'Male', value: 'M' },
  { label: 'Other', value: 'X' },
];

export const race = [
  { label: 'American Indian or Alaska Native', value: 'Americal' },
  { label: 'Asian', value: 'Asian' },
  { label: 'Black or African American', value: 'Black' },
  { label: 'Native Hawaiian or Other Pacific Islander', value: 'Native' },
  { label: 'White', value: 'White' },
  { label: 'Other', value: 'Other' },
];

export const ethinicity = [
  { label: 'Hispanic or Latino', value: 'Hispanic' },
  { label: 'Not Hispanic or Latino', value: 'NotHispanic' },
];
