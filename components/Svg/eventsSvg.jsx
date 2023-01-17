import * as React from "react"
import Svg, { G, Rect, Mask, Path, Defs, ClipPath } from "react-native-svg"

const SvgComponent = ({
  small
}) => small ? (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect x={6.462} width={3.692} height={7.385} rx={1} fill="#EC8950" />
    <Rect x={13.846} width={3.692} height={7.385} rx={1} fill="#EC8950" />
    <Rect
      x={1.846}
      y={3.692}
      width={20.308}
      height={20.308}
      rx={2}
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
      <Rect
        x={1.846}
        y={3.692}
        width={20.308}
        height={20.308}
        rx={2}
        fill="#2A4D9B"
      />
    </Mask>
    <G fill="#EC8950">
      <Path d="m1.846 12.923 5.539 5.539L12.923 24H1.846V12.923Z" />
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
    width={44}
    height={44}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clipPath="url(#a)">
      <Rect
        x={12.031}
        y={0.4}
        width={6.646}
        height={13.292}
        rx={1.8}
        fill="#EC8950"
      />
      <Rect
        x={25.323}
        y={0.4}
        width={6.646}
        height={13.292}
        rx={1.8}
        fill="#EC8950"
      />
      <Rect
        x={3.723}
        y={7.046}
        width={36.554}
        height={36.554}
        rx={3.6}
        fill="#2A4D9B"
      />
      <Mask
        id="b"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={3}
        y={7}
        width={38}
        height={37}
      >
        <Rect
          x={3.723}
          y={7.046}
          width={36.554}
          height={36.554}
          rx={3.6}
          fill="#2A4D9B"
        />
      </Mask>
      <G mask="url(#b)" fill="#EC8950">
        <Path d="m3.723 23.662 9.97 9.969 9.969 9.969H3.723V23.661Z" />
        <Path
          opacity={0.7}
          d="m23.662 43.6-9.97-9.97-9.969-9.969h13.292a6.646 6.646 0 0 1 6.646 6.647V43.6Z"
        />
        <Rect
          opacity={0.7}
          x={12.031}
          y={0.4}
          width={6.646}
          height={13.292}
          rx={1.8}
        />
        <Rect
          opacity={0.7}
          x={25.323}
          y={0.4}
          width={6.646}
          height={13.292}
          rx={1.8}
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(.4 .4)" d="M0 0h43.2v43.2H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgComponent