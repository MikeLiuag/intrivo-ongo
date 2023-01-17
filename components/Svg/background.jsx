import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackGroundSVG(props) {
  return (
    <Svg
      width={400}
      height={379}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path stroke="#84DCFF" d="M-2.48 189.98h188.488v188.488H-2.48z" />
      <Path stroke="#84DCFF" d="M-2.48 284.729h188.488v93.74H-2.48z" />
      <Path stroke="#84DCFF" d="M-2.48 284.729h93.74v93.74H-2.48z" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M92.269 377.968l-.505.001c-51.773 0-93.743-41.971-93.743-93.744s41.97-93.744 93.743-93.744c51.774 0 93.744 41.971 93.744 93.744l-.001.504h.502v9.281c.33-3.217.499-6.481.499-9.785 0-52.326-42.418-94.744-94.744-94.744-52.325 0-94.743 42.418-94.743 94.744s42.418 94.744 94.743 94.744c3.307 0 6.574-.169 9.794-.5h-9.289v-.501z"
        fill="#84DCFF"
      />
      <Path stroke="#84DCFF" d="M186.007 189.98h188.488v188.488H186.007z" />
      <Path
        d="M186.007 378.469L374.495 189.98v188.489H186.007zM-2.48 1.492h188.488V189.98H-2.48z"
        stroke="#84DCFF"
      />
      <Path d="M-.465 189.98L186.007 1.492V189.98H-.465z" stroke="#84DCFF" />
      <Path stroke="#84DCFF" d="M186.006 1.492h188.488V189.98H186.006z" />
      <Path stroke="#84DCFF" d="M186.006 96.24h188.488v93.74H186.006z" />
      <Path stroke="#84DCFF" d="M186.006 96.24h93.74v93.74h-93.74z" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M280.755 188.487l-.504.001c-51.774 0-93.744-41.971-93.744-93.744S228.477 1 280.251 1c51.773 0 93.744 41.97 93.744 93.744 0 .5-.004.998-.012 1.496h.512v8.296c.33-3.219.5-6.486.5-9.792C374.995 42.418 332.576 0 280.251 0c-52.326 0-94.744 42.418-94.744 94.744s42.418 94.744 94.744 94.744l.504-.001v-1z"
        fill="#84DCFF"
      />
    </Svg>
  )
}

export default BackGroundSVG