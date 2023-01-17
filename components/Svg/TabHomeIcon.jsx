import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
