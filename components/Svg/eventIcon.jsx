import * as React from "react";
import Svg, { Rect, Mask, G, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width={17} height={20} viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Rect x="3.84607" width="3.07691" height="6.15383" rx="1.375" fill="white"/>
      <Rect x="10" width="3.07691" height="6.15383" rx="1.375" fill="white"/>
      <Rect y="3.0769" width="16.923" height="16.923" rx="2.75" fill="white"/>
      <Mask id="mask0_7363_1796" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="3" width="17" height="17">
      <Rect y="3.0769" width="16.923" height="16.923" rx="2.75" fill="white"/>
      </Mask>
      <G mask="url(#mask0_7363_1796)">
      <Path d="M0 10.769L4.61537 15.3844L9.23074 19.9998H0V10.769Z" fill="white"/>
      <Path opacity="0.7" d="M9.23071 19.9998L4.61534 15.3844L-2.84635e-05 10.769L4.15379 10.769C6.9577 10.769 9.23071 13.042 9.23071 15.8459L9.23071 19.9998Z" fill="white"/>
      <Rect opacity="0.7" x="3.84607" y="-0.000244141" width="3.07691" height="6.15383" rx="1.375" fill="white"/>
      <Rect opacity="0.7" x="10" y="-0.000244141" width="3.07691" height="6.15383" rx="1.375" fill="white"/>
      </G>
    </Svg>
  );
}

export default SvgComponent;
