import * as React from "react"
import Svg, { Mask, Circle, G } from "react-native-svg"

const SvgComponent = ({
  personal
}) => personal ? (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Mask
      id="a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={3}
      y={3}
      width={17}
      height={17}
    >
      <Circle cx={11.5} cy={11.5} r={8.5} fill="#fff" />
    </Mask>
    <G mask="url(#a)">
      <Circle cx={11.5} cy={11.5} r={8.5} fill="#2A4D9B" />
      <Circle cx={7} cy={13} r={8} fill="#F6C34C" />
      <Circle opacity={0.8} cx={13} cy={19} r={5} fill="#EC8950" />
    </G>
  </Svg>
) : (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Circle cx={8} cy={16} r={7} fill="#2A4D9B" />
    <Circle opacity={0.7} cx={14.5} cy={9.5} r={8.5} fill="#F6C34C" />
    <Circle opacity={0.8} cx={5} cy={8} r={5} fill="#EC8950" />
  </Svg>
)

export default SvgComponent
