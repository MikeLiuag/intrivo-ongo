import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const LongCovidSvg = (props) => (
  <Svg width={18} height={20} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Path
      d='M16 2h-4.18C11.4.84 10.3 0 9 0 7.7 0 6.6.84 6.18 2H2C.9 2 0 2.9 0 4v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2ZM9 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1Zm2 14H4v-2h7v2Zm3-4H4v-2h10v2Zm0-4H4V6h10v2Z'
      fill='url(#a)'
    />
    <Defs>
      <LinearGradient id='a' x1={0} y1={0} x2={18} y2={20} gradientUnits='userSpaceOnUse'>
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.531} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default LongCovidSvg;
