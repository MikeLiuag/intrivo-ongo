import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Drink = (props) => (
  <Svg
    width={18}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m0 0 2.01 18.23C2.13 19.23 2.97 20 4 20h10c1.03 0 1.87-.77 1.99-1.77L18 0H0Zm9 17c-1.66 0-3-1.34-3-3 0-2 3-5.4 3-5.4s3 3.4 3 5.4c0 1.66-1.34 3-3 3Zm6.33-11H2.67l-.44-4h13.53l-.43 4Z"
      fill="#323232"
    />
  </Svg>
)

export default Drink
