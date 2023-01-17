import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ width, height, ...props }) {
  return (
    <Svg
      width={width || 21}
      height={height || 12}
      viewBox="0 0 21 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.625 8.367L18.561.714c.525-.506 1.314-.438 1.763.152.45.59.389 1.478-.136 1.983l-8.75 8.438a1.147 1.147 0 01-1.626 0l-8.75-8.438C.537 2.344.477 1.456.926.866c.45-.59 1.238-.658 1.763-.152l7.936 7.653z"
        fill="#2D3142"
      />
    </Svg>
  );
}

export default SvgComponent;
