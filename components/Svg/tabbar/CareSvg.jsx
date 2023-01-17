import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CareSvg = () => (
  <Svg width={18} height={18} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Path
      d='M16 0H2C.9 0 .01.9.01 2L0 16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 16H2V2h14v14Zm-8.5-2h3v-3.5H14v-3h-3.5V4h-3v3.5H4v3h3.5V14Z'
      fill='#F6C34C'
    />
  </Svg>
);

export default CareSvg;
