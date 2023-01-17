import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Plate = (props) => (
  <Svg
    width={20}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M0 12h20v2H0v-2Zm11.84-9.21A2.006 2.006 0 0 0 10 0a2.006 2.006 0 0 0-1.84 2.79C4.25 3.6 1.27 6.93 1 11h18c-.27-4.07-3.25-7.4-7.16-8.21Z"
      fill="#323232"
    />
  </Svg>
)

export default Plate
