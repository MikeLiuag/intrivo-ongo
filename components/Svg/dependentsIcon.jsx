import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.417 1.667c.916 0 1.666.75 1.666 1.667C7.083 4.25 6.333 5 5.417 5 4.5 5 3.75 4.25 3.75 3.334c0-.917.75-1.667 1.667-1.667zm7.5 6.25c0 .692.558 1.25 1.25 1.25.691 0 1.25-.558 1.25-1.25s-.559-1.25-1.25-1.25c-.692 0-1.25.558-1.25 1.25zm2.5 2.083H13.05c-.483.009-.95.267-1.208.717l-.767 1.1L8.1 6.667a1.684 1.684 0 00-1.425-.833H4.167c-.917 0-1.667.75-1.667 1.666v5h1.25v5.834h4.167V9.675l2.108 3.659h1.833l.642-.917v5.917h3.333v-4.167h.834V11.25c0-.683-.559-1.25-1.25-1.25z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
