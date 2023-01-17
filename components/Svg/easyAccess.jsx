import * as React from "react";
import Svg, { Path, G, Mask, Defs, Rect, ClipPath, } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clip-path="url(#clip0_6100_1112)">
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M7 19.9953L16 13.5001L7 7.00488V11.0001H0V16.0001H7V19.9953Z" fill={props.color ? props.color : "#2A4D9B"}/>
        <Mask id="mask0_6100_1112" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="9" y="1" width="16" height="22">
          <Path d="M24.3999 21C24.3999 22.1046 23.5045 23 22.3999 23L10.9999 23C9.89533 23 8.9999 22.1046 8.9999 21L8.9999 3C8.9999 1.89543 9.89533 0.999999 10.9999 0.999999L22.3999 1C23.5045 1 24.3999 1.89543 24.3999 3L24.3999 21Z" fill={props.color ? props.color : "#F6C34C"}/>
        </Mask>
        <G mask="url(#mask0_6100_1112)">
          <Path fill-rule="evenodd" clip-rule="evenodd" d="M22.3999 23C23.5045 23 24.3999 22.1046 24.3999 21L24.3999 7.60005L19.7999 7.60005C18.6953 7.60005 17.7999 6.70462 17.7999 5.60005L17.7999 1.00005L22.3999 1.00005C23.5045 1.00005 24.3999 1.89548 24.3999 3.00005L24.3999 3C24.3999 1.89543 23.5045 1 22.3999 1L10.9999 0.999999C9.89534 0.999999 8.9999 1.89543 8.9999 3L8.9999 21C8.9999 22.1046 9.89533 23 10.9999 23L22.3999 23Z" fill={props.color ? props.color : "#EC8950"}/>
          <Path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M7 19.9904L16 13.4952L7 7V10.9952H0V15.9952H7V19.9904Z" fill={props.color ? props.color : "#2A4D9B"}/>
          <Path d="M24.3999 7.6001L19.7999 7.6001C18.6953 7.6001 17.7999 6.70467 17.7999 5.6001L17.7999 1.0001L20.5499 3.7501L24.3999 7.6001Z" fill={props.color ? props.color : "#2A4D9B"}/>
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_6100_1112">
          <Rect width="24.3999" height="24" fill={props.color ? props.color : "white"}/>
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent;