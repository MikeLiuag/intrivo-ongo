import * as React from "react"
import Svg, { Path, G, Defs, LinearGradient, Stop } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={475}
    height={167}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M475 0H0l475 167V0Z" fill="#F6C34C" />
    <G opacity={0.6}>
      <Path d="M475 167H0l475-84v84Z" fill="url(#a)" />
      <Path d="M475 167H0l475-84v84Z" fill="url(#b)" />
    </G>
    <Path d="M0 167h475L0 0v167Z" fill="url(#c)" />
    <Path d="M0 167h475L0 0v167Z" fill="url(#d)" />
    <Defs>
      <LinearGradient
        id="a"
        x1={104.043}
        y1={167.351}
        x2={343.386}
        y2={49.873}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFD466" />
        <Stop offset={1} stopColor="#FFD466" stopOpacity={0.43} />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={104.043}
        y1={167.351}
        x2={343.386}
        y2={49.873}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFD466" />
        <Stop offset={1} stopColor="#FFD466" stopOpacity={0.43} />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={270.957}
        y1={167.699}
        x2={-8.986}
        y2={98.584}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFD466" />
        <Stop offset={1} stopColor="#FFD466" stopOpacity={0.43} />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={270.957}
        y1={167.699}
        x2={-8.986}
        y2={98.584}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFD466" />
        <Stop offset={1} stopColor="#FFD466" stopOpacity={0.43} />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default SvgComponent