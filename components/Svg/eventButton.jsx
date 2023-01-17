import * as React from "react"
import Svg, { Rect, Path, Mask, G, Circle } from "react-native-svg"

const SvgComponent = ({
    create
}) => create ? (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect x={6.462} width={3.692} height={7.385} rx={1} fill="#EC8950" />
    <Rect x={13.846} width={3.692} height={7.385} rx={1} fill="#EC8950" />
    <Path
      d="M1.846 5.692a2 2 0 0 1 2-2h16.308a2 2 0 0 1 2 2V22a2 2 0 0 1-2 2h-7.232L8 19l-6.154-6.066V5.692Z"
      fill="#2A4D9B"
    />
    <Mask
      id="a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={1}
      y={3}
      width={22}
      height={21}
    >
      <Path
        d="M1.846 5.692a2 2 0 0 1 2-2h16.308a2 2 0 0 1 2 2V22a2 2 0 0 1-2 2H3.846a2 2 0 0 1-2-2V5.692Z"
        fill="#2A4D9B"
      />
    </Mask>
    <G mask="url(#a)" fill="#EC8950">
      <Path
        opacity={0.7}
        d="m12.923 24-5.538-5.538-5.539-5.539h7.385a3.692 3.692 0 0 1 3.692 3.692V24Z"
      />
      <Rect opacity={0.7} x={6.462} width={3.692} height={7.385} rx={1} />
      <Rect opacity={0.7} x={13.846} width={3.692} height={7.385} rx={1} />
    </G>
  </Svg>
) : (
    <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Circle cx={18.5} cy={5.5} r={5.5} fill="#EC8950" />
    <Path
      d="M1.846 5.692a2 2 0 0 1 2-2h16.308a2 2 0 0 1 2 2V22a2 2 0 0 1-2 2h-7.232L8 19l-6.154-6.066V5.692Z"
      fill="#2A4D9B"
    />
    <Mask
      id="a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={1}
      y={3}
      width={22}
      height={21}
    >
      <Path
        d="M1.846 5.692a2 2 0 0 1 2-2h16.308a2 2 0 0 1 2 2V22a2 2 0 0 1-2 2H3.846a2 2 0 0 1-2-2V5.692Z"
        fill="#2A4D9B"
      />
    </Mask>
    <G mask="url(#a)" fill="#EC8950">
      <Circle opacity={0.8} cx={18.5} cy={5.5} r={5.5} />
      <Path
        opacity={0.7}
        d="m12.923 24-5.538-5.538-5.539-5.539h7.385a3.692 3.692 0 0 1 3.692 3.692V24Z"
      />
    </G>
    <Path fill="#2A4D9B" d="M18 3h1v5h-1z" />
    <Path fill="#2A4D9B" d="M16 6V5h5v1z" />
  </Svg>
)

export default SvgComponent