import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const RequestMedicationSVG = () => (
  <Svg width={21} height={14} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Path
      d='M12 4H0v2h12V4Zm0-4H0v2h12V0ZM0 10h8V8H0v2Zm19.5-4.5L21 7l-6.99 7L9.5 9.5 11 8l3.01 3 5.49-5.5Z'
      fill='url(#a)'
    />
    <Defs>
      <LinearGradient id='a' x1={0} y1={0} x2={8.043} y2={15.771} gradientUnits='userSpaceOnUse'>
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.552} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default RequestMedicationSVG;
