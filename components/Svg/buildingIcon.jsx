import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={20} cy={20} r={20} fill={props.color} />
      <Path
        d="M15.833 18.333h-2.5v5.834h2.5v-5.834zM21.25 18.333h-2.5v5.834h2.5v-5.834zM28.333 25.833H11.667v2.5h16.666v-2.5zM26.667 18.333h-2.5v5.834h2.5v-5.834zM20 10.833L11.667 15v1.667h16.666V15L20 10.833z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
