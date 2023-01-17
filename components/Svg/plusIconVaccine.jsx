import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { colors } from "../../theme";

function SvgComponent({ width, height, ...props }) {
  return (
    <Svg
      width={width || 48}
      height={height || 48}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={24} cy={24} r={24} fill={colors.primaryBlue} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31 25h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
