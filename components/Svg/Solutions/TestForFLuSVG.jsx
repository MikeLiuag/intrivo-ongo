import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const TestForFLuSVG = () => (
  <Svg width={16} height={17} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M5.797 9.608H4.318l-3.991 4.99C-.448 15.566.242 17 1.48 17h12.327c1.24 0 1.928-1.434 1.154-2.402l-3.992-4.99H9.492l4.435 5.913H1.362l4.435-5.913Z'
      fill='url(#a)'
    />
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M10.97 0H4.318v9.609h1.479v-8.13h3.695v8.13h1.478V0Z'
      fill='url(#b)'
    />
    <Path d='M6.166 10.348 2.84 14.782h9.609l-3.326-4.434H6.166Z' fill='url(#c)' />
    <Defs>
      <LinearGradient
        id='a'
        x1={0}
        y1={9.608}
        x2={5.793}
        y2={21.591}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.512} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
      <LinearGradient
        id='b'
        x1={4.318}
        y1={0}
        x2={13.312}
        y2={6.226}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.512} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
      <LinearGradient
        id='c'
        x1={2.84}
        y1={10.348}
        x2={6.215}
        y2={17.66}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.512} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default TestForFLuSVG;
