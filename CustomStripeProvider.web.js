import React from 'react';

const StripeProvider = ({ children }) => {
  console.log('*** CUSTOM STRIPE FOR WEB');
  return <>{children}</>;
};
export default StripeProvider;
