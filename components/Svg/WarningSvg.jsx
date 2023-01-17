import * as React from 'react';
import Svg, { Circle, G, Path, Defs, ClipPath } from 'react-native-svg';

const WarningSVG = ({ fill = '#CB514C' }) => (
  <Svg width={67} height={67} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Circle cx={33.5} cy={33.5} r={33.5} fill={fill} />
    <G clipPath='url(#a)'>
      <G clipPath='url(#b)'>
        <Path d='M23 43h22L34 24 23 43Zm12-3h-2v-2h2v2Zm0-4h-2v-4h2v4Z' fill='#fff' />
      </G>
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' transform='translate(10 10)' d='M0 0h48v48H0z' />
      </ClipPath>
      <ClipPath id='b'>
        <Path fill='#fff' transform='translate(22 22)' d='M0 0h24v24H0z' />
      </ClipPath>
    </Defs>
  </Svg>
);

export default WarningSVG;
