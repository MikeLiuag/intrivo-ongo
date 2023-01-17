export const notEmptyString = (value) => value && value.length > 0;

export const isEmail = (value) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex.test(value);
};

export const isZipCode = (value) => {
  const regex = /^\d{5}(?:[-\s]\d{4})?$/;
  return regex.test(value);
};
