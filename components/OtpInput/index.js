import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Keyboard } from 'react-native';

const CODE_LENGTH = 6;

const CodeInput = ({
  codeLength = CODE_LENGTH,
  onChange = () => null,
  keyboardType,
  autoCap,
}) => {
  const [code, setCode] = useState('');

  const codeDigitsArray = Array.from({ length: codeLength }, (_, i) => i); // initialize array

  const ref = useRef();

  // this effect is needed for some android devices that don't respect autofocus prop on TextInput
  useEffect(() => {
    setTimeout(() => {
      if(!ref.current?.isFocused()){
        ref.current?.focus();
      }
    }, 250);
  }, []);

  const handleOnPress = () => {
    ref.current.blur();
    ref.current?.focus();
  };

  const handleOnChange = (newCode) => {
    setCode(newCode);
    onChange(newCode);
  };

  const toDigitInput = (_value, idx) => {
    const emptyInputChar = ' ';
    const digit = code[idx] || emptyInputChar;

    // const isCurrentDigit = idx === code.length;
    // const isLastDigit = idx === CODE_LENGTH - 1;
    // const isCodeFull = code.length === CODE_LENGTH;
    const hasDigit = digit !== emptyInputChar;

    // const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    // const containerStyle =
    //   containerIsFocused && isFocused
    //     ? { ...style.inputContainer, ...style.inputContainerFocused }
    //     : style.inputContainer;

    const containerStyle = hasDigit ? style.inputContainer : style.inputDot;

    return (
      <View key={idx} style={containerStyle}>
        <Text allowFontScaling={false} style={style.inputText}>
          {digit}
        </Text>
      </View>
    );
  };

  return (
    <Pressable style={style.container} onPress={handleOnPress}>
      <View style={style.inputsContainer}>
        {codeDigitsArray.map(toDigitInput)}
      </View>
      <TextInput
        ref={ref}
        onChangeText={handleOnChange}
        keyboardType={keyboardType || 'number-pad'}
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={codeLength}
        style={style.hiddenCodeInput}
        autoCapitalize={autoCap || 'none'}
      />
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width:'100%',
  },
  inputContainer: {
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputDot: {
    marginHorizontal: 6,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#C0E4F6',
    backgroundColor: '#C0E4F6',
  },
  inputContainerFocused: {
    // borderColor: '#0f5181',
  },
  inputText: {
    fontSize: 36,
  },
  hiddenCodeInput: {
    height: 1,
    width: 1,
    opacity: 0,
  },
});

export default CodeInput;
