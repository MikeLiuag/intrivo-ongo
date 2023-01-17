import * as React from 'react';
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const SvgComponent = ({ width, height }) => (
  <Svg width={width || 40} height={height || 40} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Rect width={40} height={40} rx={8} fill='#fff' />
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17.797 20.609h-1.479l-3.991 4.99c-.775.967-.085 2.401 1.154 2.401h12.327c1.24 0 1.928-1.434 1.154-2.401l-3.991-4.99h-1.479l4.435 5.913H13.362l4.435-5.913Z'
      fill='url(#a)'
    />
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M22.97 11h-6.652v9.609h1.479v-8.13h3.695v8.13h1.479V11Z'
      fill='url(#b)'
    />
    <Path d='m18.166 21.348-3.326 4.434h9.608l-3.326-4.434h-2.956Z' fill='url(#c)' />
    <Defs>
      <LinearGradient
        id='a'
        x1={12}
        y1={20.609}
        x2={17.793}
        y2={32.591}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.512} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
      <LinearGradient
        id='b'
        x1={16.318}
        y1={11}
        x2={25.312}
        y2={17.226}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.512} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
      <LinearGradient
        id='c'
        x1={14.84}
        y1={21.348}
        x2={18.215}
        y2={28.66}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.512} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgComponent;
