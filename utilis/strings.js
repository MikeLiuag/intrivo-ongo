const getPosition = (string, subString, index) =>
  string.split(subString, index).join(subString).length;

// convert phone number from either +1xxxxxxxxx and xxxxxxxxx
const formatPhoneNumber = (phoneNumber) => {
  const cleaned = `${phoneNumber}`.replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
};

const firstCharToUpperCase = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const formatProductPrice = (amount) => (amount ? (Math.round(amount) / 100).toFixed(2) : 'XX.XX');

export { getPosition, formatPhoneNumber, firstCharToUpperCase, formatProductPrice };
