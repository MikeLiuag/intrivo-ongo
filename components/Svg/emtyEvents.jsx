import * as React from "react";
import Svg, { Mask, Rect, G, Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={295}
    height={181}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Mask
      id="a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={295}
      height={181}
    >
      <Rect width={295} height={181} rx={16} fill="#fff" />
    </Mask>
    <G mask="url(#a)">
      <Rect width={295} height={181} rx={16} fill="#2A4D9B" />
      <Path fill="#7DCBF2" d="M0 75h55.811v106H0z" />
      <Path fill="#EC8950" d="M0 75h55.811V0H0z" />
      <Path d="M55.81 88V.5L0 60.5V88h55.81Z" fill="#CB514C" />
      <Path d="M55.81 88v92.5L0 115.5V88h55.81Z" fill="#EC8950" />
      <Path fill="#7DCBF2" d="M295 106h-55.811V0H295z" />
      <Path fill="#CB514C" d="M295 106h-55.811v75H295z" />
      <Path d="M239.189 93v87.5l55.811-60V93h-55.811Z" fill="#7DCBF2" />
      <Path d="M239.189 93V.5L295 65.5V93h-55.811Z" fill="#F6C34C" />
    </G>
  </Svg>
)

export default SvgComponent