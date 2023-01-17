import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ClockSvg = () => (
  <Svg width={18} height={18} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <Path
      d='M7.783 11.108 6.008 9.333l-.883.884 2.65 2.65 5-5-.883-.884-4.109 4.125Zm5.664-10.6 3.84 3.205-1.067 1.279-3.842-3.203 1.07-1.28Zm-8.895 0 1.069 1.28-3.84 3.204-1.067-1.28L4.552.508ZM9 2.333A7.5 7.5 0 1 0 9 17.335 7.5 7.5 0 0 0 9 2.333Zm0 13.334a5.84 5.84 0 0 1-5.833-5.834A5.84 5.84 0 0 1 9 4a5.84 5.84 0 0 1 5.833 5.833A5.84 5.84 0 0 1 9 15.667Z'
      fill='#fff'
    />
  </Svg>
);

export default ClockSvg;
