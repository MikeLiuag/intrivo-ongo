import * as React from 'react';
import Svg, { G, Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const IncreaseMidVitamin = () => (
  <Svg width={221} height={129} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <G filter='url(#a)'>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M197 110c0-47.496-38.504-86-86-86s-86 38.504-86 86h172Z'
        fill='#fff'
      />
    </G>
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M185 109.618v-.118H36C36 68.355 69.355 35 110.5 35S185 68.355 185 109.5v.118Z'
      fill='url(#b)'
      fillOpacity={0.6}
    />
    <Circle cx={5.5} cy={109.5} r={5.5} fill='#2A4D9B' />
    <Circle cx={215.5} cy={109.5} r={5.5} fill='#EFEFEF' />
    <Circle cx={212.5} cy={85.5} r={5.5} fill='#EFEFEF' />
    <Circle cx={204.5} cy={62.5} r={5.5} fill='#EFEFEF' />
    <Circle cx={190.5} cy={42.5} r={5.5} fill='#EFEFEF' />
    <Circle cx={173.5} cy={25.5} r={5.5} fill='#EFEFEF' />
    <Circle cx={154.5} cy={14.5} r={5.5} fill='#EFEFEF' />
    <Circle cx={134.5} cy={7.5} r={5.5} fill='#EFEFEF' />
    <Circle cx={112.5} cy={5.5} r={5.5} fill='#2A4D9B' />
    <Circle cx={90.5} cy={7.5} r={5.5} fill='#2A4D9B' />
    <Circle cx={67.5} cy={14.5} r={5.5} fill='#2A4D9B' />
    <Circle cx={48.5} cy={25.5} r={5.5} fill='#2A4D9B' />
    <Circle cx={30.5} cy={42.5} r={5.5} fill='#2A4D9B' />
    <Circle cx={17.5} cy={62.5} r={5.5} fill='#2A4D9B' />
    <Circle cx={7.5} cy={85.5} r={5.5} fill='#2A4D9B' />
    <G filter='url(#c)'>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M97.343 112.893c7.079 8.437 19.494 9.674 27.73 2.764 8.236-6.911 9.173-19.352 2.094-27.79a20.198 20.198 0 0 0-9.542-6.351l-4.754-7.308-4.869 6.793a19.012 19.012 0 0 0-8.565 4.103c-8.236 6.91-9.174 19.352-2.094 27.789Z'
        fill='#fff'
      />
    </G>
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M101.63 109.29c5.148 6.134 14.294 6.935 20.428 1.787 6.135-5.147 6.935-14.293 1.787-20.428a14.434 14.434 0 0 0-7.664-4.766l-3.719-5.49-3.671 5.62a14.455 14.455 0 0 0-5.374 2.849c-6.134 5.147-6.934 14.293-1.787 20.428Z'
      fill='#2A4D9B'
    />
    <Defs>
      <LinearGradient
        id='b'
        x1={110.5}
        y1={35}
        x2={110.5}
        y2={109.618}
        gradientUnits='userSpaceOnUse'
      >
        <Stop offset={0.336} stopColor='#F2F7F9' />
        <Stop offset={1} stopColor='#F2F7F9' stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default IncreaseMidVitamin;
