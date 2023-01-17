import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      {...props}
    >
      <Circle cx={24} cy={24} r={24} fill="#1279BD" />
      <Path d="M24 27a3 3 0 100-6 3 3 0 000 6z" fill="#fff" />
      <Path
        d="M21 14l-1.83 2H16c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V18c0-1.1-.9-2-2-2h-3.17L27 14h-6zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
