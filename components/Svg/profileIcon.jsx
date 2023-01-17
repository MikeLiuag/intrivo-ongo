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
        d="M25.833 12.5H22.35A2.509 2.509 0 0020 10.833c-1.083 0-2 .7-2.35 1.667h-3.483c-.917 0-1.667.75-1.667 1.667v11.666c0 .917.75 1.667 1.667 1.667h11.666c.917 0 1.667-.75 1.667-1.667V14.167c0-.917-.75-1.667-1.667-1.667zM20 12.5c.458 0 .833.375.833.833a.836.836 0 01-.833.834.836.836 0 01-.833-.834c0-.458.375-.833.833-.833zm0 3.333c1.383 0 2.5 1.117 2.5 2.5 0 1.384-1.117 2.5-2.5 2.5a2.497 2.497 0 01-2.5-2.5c0-1.383 1.117-2.5 2.5-2.5zm5 10H15v-1.166c0-1.667 3.333-2.584 5-2.584 1.667 0 5 .917 5 2.584v1.166z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
