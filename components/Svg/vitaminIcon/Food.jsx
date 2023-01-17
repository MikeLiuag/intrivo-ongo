import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Food = (props) => (
  <Svg
    width={18}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M8 7H6V0H4v7H2V0H0v7c0 2.12 1.66 3.84 3.75 3.97V20h2.5v-9.03C8.34 10.84 10 9.12 10 7V0H8v7Zm5-3v8h2.5v8H18V0c-2.76 0-5 2.24-5 4Z"
      fill="#323232"
    />
  </Svg>
)

export default Food