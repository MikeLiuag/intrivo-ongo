import * as React from "react"
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from "react-native-svg"

const AddTest = (props) => (
  <Svg
    width={40}
    height={40}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Circle cx={20} cy={20} r={20} fill="#EFEFEF" />
    <Path
      d="M28.167 21.167h-7v7h-2.334v-7h-7v-2.334h7v-7h2.334v7h7v2.334Z"
      fill="url(#a)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={15}
        y1={13.5}
        x2={24.5}
        y2={26.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.038} stopColor="#435592" />
        <Stop offset={0.47} stopColor="#E48753" />
        <Stop offset={1} stopColor="#F3B24E" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default AddTest