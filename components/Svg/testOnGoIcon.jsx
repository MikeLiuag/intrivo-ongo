import * as React from "react"
import Svg, { G, Circle, Mask, Path, Defs, ClipPath } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Circle cx={17} cy={5} r={4} fill="#2A4D9B" />
      <Mask
        id="b"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={-2}
        y={0}
        width={24}
        height={24}
      >
        <Path
          d="M10.681 1.414a2 2 0 0 1 2.829 0l7.054 7.054a2 2 0 0 1 0 2.829L9.274 22.586a2 2 0 0 1-2.828 0l-7.054-7.054a2 2 0 0 1 0-2.829l11.29-11.289Z"
          fill="#CB514C"
        />
      </Mask>
      <G >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.51 1.414a2 2 0 0 0-2.829 0L2.213 9.882l2.821 2.821a2 2 0 0 1 0 2.829l-2.82 2.82 4.232 4.234a2 2 0 0 0 2.829 0l11.289-11.29a2 2 0 0 0 0-2.828L13.51 1.414Z"
          fill="#CB514C"
        />
        <Circle opacity={0.6} cx={17.088} cy={4.914} r={3.822} fill="#2A4D9B" />
        <Path
          opacity={0.7}
          d="m2.213 9.882 2.821 2.821a2 2 0 0 1 0 2.829l-2.82 2.82V9.884Z"
          fill="#2A4D9B"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgComponent