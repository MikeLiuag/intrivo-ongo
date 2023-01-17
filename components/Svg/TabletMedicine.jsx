import * as React from 'react';
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const SvgComponent = ({ width, height }) => (
  <Svg width={width || 42} height={height || 40} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Rect width={40} height={40} rx={8} fill='#fff' />
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M31 13.3a.3.3 0 0 0-.3-.3H14.3a.3.3 0 0 0-.3.3v10.775a.3.3 0 0 0 .3.3h16.4a.3.3 0 0 0 .3-.3V13.3Zm-9.714 1.75a.3.3 0 0 1 .3-.3h1.828a.3.3 0 0 1 .3.3v2.025a.3.3 0 0 0 .3.3h1.829a.3.3 0 0 1 .3.3V19.7a.3.3 0 0 1-.3.3h-1.829a.3.3 0 0 0-.3.3v2.025a.3.3 0 0 1-.3.3h-1.828a.3.3 0 0 1-.3-.3V20.3a.3.3 0 0 0-.3-.3h-1.829a.3.3 0 0 1-.3-.3v-2.025a.3.3 0 0 1 .3-.3h1.829a.3.3 0 0 0 .3-.3V15.05Z'
      fill='url(#a)'
    />
    <Path
      d='M19.601 24.587a.3.3 0 0 1 .287-.212h5.224a.3.3 0 0 1 .287.212l.624 2.025a.3.3 0 0 1-.287.388h-6.472a.3.3 0 0 1-.287-.388l.624-2.025Z'
      fill='url(#b)'
    />
    <Defs>
      <LinearGradient id='a' x1={14} y1={13} x2={27.74} y2={29.684} gradientUnits='userSpaceOnUse'>
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.512} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
      <LinearGradient id='b' x1={14} y1={13} x2={27.74} y2={29.684} gradientUnits='userSpaceOnUse'>
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.512} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgComponent;
