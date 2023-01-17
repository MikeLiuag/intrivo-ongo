import * as React from "react";
import Svg, { G, Mask, Rect, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask id="mask0_6100_1428" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
        <Rect width="40" height="40" rx="8" fill="#F6C34C"/>
      </Mask>
      <G mask="url(#mask0_6100_1428)">
        <Rect width="40" height="40" rx="8" fill="#F6C34C"/>
        <Rect opacity="0.1" x="19" y="-1" width="21" height="42" fill="white"/>
        <Rect opacity="0.1" y="18" width="19" height="23" fill="white"/>
        <Rect opacity="0.1" y="18" width="19" height="23" fill="white"/>
        <Path opacity="0.1" d="M40 0L40 40L19.1304 19.0476L0 -1.74846e-06L40 0Z" fill="white"/>
        <Rect opacity="0.1" y="-1" width="40" height="19" fill="white"/>
      </G>
    </Svg>
  )
}

export default SvgComponent;