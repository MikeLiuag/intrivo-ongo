import * as React from 'react';
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const SvgComponent = ({ width, height }) => (
  <Svg width={width || 40} height={height || 40} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Rect width={40} height={40} rx={8} fill='#fff' />
    <Path
      d='M13.395 17.737a3.647 3.647 0 1 1 5.158-5.158l4.033 4.033a.028.028 0 0 1 0 .04l-5.118 5.117a.028.028 0 0 1-.04 0l-4.033-4.032Z'
      fill='url(#a)'
    />
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M27.396 26.579a3.647 3.647 0 0 0 0-5.158l-4.033-4.033a.028.028 0 0 0-.04 0l-5.118 5.118a.028.028 0 0 0 0 .04l4.033 4.033a3.647 3.647 0 0 0 5.158 0Zm-.757-.858a2.545 2.545 0 0 0 0-3.599l-3.301-3.302a.022.022 0 0 0-.03 0l-3.57 3.57a.022.022 0 0 0 0 .03l3.302 3.301a2.545 2.545 0 0 0 3.6 0Z'
      fill='url(#b)'
    />
    <Defs>
      <LinearGradient
        id='a'
        x1={10.816}
        y1={15.158}
        x2={22.243}
        y2={13.729}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor='#2A4D9B' />
        <Stop offset={0.512} stopColor='#EC8950' />
        <Stop offset={1} stopColor='#F6C34C' />
      </LinearGradient>
      <LinearGradient
        id='b'
        x1={29.975}
        y1={24}
        x2={18.548}
        y2={25.428}
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
