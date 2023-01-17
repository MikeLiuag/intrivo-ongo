import * as React from 'react';
import Svg, { G, Rect, Path } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={115}
      height={304}
      viewBox='0 0 115 304'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <G opacity='0.4'>
        <Rect
          width='219.666'
          height='217.854'
          transform='matrix(-0.707107 0.707107 0.707107 0.707107 -39.7778 -6)'
          fill='#7DCBF2'
        />
        <Path
          d='M-45.2493 151.385L-195.105 149.327L-41.059 303.373L114.268 148.046L-45.2493 151.385Z'
          fill='#F0BAA9'
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
