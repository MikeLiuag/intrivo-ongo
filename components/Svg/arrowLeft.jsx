import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({color,...props}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.186 12l7.483 7.936c.494.525.427 1.314-.15 1.763-.576.45-1.444.389-1.938-.136l-8.25-8.75a1.165 1.165 0 010-1.627l8.25-8.75c.494-.524 1.362-.584 1.939-.135.576.45.643 1.238.149 1.763L6.186 12z"
        fill={props.color || '#2D3142'}
      />
    </Svg>
  );
}

export default SvgComponent;
