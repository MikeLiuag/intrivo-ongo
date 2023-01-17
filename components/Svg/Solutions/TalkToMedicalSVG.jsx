import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const TalkToMedicalSVG = () => (
  <Svg width={17} height={14} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17 .3a.3.3 0 0 0-.3-.3H.3a.3.3 0 0 0-.3.3v10.775a.3.3 0 0 0 .3.3h16.4a.3.3 0 0 0 .3-.3V.3ZM7.286 2.05a.3.3 0 0 1 .3-.3h1.828a.3.3 0 0 1 .3.3v2.025a.3.3 0 0 0 .3.3h1.829a.3.3 0 0 1 .3.3V6.7a.3.3 0 0 1-.3.3h-1.829a.3.3 0 0 0-.3.3v2.025a.3.3 0 0 1-.3.3H7.586a.3.3 0 0 1-.3-.3V7.3a.3.3 0 0 0-.3-.3H5.157a.3.3 0 0 1-.3-.3V4.675a.3.3 0 0 1 .3-.3h1.829a.3.3 0 0 0 .3-.3V2.05Z'
      fill='url(#a)'
    />
    <Path
      d='M5.601 11.587a.3.3 0 0 1 .287-.212h5.224a.3.3 0 0 1 .287.212l.624 2.025a.3.3 0 0 1-.287.388H5.264a.3.3 0 0 1-.287-.388l.624-2.025Z'
      fill='url(#b)'
    />
    <Defs>
      <LinearGradient id='a' x1={0} y1={0} x2={13.74} y2={16.684} gradientUnits='userSpaceOnUse'>
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.512} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
      <LinearGradient id='b' x1={0} y1={0} x2={13.74} y2={16.684} gradientUnits='userSpaceOnUse'>
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.512} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default TalkToMedicalSVG;
