import { useState, useEffect } from 'react';
import { Keyboard, Dimensions } from 'react-native';

const useIsFloatingKeyboard = () => {
  const windowWidth = Dimensions.get('window').width;

  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const onKeyboardWillChangeFrame = (event) => {
      setFloating(event.endCoordinates.width !== windowWidth);
    };

    const keyboardSubscription = Keyboard.addListener(
      'keyboardWillChangeFrame',
      onKeyboardWillChangeFrame
    );
    return () => {
      keyboardSubscription.remove();
    };
  }, [windowWidth]);

  return floating;
};

export default useIsFloatingKeyboard;
