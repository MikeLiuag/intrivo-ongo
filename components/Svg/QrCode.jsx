import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function QrCode({ size, ...props }) {
  return (
    <Svg
      width={size || hp('20%')}
      height={size || hp('20%')}
      viewBox="0 0 133 133"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M12.634 7.98H7.98v4.654h4.655V7.98z" fill="#F6C34C" />
      <Path
        d="M17.29 7.98h-4.655v4.654h4.655V7.98zM21.945 7.98H17.29v4.654h4.655V7.98z"
        fill="#F6C34C"
      />
      <Path
        d="M26.6 7.98h-4.656v4.654H26.6V7.98zM31.255 7.98H26.6v4.654h4.655V7.98zM35.91 7.98h-4.654v4.654h4.655V7.98z"
        fill="#F6C34C"
      />
      <Path
        d="M40.565 7.98H35.91v4.654h4.655V7.98zM49.874 7.98H45.22v4.654h4.655V7.98zM59.184 7.98h-4.655v4.654h4.655V7.98zM68.495 7.98H63.84v4.654h4.655V7.98zM77.805 7.98H73.15v4.654h4.655V7.98zM87.115 7.98H82.46v4.654h4.655V7.98zM96.424 7.98H91.77v4.654h4.655V7.98zM101.08 7.98h-4.655v4.654h4.655V7.98z"
        fill="#F6C34C"
      />
      <Path
        d="M105.734 7.98h-4.655v4.654h4.655V7.98zM110.39 7.98h-4.655v4.654h4.655V7.98zM115.045 7.98h-4.655v4.654h4.655V7.98z"
        fill="#F6C34C"
      />
      <Path
        d="M119.699 7.98h-4.655v4.654h4.655V7.98zM124.355 7.98h-4.654v4.654h4.654V7.98zM12.634 12.634H7.98v4.655h4.655v-4.655zM40.565 12.634H35.91v4.655h4.655v-4.655zM54.53 12.634h-4.655v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M59.184 12.634h-4.655v4.655h4.655v-4.655zM63.84 12.634h-4.656v4.655h4.656v-4.655zM68.495 12.634H63.84v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M73.15 12.634h-4.656v4.655h4.655v-4.655zM87.115 12.634H82.46v4.655h4.655v-4.655zM96.424 12.634H91.77v4.655h4.655v-4.655zM124.355 12.634h-4.654v4.655h4.654v-4.655zM12.634 17.29H7.98v4.655h4.655V17.29zM21.945 17.29H17.29v4.655h4.655V17.29z"
        fill="#F6C34C"
      />
      <Path
        d="M26.6 17.29h-4.656v4.655H26.6V17.29zM31.255 17.29H26.6v4.655h4.655V17.29zM40.565 17.29H35.91v4.655h4.655V17.29zM49.874 17.29H45.22v4.655h4.655V17.29zM54.53 17.29h-4.655v4.655h4.655V17.29z"
        fill="#F6C34C"
      />
      <Path
        d="M59.184 17.29h-4.655v4.655h4.655V17.29zM73.15 17.29h-4.656v4.655h4.655V17.29zM87.115 17.29H82.46v4.655h4.655V17.29zM96.424 17.29H91.77v4.655h4.655V17.29zM105.734 17.29h-4.655v4.655h4.655V17.29zM110.39 17.29h-4.655v4.655h4.655V17.29zM115.045 17.29h-4.655v4.655h4.655V17.29zM124.355 17.29h-4.654v4.655h4.654V17.29zM12.634 21.944H7.98V26.6h4.655v-4.655zM21.945 21.944H17.29V26.6h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M26.6 21.944h-4.656V26.6H26.6v-4.655zM31.255 21.944H26.6V26.6h4.655v-4.655zM40.565 21.944H35.91V26.6h4.655v-4.655zM49.874 21.944H45.22V26.6h4.655v-4.655zM54.53 21.944h-4.655V26.6h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M59.184 21.944h-4.655V26.6h4.655v-4.655zM68.495 21.944H63.84V26.6h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M73.15 21.944h-4.656V26.6h4.655v-4.655zM77.805 21.944H73.15V26.6h4.655v-4.655zM96.424 21.944H91.77V26.6h4.655v-4.655zM105.734 21.944h-4.655V26.6h4.655v-4.655zM110.39 21.944h-4.655V26.6h4.655v-4.655zM115.045 21.944h-4.655V26.6h4.655v-4.655zM124.355 21.944h-4.654V26.6h4.654v-4.655zM12.634 26.6H7.98v4.654h4.655V26.6zM21.945 26.6H17.29v4.654h4.655V26.6z"
        fill="#F6C34C"
      />
      <Path
        d="M26.6 26.6h-4.656v4.654H26.6V26.6zM31.255 26.6H26.6v4.654h4.655V26.6zM40.565 26.6H35.91v4.654h4.655V26.6zM49.874 26.6H45.22v4.654h4.655V26.6zM63.84 26.6h-4.656v4.654h4.656V26.6zM68.495 26.6H63.84v4.654h4.655V26.6z"
        fill="#F6C34C"
      />
      <Path
        d="M73.15 26.6h-4.656v4.654h4.655V26.6zM77.805 26.6H73.15v4.654h4.655V26.6zM82.46 26.6h-4.654v4.654h4.655V26.6z"
        fill="#F6C34C"
      />
      <Path
        d="M87.115 26.6H82.46v4.654h4.655V26.6zM96.424 26.6H91.77v4.654h4.655V26.6zM105.734 26.6h-4.655v4.654h4.655V26.6zM110.39 26.6h-4.655v4.654h4.655V26.6zM115.045 26.6h-4.655v4.654h4.655V26.6zM124.355 26.6h-4.654v4.654h4.654V26.6zM12.634 31.255H7.98v4.655h4.655v-4.655zM40.565 31.255H35.91v4.655h4.655v-4.655zM59.184 31.255h-4.655v4.655h4.655v-4.655zM63.84 31.255h-4.656v4.655h4.656v-4.655zM77.805 31.255H73.15v4.655h4.655v-4.655zM87.115 31.255H82.46v4.655h4.655v-4.655zM96.424 31.255H91.77v4.655h4.655v-4.655zM124.355 31.255h-4.654v4.655h4.654v-4.655zM12.634 35.91H7.98v4.655h4.655V35.91z"
        fill="#F6C34C"
      />
      <Path
        d="M17.29 35.91h-4.655v4.655h4.655V35.91zM21.945 35.91H17.29v4.655h4.655V35.91z"
        fill="#F6C34C"
      />
      <Path
        d="M26.6 35.91h-4.656v4.655H26.6V35.91zM31.255 35.91H26.6v4.655h4.655V35.91zM35.91 35.91h-4.654v4.655h4.655V35.91z"
        fill="#F6C34C"
      />
      <Path
        d="M40.565 35.91H35.91v4.655h4.655V35.91zM49.874 35.91H45.22v4.655h4.655V35.91zM59.184 35.91h-4.655v4.655h4.655V35.91zM68.495 35.91H63.84v4.655h4.655V35.91zM77.805 35.91H73.15v4.655h4.655V35.91zM87.115 35.91H82.46v4.655h4.655V35.91zM96.424 35.91H91.77v4.655h4.655V35.91zM101.08 35.91h-4.655v4.655h4.655V35.91z"
        fill="#F6C34C"
      />
      <Path
        d="M105.734 35.91h-4.655v4.655h4.655V35.91zM110.39 35.91h-4.655v4.655h4.655V35.91zM115.045 35.91h-4.655v4.655h4.655V35.91z"
        fill="#F6C34C"
      />
      <Path
        d="M119.699 35.91h-4.655v4.655h4.655V35.91zM124.355 35.91h-4.654v4.655h4.654V35.91zM59.184 40.564h-4.655v4.655h4.655v-4.655zM68.495 40.564H63.84v4.655h4.655v-4.655zM82.46 40.564h-4.654v4.655h4.655v-4.655zM12.634 45.219H7.98v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M17.29 45.219h-4.655v4.655h4.655v-4.655zM21.945 45.219H17.29v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M26.6 45.219h-4.656v4.655H26.6v-4.655zM40.565 45.219H35.91v4.655h4.655v-4.655zM49.874 45.219H45.22v4.655h4.655v-4.655zM59.184 45.219h-4.655v4.655h4.655v-4.655zM63.84 45.219h-4.656v4.655h4.656v-4.655zM91.77 45.219h-4.654v4.655h4.654v-4.655zM105.734 45.219h-4.655v4.655h4.655v-4.655zM110.39 45.219h-4.655v4.655h4.655v-4.655zM115.045 45.219h-4.655v4.655h4.655v-4.655zM124.355 45.219h-4.654v4.655h4.654v-4.655zM12.634 49.874H7.98v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M17.29 49.874h-4.655v4.655h4.655v-4.655zM31.255 49.874H26.6v4.655h4.655v-4.655zM59.184 49.874h-4.655v4.655h4.655v-4.655zM68.495 49.874H63.84v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M73.15 49.874h-4.656v4.655h4.655v-4.655zM87.115 49.874H82.46v4.655h4.655v-4.655zM91.77 49.874h-4.654v4.655h4.654v-4.655zM101.08 49.874h-4.655v4.655h4.655v-4.655zM119.699 49.874h-4.655v4.655h4.655v-4.655zM12.634 54.53H7.98v4.654h4.655V54.53zM21.945 54.53H17.29v4.654h4.655V54.53zM40.565 54.53H35.91v4.654h4.655V54.53zM45.22 54.53h-4.654v4.654h4.654V54.53zM49.874 54.53H45.22v4.654h4.655V54.53zM54.53 54.53h-4.655v4.654h4.655V54.53z"
        fill="#F6C34C"
      />
      <Path
        d="M59.184 54.53h-4.655v4.654h4.655V54.53zM63.84 54.53h-4.656v4.654h4.656V54.53zM73.15 54.53h-4.656v4.654h4.655V54.53zM101.08 54.53h-4.655v4.654h4.655V54.53zM12.634 59.184H7.98v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M17.29 59.184h-4.655v4.655h4.655v-4.655zM54.53 59.184h-4.655v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M59.184 59.184h-4.655v4.655h4.655v-4.655zM73.15 59.184h-4.656v4.655h4.655v-4.655zM91.77 59.184h-4.654v4.655h4.654v-4.655zM96.424 59.184H91.77v4.655h4.655v-4.655zM110.39 59.184h-4.655v4.655h4.655v-4.655zM115.045 59.184h-4.655v4.655h4.655v-4.655zM12.634 63.84H7.98v4.655h4.655V63.84zM26.6 63.84h-4.656v4.655H26.6V63.84zM35.91 63.84h-4.654v4.655h4.655V63.84z"
        fill="#F6C34C"
      />
      <Path
        d="M40.565 63.84H35.91v4.655h4.655V63.84zM49.874 63.84H45.22v4.655h4.655V63.84zM54.53 63.84h-4.655v4.655h4.655V63.84z"
        fill="#F6C34C"
      />
      <Path
        d="M59.184 63.84h-4.655v4.655h4.655V63.84zM73.15 63.84h-4.656v4.655h4.655V63.84zM77.805 63.84H73.15v4.655h4.655V63.84zM82.46 63.84h-4.654v4.655h4.655V63.84z"
        fill="#F6C34C"
      />
      <Path
        d="M87.115 63.84H82.46v4.655h4.655V63.84zM91.77 63.84h-4.654v4.655h4.654V63.84zM96.424 63.84H91.77v4.655h4.655V63.84zM101.08 63.84h-4.655v4.655h4.655V63.84z"
        fill="#F6C34C"
      />
      <Path
        d="M105.734 63.84h-4.655v4.655h4.655V63.84zM115.045 63.84h-4.655v4.655h4.655V63.84z"
        fill="#F6C34C"
      />
      <Path
        d="M119.699 63.84h-4.655v4.655h4.655V63.84zM124.355 63.84h-4.654v4.655h4.654V63.84zM21.945 68.495H17.29v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M26.6 68.495h-4.656v4.655H26.6v-4.655zM31.255 68.495H26.6v4.655h4.655v-4.655zM35.91 68.495h-4.654v4.655h4.655v-4.655zM45.22 68.495h-4.654v4.655h4.654v-4.655zM68.495 68.495H63.84v4.655h4.655v-4.655zM77.805 68.495H73.15v4.655h4.655v-4.655zM82.46 68.495h-4.654v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M87.115 68.495H82.46v4.655h4.655v-4.655zM96.424 68.495H91.77v4.655h4.655v-4.655zM101.08 68.495h-4.655v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M105.734 68.495h-4.655v4.655h4.655v-4.655zM124.355 68.495h-4.654v4.655h4.654v-4.655zM17.29 73.15h-4.655v4.655h4.655V73.15zM21.945 73.15H17.29v4.655h4.655V73.15zM35.91 73.15h-4.654v4.655h4.655V73.15z"
        fill="#F6C34C"
      />
      <Path
        d="M40.565 73.15H35.91v4.655h4.655V73.15zM49.874 73.15H45.22v4.655h4.655V73.15zM87.115 73.15H82.46v4.655h4.655V73.15zM91.77 73.15h-4.654v4.655h4.654V73.15zM105.734 73.15h-4.655v4.655h4.655V73.15zM115.045 73.15h-4.655v4.655h4.655V73.15z"
        fill="#F6C34C"
      />
      <Path
        d="M119.699 73.15h-4.655v4.655h4.655V73.15zM12.634 77.805H7.98v4.655h4.655v-4.655zM21.945 77.805H17.29v4.655h4.655v-4.655zM31.255 77.805H26.6v4.655h4.655v-4.655zM35.91 77.805h-4.654v4.655h4.655v-4.655zM45.22 77.805h-4.654v4.655h4.654v-4.655zM68.495 77.805H63.84v4.655h4.655v-4.655zM77.805 77.805H73.15v4.655h4.655v-4.655zM87.115 77.805H82.46v4.655h4.655v-4.655zM91.77 77.805h-4.654v4.655h4.654v-4.655zM101.08 77.805h-4.655v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M105.734 77.805h-4.655v4.655h4.655v-4.655zM124.355 77.805h-4.654v4.655h4.654v-4.655zM26.6 82.46h-4.656v4.654H26.6V82.46zM40.565 82.46H35.91v4.654h4.655V82.46zM45.22 82.46h-4.654v4.654h4.654V82.46zM63.84 82.46h-4.656v4.654h4.656V82.46zM68.495 82.46H63.84v4.654h4.655V82.46z"
        fill="#F6C34C"
      />
      <Path
        d="M73.15 82.46h-4.656v4.654h4.655V82.46zM82.46 82.46h-4.654v4.654h4.655V82.46z"
        fill="#F6C34C"
      />
      <Path
        d="M87.115 82.46H82.46v4.654h4.655V82.46zM91.77 82.46h-4.654v4.654h4.654V82.46zM96.424 82.46H91.77v4.654h4.655V82.46zM101.08 82.46h-4.655v4.654h4.655V82.46z"
        fill="#F6C34C"
      />
      <Path
        d="M105.734 82.46h-4.655v4.654h4.655V82.46zM110.39 82.46h-4.655v4.654h4.655V82.46zM115.045 82.46h-4.655v4.654h4.655V82.46z"
        fill="#F6C34C"
      />
      <Path
        d="M119.699 82.46h-4.655v4.654h4.655V82.46zM124.355 82.46h-4.654v4.654h4.654V82.46zM49.874 87.114H45.22v4.655h4.655v-4.655zM54.53 87.114h-4.655v4.655h4.655v-4.655zM63.84 87.114h-4.656v4.655h4.656v-4.655zM68.495 87.114H63.84v4.655h4.655v-4.655zM87.115 87.114H82.46v4.655h4.655v-4.655zM105.734 87.114h-4.655v4.655h4.655v-4.655zM115.045 87.114h-4.655v4.655h4.655v-4.655zM124.355 87.114h-4.654v4.655h4.654v-4.655zM12.634 91.77H7.98v4.654h4.655V91.77z"
        fill="#F6C34C"
      />
      <Path
        d="M17.29 91.77h-4.655v4.654h4.655V91.77zM21.945 91.77H17.29v4.654h4.655V91.77z"
        fill="#F6C34C"
      />
      <Path
        d="M26.6 91.77h-4.656v4.654H26.6V91.77zM31.255 91.77H26.6v4.654h4.655V91.77zM35.91 91.77h-4.654v4.654h4.655V91.77z"
        fill="#F6C34C"
      />
      <Path
        d="M40.565 91.77H35.91v4.654h4.655V91.77zM54.53 91.77h-4.655v4.654h4.655V91.77z"
        fill="#F6C34C"
      />
      <Path
        d="M59.184 91.77h-4.655v4.654h4.655V91.77zM73.15 91.77h-4.656v4.654h4.655V91.77zM77.805 91.77H73.15v4.654h4.655V91.77zM87.115 91.77H82.46v4.654h4.655V91.77zM96.424 91.77H91.77v4.654h4.655V91.77zM105.734 91.77h-4.655v4.654h4.655V91.77zM115.045 91.77h-4.655v4.654h4.655V91.77z"
        fill="#F6C34C"
      />
      <Path
        d="M119.699 91.77h-4.655v4.654h4.655V91.77zM124.355 91.77h-4.654v4.654h4.654V91.77zM12.634 96.425H7.98v4.655h4.655v-4.655zM40.565 96.425H35.91v4.655h4.655v-4.655zM59.184 96.425h-4.655v4.655h4.655v-4.655zM63.84 96.425h-4.656v4.655h4.656v-4.655zM82.46 96.425h-4.654v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M87.115 96.425H82.46v4.655h4.655v-4.655zM105.734 96.425h-4.655v4.655h4.655v-4.655zM124.355 96.425h-4.654v4.655h4.654v-4.655zM12.634 101.079H7.98v4.655h4.655v-4.655zM21.945 101.079H17.29v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M26.6 101.079h-4.656v4.655H26.6v-4.655zM31.255 101.079H26.6v4.655h4.655v-4.655zM40.565 101.079H35.91v4.655h4.655v-4.655zM54.53 101.079h-4.655v4.655h4.655v-4.655zM77.805 101.079H73.15v4.655h4.655v-4.655zM87.115 101.079H82.46v4.655h4.655v-4.655zM91.77 101.079h-4.654v4.655h4.654v-4.655zM96.424 101.079H91.77v4.655h4.655v-4.655zM101.08 101.079h-4.655v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M105.734 101.079h-4.655v4.655h4.655v-4.655zM110.39 101.079h-4.655v4.655h4.655v-4.655zM124.355 101.079h-4.654v4.655h4.654v-4.655zM12.634 105.735H7.98v4.655h4.655v-4.655zM21.945 105.735H17.29v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M26.6 105.735h-4.656v4.655H26.6v-4.655zM31.255 105.735H26.6v4.655h4.655v-4.655zM40.565 105.735H35.91v4.655h4.655v-4.655zM49.874 105.735H45.22v4.655h4.655v-4.655zM54.53 105.735h-4.655v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M59.184 105.735h-4.655v4.655h4.655v-4.655zM63.84 105.735h-4.656v4.655h4.656v-4.655zM73.15 105.735h-4.656v4.655h4.655v-4.655zM96.424 105.735H91.77v4.655h4.655v-4.655zM105.734 105.735h-4.655v4.655h4.655v-4.655zM110.39 105.735h-4.655v4.655h4.655v-4.655zM115.045 105.735h-4.655v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M119.699 105.735h-4.655v4.655h4.655v-4.655zM124.355 105.735h-4.654v4.655h4.654v-4.655zM12.634 110.389H7.98v4.655h4.655v-4.655zM21.945 110.389H17.29v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M26.6 110.389h-4.656v4.655H26.6v-4.655zM31.255 110.389H26.6v4.655h4.655v-4.655zM40.565 110.389H35.91v4.655h4.655v-4.655zM49.874 110.389H45.22v4.655h4.655v-4.655zM54.53 110.389h-4.655v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M59.184 110.389h-4.655v4.655h4.655v-4.655zM63.84 110.389h-4.656v4.655h4.656v-4.655zM68.495 110.389H63.84v4.655h4.655v-4.655zM87.115 110.389H82.46v4.655h4.655v-4.655zM91.77 110.389h-4.654v4.655h4.654v-4.655zM96.424 110.389H91.77v4.655h4.655v-4.655zM105.734 110.389h-4.655v4.655h4.655v-4.655zM115.045 110.389h-4.655v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M119.699 110.389h-4.655v4.655h4.655v-4.655zM12.634 115.045H7.98v4.655h4.655v-4.655zM40.565 115.045H35.91v4.655h4.655v-4.655zM49.874 115.045H45.22v4.655h4.655v-4.655zM59.184 115.045h-4.655v4.655h4.655v-4.655zM63.84 115.045h-4.656v4.655h4.656v-4.655zM68.495 115.045H63.84v4.655h4.655v-4.655z"
        fill="#F6C34C"
      />
      <Path
        d="M73.15 115.045h-4.656v4.655h4.655v-4.655zM77.805 115.045H73.15v4.655h4.655v-4.655zM91.77 115.045h-4.654v4.655h4.654v-4.655zM96.424 115.045H91.77v4.655h4.655v-4.655zM105.734 115.045h-4.655v4.655h4.655v-4.655zM115.045 115.045h-4.655v4.655h4.655v-4.655zM12.634 119.7H7.98v4.655h4.655V119.7z"
        fill="#F6C34C"
      />
      <Path
        d="M17.29 119.7h-4.655v4.655h4.655V119.7zM21.945 119.7H17.29v4.655h4.655V119.7z"
        fill="#F6C34C"
      />
      <Path
        d="M26.6 119.7h-4.656v4.655H26.6V119.7zM31.255 119.7H26.6v4.655h4.655V119.7zM35.91 119.7h-4.654v4.655h4.655V119.7z"
        fill="#F6C34C"
      />
      <Path
        d="M40.565 119.7H35.91v4.655h4.655V119.7zM49.874 119.7H45.22v4.655h4.655V119.7zM63.84 119.7h-4.656v4.655h4.656V119.7zM68.495 119.7H63.84v4.655h4.655V119.7z"
        fill="#F6C34C"
      />
      <Path
        d="M73.15 119.7h-4.656v4.655h4.655V119.7zM101.08 119.7h-4.655v4.655h4.655V119.7z"
        fill="#F6C34C"
      />
      <Path
        d="M105.734 119.7h-4.655v4.655h4.655V119.7zM110.39 119.7h-4.655v4.655h4.655V119.7zM115.045 119.7h-4.655v4.655h4.655V119.7z"
        fill="#F6C34C"
      />
      <Path
        d="M119.699 119.7h-4.655v4.655h4.655V119.7zM124.355 119.7h-4.654v4.655h4.654V119.7z"
        fill="#F6C34C"
      />
    </Svg>
  );
}

export default QrCode;