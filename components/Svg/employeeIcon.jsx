import * as React from "react";
import Svg, { G, Mask, Defs, Rect, ClipPath, Circle } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clip-path="url(#clip0_6146_2861)">
        <Rect x="14.05" y="-0.505859" width="10.2927" height="10.2927" rx="2" transform="rotate(45 14.05 -0.505859)" fill="#F0BAA9"/>
        <Circle cx="14.05" cy="6.77209" r="3.27494" transform="rotate(45 14.05 6.77209)" fill="#CB514C"/>
        <Circle cx="15.3733" cy="5.44875" r="0.467848" transform="rotate(45 15.3733 5.44875)" fill="#F0BAA9"/>
        <Circle cx="14.7117" cy="8.75734" r="0.467848" transform="rotate(45 14.7117 8.75734)" fill="#F0BAA9"/>
        <Circle cx="16.0349" cy="7.43361" r="0.467848" transform="rotate(45 16.0349 7.43361)" fill="#F0BAA9"/>
        <Circle cx="13.3884" cy="4.78713" r="0.467848" transform="rotate(45 13.3884 4.78713)" fill="#F0BAA9"/>
        <Circle cx="14.05" cy="6.77199" r="0.467848" transform="rotate(45 14.05 6.77199)" fill="#F0BAA9"/>
        <Circle cx="12.0652" cy="6.11037" r="0.467848" transform="rotate(45 12.0652 6.11037)" fill="#F0BAA9"/>
        <Circle cx="12.7268" cy="8.09523" r="0.467848" transform="rotate(45 12.7268 8.09523)" fill="#F0BAA9"/>
        <Rect x="14.1763" y="4.82373" width="11.6169" height="16.6133" rx="2" transform="rotate(45 14.1763 4.82373)" fill="#2A4D9B"/>
        <Mask id="mask0_6146_2861" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="3" y="5" width="18" height="18">
          <Rect x="14.1763" y="4.82373" width="9.91335" height="16.6133" rx="2" transform="rotate(45 14.1763 4.82373)" fill="#2A4D9B"/>
        </Mask>
        <G mask="url(#mask0_6146_2861)">
          <G opacity="0.7">
            <Rect x="14.0503" y="-0.505859" width="10.2927" height="10.2927" rx="2" transform="rotate(45 14.0503 -0.505859)" fill="#F0BAA9"/>
            <Circle cx="14.0503" cy="6.77209" r="3.27494" transform="rotate(45 14.0503 6.77209)" fill="#CB514C"/>
            <Circle cx="15.3735" cy="5.44875" r="0.467848" transform="rotate(45 15.3735 5.44875)" fill="#F0BAA9"/>
            <Circle cx="14.7119" cy="8.75734" r="0.467848" transform="rotate(45 14.7119 8.75734)" fill="#F0BAA9"/>
            <Circle cx="16.0352" cy="7.43361" r="0.467848" transform="rotate(45 16.0352 7.43361)" fill="#F0BAA9"/>
            <Circle cx="14.0503" cy="6.77199" r="0.467848" transform="rotate(45 14.0503 6.77199)" fill="#F0BAA9"/>
            <Circle cx="12.0654" cy="6.11037" r="0.467848" transform="rotate(45 12.0654 6.11037)" fill="#F0BAA9"/>
            <Circle cx="12.7271" cy="8.09523" r="0.467848" transform="rotate(45 12.7271 8.09523)" fill="#F0BAA9"/>
          </G>
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_6146_2861">
          <Rect width="24" height="24" fill="white"/>
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent;