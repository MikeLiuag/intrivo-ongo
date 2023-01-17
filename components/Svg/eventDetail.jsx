import * as React from "react"
import Svg, {
  G,
  Mask,
  Rect,
  Path,
  Ellipse,
  Circle,
  Defs,
  ClipPath,
} from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={295}
    height={88}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Mask
        id="b"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={295}
        height={181}
      >
        <Rect width={294.97} height={180.982} rx={8} fill="#fff" />
      </Mask>
      <G mask="url(#b)">
        <Rect width={294.97} height={180.982} rx={14.479} fill="#2A4D9B" />
        <Path fill="#7DCBF2" d="M0 74.993h55.805v105.989H0z" />
        <Path fill="#F0BAA9" d="M0 74.993h55.805V0H0z" />
        <Path d="M55.805 87.991V.501L0 60.493v27.497h55.805Z" fill="#7DCBF2" />
        <Path
          d="M55.805 87.991v92.491L0 115.488V87.991h55.805Z"
          fill="#EC8950"
        />
        <Path fill="#F6C34C" d="M294.97 105.989h-55.805V0h55.805z" />
        <Path
          d="M239.165 92.99V.5l55.805 64.994V92.99h-55.805Z"
          fill="#CB514C"
        />
      </G>
      <Mask
        id="c"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={55}
        y={0}
        width={184}
        height={181}
      >
        <Ellipse cx={147.485} cy={90.491} rx={91.491} ry={90.491} fill="#fff" />
      </Mask>
      <G mask="url(#c)">
        <Ellipse
          cx={147.485}
          cy={90.491}
          rx={91.491}
          ry={90.491}
          fill="#B8D0F4"
        />
        <Path fill="#9FC3F9" d="M36.996 17.998H97.99V97.99H36.996z" />
        <Path fill="#BDCFEA" d="M31.997 22.997h60.994V91.99H31.997z" />
        <Path fill="#9FC3F9" d="M60.994 17.998h4V97.99h-4z" />
        <Path
          fill="#9FC3F9"
          d="M31.996 45.995v-4H92.99v4zM31.997 70.992v-4h60.994v4zM119.988 17.998h60.994V97.99h-60.994z"
        />
        <Path fill="#BDCFEA" d="M124.987 22.997h50.995V91.99h-50.995z" />
        <Path fill="#9FC3F9" d="M148.985 17.998h4V97.99h-4z" />
        <Path
          fill="#9FC3F9"
          d="M119.988 45.995v-4h60.994v4zM119.988 70.993v-4h60.994v4zM203.979 17.998h60.994V97.99h-60.994z"
        />
        <Path fill="#BDCFEA" d="M208.979 22.997h50.995V91.99h-50.995z" />
        <Path fill="#9FC3F9" d="M232.976 17.998h4V97.99h-4z" />
        <Path
          fill="#9FC3F9"
          d="M203.979 45.995v-4h60.994v4zM203.98 70.993v-4h60.993v4z"
        />
        <Path
          d="M113.272 62.284h14.844l2.047 14.655H112.76l.512-14.655Z"
          fill="#2A4D9B"
        />
        <Path
          d="M101.094 35.945c-1.65-9.469 4.687-18.483 14.155-20.133 9.469-1.651 18.483 4.687 20.133 14.155l2.675 15.34c1.65 9.468-4.687 18.482-14.156 20.133-9.468 1.65-18.482-4.687-20.133-14.156l-2.674-15.34Z"
          fill="#F67F24"
        />
        <Path
          d="M74.748 83.414A14.479 14.479 0 0 1 88.816 72.36h66.812a14.479 14.479 0 0 1 14.283 12.109l5.133 30.94H66.964l7.784-31.994Z"
          fill="#FFD466"
        />
        <Path
          d="M76.172 85.232a14.479 14.479 0 0 1 14.064-11.04h63.384a14.478 14.478 0 0 1 14.281 12.097l4.853 29.119H68.795l7.377-30.176Z"
          fill="#FFC225"
        />
        <Path
          d="M107.265 72.359h27.478v1.832c0 7.588-6.151 13.739-13.739 13.739-7.588 0-13.739-6.151-13.739-13.74V72.36Z"
          fill="#F67F24"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="m113.267 62.439-.507 14.5h17.403l-1.51-10.809a17.368 17.368 0 0 1-15.386-3.692Z"
          fill="#F67F24"
        />
        <Path
          d="M122.378 34.805c.366.367 2.9 3.511 4.121 5.038l-7.327 1.832"
          stroke="#2A4D9B"
          strokeWidth={0.905}
        />
        <Path
          d="m120.088 49.33 3.205-.458 3.206.458v.458s-1.903 2.29-3.206 2.29c-1.302 0-3.205-2.29-3.205-2.29v-.458Z"
          fill="#fff"
        />
        <Circle cx={111.844} cy={12.823} r={12.823} fill="#5ED3FA" />
        <Circle cx={126.805} cy={12.823} r={12.823} fill="#5ED3FA" />
        <Circle cx={97.189} cy={25.646} r={12.823} fill="#39C0ED" />
        <Circle cx={98.105} cy={25.646} r={12.823} fill="#5ED3FA" />
        <Circle cx={94.441} cy={45.797} r={12.823} fill="#39C0ED" />
        <Circle cx={96.273} cy={44.881} r={12.823} fill="#5ED3FA" />
        <Circle cx={96.273} cy={61.368} r={12.823} fill="#5ED3FA" />
        <Circle cx={94.441} cy={63.2} r={12.823} fill="#39C0ED" />
        <Circle cx={96.273} cy={61.368} r={12.823} fill="#5ED3FA" />
        <Circle cx={104.517} cy={40.301} r={6.412} fill="#F67F24" />
        <Circle
          cx={104.578}
          cy={40.179}
          r={3.193}
          stroke="#2A4D9B"
          strokeWidth={0.452}
        />
        <Circle cx={126.041} cy={28.852} r={1.374} fill="#2A4D9B" />
        <Circle cx={117.798} cy={31.6} r={1.374} fill="#2A4D9B" />
        <Path
          d="M182.54 62.284h-14.843l-2.048 14.655h17.403l-.512-14.655Z"
          fill="#2A4D9B"
        />
        <Path
          d="M194.719 35.945c1.65-9.469-4.687-18.483-14.156-20.133-9.469-1.651-18.482 4.687-20.133 14.155l-2.674 15.34c-1.651 9.468 4.687 18.482 14.155 20.133 9.469 1.65 18.483-4.687 20.133-14.156l2.675-15.34Z"
          fill="#FDBAA7"
        />
        <Rect
          x={160.154}
          y={10.991}
          width={33.89}
          height={11.907}
          rx={5.954}
          fill="#2A4D9B"
        />
        <Circle cx={164.734} cy={13.25} r={8.976} fill="#112E6F" />
        <Circle cx={166.107} cy={14.197} r={8.701} fill="#2A4D9B" />
        <Path
          d="M186.724 14.39c2.891-1.76 6.669-.439 7.833 2.74l8.205 22.393a3.029 3.029 0 0 1-.114 2.356c-1.042 2.169-4.073 2.318-5.323.263l-12.397-20.374a5.37 5.37 0 0 1 1.796-7.379Z"
          fill="#2A4D9B"
        />
        <Path
          d="M221.064 83.414a14.478 14.478 0 0 0-14.068-11.055h-66.811a14.479 14.479 0 0 0-14.284 12.109l-5.133 30.94h108.081l-7.785-31.994Z"
          fill="#DB4044"
        />
        <Path
          d="M219.641 85.231a14.48 14.48 0 0 0-14.065-11.04h-63.383a14.48 14.48 0 0 0-14.282 12.098l-4.853 29.119h103.959l-7.376-30.177Z"
          fill="#CB1D21"
        />
        <Path
          d="M188.548 72.359H161.07v1.832c0 7.587 6.151 13.739 13.739 13.739 7.588 0 13.739-6.152 13.739-13.74V72.36Z"
          fill="#FDBAA7"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="m182.546 62.439.506 14.5h-17.403l1.51-10.809a17.367 17.367 0 0 0 15.387-3.691Z"
          fill="#FEBAA7"
        />
        <Path
          d="M173.435 34.805c-.367.367-2.901 3.511-4.122 5.038l2.612 1.485"
          stroke="#2A4D9B"
          strokeWidth={0.905}
        />
        <Path
          d="m177.557 48.414-6.412-.785-6.412.785v.785s3.808 3.925 6.412 3.925 6.412-3.925 6.412-3.925v-.785Z"
          fill="#fff"
        />
        <Circle
          r={6.412}
          transform="matrix(-1 0 0 1 191.296 40.301)"
          fill="#FDBAA7"
        />
        <Circle
          r={3.896}
          transform="matrix(-1 0 0 1 191.754 39.843)"
          stroke="#2A4D9B"
          strokeWidth={0.452}
        />
        <Circle
          r={1.374}
          transform="matrix(-1 0 0 1 169.771 28.852)"
          fill="#2A4D9B"
        />
        <Circle
          r={1.374}
          transform="matrix(-1 0 0 1 178.015 31.6)"
          fill="#2A4D9B"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={295} height={88} rx={8} fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgComponent