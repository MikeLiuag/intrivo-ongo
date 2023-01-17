import * as React from "react"
import Svg, {
  G,
  Rect,
  Circle,
  Mask,
  Defs,
  ClipPath,
  Path,
} from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Rect
        x={14.05}
        y={-0.506}
        width={10.293}
        height={10.293}
        rx={2}
        transform="rotate(45 14.05 -.506)"
        fill="#F0BAA9"
      />
      <Circle
        cx={14.05}
        cy={6.772}
        r={3.275}
        transform="rotate(45 14.05 6.772)"
        fill="#CB514C"
      />
      <Circle
        cx={15.373}
        cy={5.449}
        r={0.468}
        transform="rotate(45 15.373 5.449)"
        fill="#F0BAA9"
      />
      <Circle
        cx={14.712}
        cy={8.757}
        r={0.468}
        transform="rotate(45 14.712 8.757)"
        fill="#F0BAA9"
      />
      <Circle
        cx={16.035}
        cy={7.434}
        r={0.468}
        transform="rotate(45 16.035 7.434)"
        fill="#F0BAA9"
      />
      <Circle
        cx={13.388}
        cy={4.787}
        r={0.468}
        transform="rotate(45 13.388 4.787)"
        fill="#F0BAA9"
      />
      <Circle
        cx={14.05}
        cy={6.772}
        r={0.468}
        transform="rotate(45 14.05 6.772)"
        fill="#F0BAA9"
      />
      <Circle
        cx={12.065}
        cy={6.11}
        r={0.468}
        transform="rotate(45 12.065 6.11)"
        fill="#F0BAA9"
      />
      <Circle
        cx={12.727}
        cy={8.095}
        r={0.468}
        transform="rotate(45 12.727 8.095)"
        fill="#F0BAA9"
      />
      <Rect
        x={14.176}
        y={4.824}
        width={11.617}
        height={16.613}
        rx={2}
        transform="rotate(45 14.176 4.824)"
        fill="#2A4D9B"
      />
      <Mask
        id="b"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={3}
        y={5}
        width={18}
        height={18}
      >
        <Rect
          x={14.176}
          y={4.824}
          width={9.913}
          height={16.613}
          rx={2}
          transform="rotate(45 14.176 4.824)"
          fill="#2A4D9B"
        />
      </Mask>
      <G opacity={0.7} mask="url(#b)">
        <Rect
          x={14.05}
          y={-0.506}
          width={10.293}
          height={10.293}
          rx={2}
          transform="rotate(45 14.05 -.506)"
          fill="#F0BAA9"
        />
        <Circle
          cx={14.05}
          cy={6.772}
          r={3.275}
          transform="rotate(45 14.05 6.772)"
          fill="#CB514C"
        />
        <Circle
          cx={15.373}
          cy={5.449}
          r={0.468}
          transform="rotate(45 15.373 5.449)"
          fill="#F0BAA9"
        />
        <Circle
          cx={14.712}
          cy={8.757}
          r={0.468}
          transform="rotate(45 14.712 8.757)"
          fill="#F0BAA9"
        />
        <Circle
          cx={16.035}
          cy={7.434}
          r={0.468}
          transform="rotate(45 16.035 7.434)"
          fill="#F0BAA9"
        />
        <Circle
          cx={14.05}
          cy={6.772}
          r={0.468}
          transform="rotate(45 14.05 6.772)"
          fill="#F0BAA9"
        />
        <Circle
          cx={12.065}
          cy={6.11}
          r={0.468}
          transform="rotate(45 12.065 6.11)"
          fill="#F0BAA9"
        />
        <Circle
          cx={12.727}
          cy={8.095}
          r={0.468}
          transform="rotate(45 12.727 8.095)"
          fill="#F0BAA9"
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