import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const OtherTheCounterSVG = () => (
  <Svg width={20} height={20} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Path
      d='M2.579 7.737A3.647 3.647 0 1 1 7.737 2.58l4.033 4.033a.028.028 0 0 1 0 .04L6.65 11.77a.028.028 0 0 1-.04 0L2.58 7.737Z'
      fill='url(#a)'
    />
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M16.579 16.579a3.647 3.647 0 0 0 0-5.158l-4.033-4.033a.028.028 0 0 0-.04 0l-5.118 5.119a.028.028 0 0 0 0 .04l4.033 4.032a3.647 3.647 0 0 0 5.158 0Zm-.757-.858a2.545 2.545 0 0 0 0-3.599l-3.301-3.301a.022.022 0 0 0-.03 0l-3.57 3.568a.022.022 0 0 0 0 .03l3.302 3.302a2.545 2.545 0 0 0 3.6 0Z'
      fill='url(#b)'
    />
    <Defs>
      <LinearGradient id='a' x1={0} y1={5.158} x2={11.427} y2={3.73} gradientUnits='userSpaceOnUse'>
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.512} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
      <LinearGradient
        id='b'
        x1={19.158}
        y1={14}
        x2={7.731}
        y2={15.428}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.512} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default OtherTheCounterSVG;
