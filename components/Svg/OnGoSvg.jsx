import * as React from "react"
import Svg, { Ellipse, Path } from "react-native-svg"

const OnGoSvg = (props) => (
  <Svg
    width={43}
    height={43}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Ellipse cx={21.526} cy={21.499} rx={21.474} ry={21.499} fill="#CB514C" />
    <Path
      d="M42.948 21.499H0c0 11.873 9.614 21.499 21.474 21.499s21.474-9.626 21.474-21.499Z"
      fill="#2A4D9B"
    />
    <Path
      d="M21.474.003V43C9.614 43 0 33.376 0 21.503 0 9.629 9.614.003 21.474.003Z"
      fill="#F6C34C"
    />
  </Svg>
)

export default OnGoSvg;