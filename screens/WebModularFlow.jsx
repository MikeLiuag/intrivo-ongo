import React, { useRef } from 'react';
import { Alert, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { createObservation } from '../store/app/slice';

const ACTION = 'action';
const EXIT = 'exit';
const SUBMIT = 'submit';
const NAVIGATE = 'navigate';
const WEBVIEW = 'webview';
const DEEPLINK = 'deeplink';

const WebModularFlow = ({
  route: {
    params: { url },
  },
}) => {
  const observationTypes = useSelector((s) => s.app.observationTypes);
  const { uuid: observationId } = observationTypes['covid-19-rapid-antigen-test'];
  const dispatch = useDispatch();
  const { users } = useSelector((s) => s.user);
  const webview = useRef(null);
  const webViewRef = useRef();
  const navigation = useNavigation();

  const webData = `window.addEventListener("message", e => {
  const data = JSON.stringify(e.data);
  window.ReactNativeWebView.postMessage(data);
})`;

  const onSubmit = async (parsedData) => {
    const {
      submit_result: { symptoms },
    } = parsedData;
    const observationObj = {
      observation_type_id: observationId,
      name: 'On/Go™ COVID-19 Antigen Self-Test',
      started_at: new Date(),
      description: 'Self-test app',
      data: {
        // barcode,
        symptomsArray: symptoms,
      },
    };

    const response = await dispatch(
      createObservation({
        uuid: users[0],
        observation: {
          ...observationObj,
          ended_at: new Date(),
          // data,
        },
      })
    );
    if (response?.type.includes('fulfilled')) {
      navigation.goBack();
    }
  };

  const handlePostMessage = ({ type, value }) => {
    switch (type) {
      case ACTION: {
        if (value === EXIT) navigation.goBack();
        break;
      }
      case SUBMIT: {
        onSubmit(value);
        break;
      }
      case NAVIGATE: {
        if (value.type === WEBVIEW)
          navigation.navigate('WebViewHandler', {
            url: value.link,
            observation: false,
          });
        if (value.type === DEEPLINK) navigation.navigate(value.link.split('/')[1]);
        break;
      }
      default:
        return null;
    }
    return null;
  };

  const handleMessage = (event) => {
    const { data } = event.nativeEvent;
    const parsedData = JSON.parse(data);
    handlePostMessage(parsedData);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View ref={webview} collapsable={false} style={{ flexGrow: 1 }}>
          <WebView
            ref={webViewRef}
            source={{ uri: url }}
            onMessage={handleMessage}
            javaScriptEnabled
            injectedJavaScript={webData}
            domStorageEnabled
            useWebKit
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WebModularFlow;
