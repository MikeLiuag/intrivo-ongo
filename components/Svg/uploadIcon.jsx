import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 48 48"
    >
      <Circle cx={24} cy={24} r={24} fill="#1279BD" />
      <Path d="M21 28h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H17v-2z" fill="#fff" />
    </Svg>
  );
}

export default SvgComponent;
