import * as React from 'react';
import Svg, { Ellipse } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={120}
      height={144}
      viewBox='0 0 120 144'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Ellipse opacity='0.4' cx='91.5' cy='53.5' rx='91.5' ry='90.5' fill='#F6C34C' />
    </Svg>
  );
}

export default SvgComponent;
