import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <Path
            d="M0 4.8c0-1.68 0-2.52.327-3.162A3 3 0 011.638.327C2.28 0 3.12 0 4.8 0h14.4c1.68 0 2.52 0 3.162.327a3 3 0 011.311 1.311C24 2.28 24 3.12 24 4.8v14.4c0 1.68 0 2.52-.327 3.162a3 3 0 01-1.311 1.311C21.72 24 20.88 24 19.2 24H4.8c-1.68 0-2.52 0-3.162-.327a3 3 0 01-1.311-1.311C0 21.72 0 20.88 0 19.2V4.8z"
            fill="#2A4D9B"
        />
        <Path
            d="M17.25 12.75h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5h1.5v4.5h4.5v1.5z"
            fill="#fff"
        />
    </Svg>
  );
}

export default SvgComponent;
