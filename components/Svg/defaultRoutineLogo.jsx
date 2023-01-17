import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function SvgComponent({ width, height, ...props }) {
  return (
    <Svg
      width={width || 36}
      height={height || 36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx="18" cy="18" r="18" fill="#E2E2E2"/>
      <Path 
        d="M23 26V17H21V10H28L26 15H28L23 26ZM21 19V26H10C8.9 26 8 25.1 8 24V21C8 19.9 8.9 19 10 19H21ZM12.25 21.75H10.75V23.25H12.25V21.75ZM19 10V17H10C8.9 17 8 16.1 8 15V12C8 10.9 8.9 10 10 10H19ZM12.25 12.75H10.75V14.25H12.25V12.75Z" 
        fill="#323232"
      />
    </Svg>
  );
}

export default SvgComponent;
