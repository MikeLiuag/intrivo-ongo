import * as React from 'react';
import Svg, { Rect, G, Path, Defs, LinearGradient, Stop, ClipPath } from 'react-native-svg';

const SvgComponent = ({ width, height }) => (
  <Svg width={width || 42} height={height || 40} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Rect width={40} height={40} rx={8} fill='#fff' />
    <G clipPath='url(#a)'>
      <Path
        d='M23.22 30.61c-.4.15-.8.29-1.22.39-5.16-1.26-9-6.45-9-12v-6l9-4 9 4v6c0 .9-.11 1.78-.3 2.65-.81-.41-1.73-.65-2.7-.65-3.31 0-6 2.69-6 6 0 1.36.46 2.61 1.22 3.61ZM29 28v2.99s-1.99.01-2 0V28h-3v-2h3v-3h2v3h3v2h-3Z'
        fill='url(#b)'
      />
    </G>
    <Defs>
      <LinearGradient id='b' x1={13} y1={9} x2={28.5} y2={26.5} gradientUnits='userSpaceOnUse'>
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.552} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
      <ClipPath id='a'>
        <Path fill='#fff' transform='translate(10 8)' d='M0 0h24v24H0z' />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;
