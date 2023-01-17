import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { TouchableOpacity, View, Text, Linking, Platform } from 'react-native';
import LoaderComp from '../components/LoaderComp';
import CompletedScreen from '../components/CompletedScreen';
import { openLink } from '../utilis/link';

const ZoomWebView = ({
  navigation,
  route: {
    params: { url, purpose },
  },
}) => {
  const webViewRef = useRef();

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [isEnded, setIsEnded] = useState(false);

  const onMessage = (event) => {
    console.log(event.nativeEvent.data);
    if (
      event.nativeEvent.data === 'zoom-meeting-connected' ||
      event.nativeEvent.data === 'zoom-meeting-fail'
    ) {
      setIsLoading(false);
    }
    if (event.nativeEvent.data === 'zoom-meeting-closed') {
      setIsEnded(true);
    }
  };

  const onRequestClose = () => {
    navigation.goBack();
    navigation.navigate('CarePlan', {
      from: 'zoomViewer',
      purpose,
      showFeedbackPopup: purpose === 'sniffles',
    });
  };

  const onAudioIssues = () => {
    openLink(navigation, true, { url, useWebView: false });
    setIsEnded(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        onMessage={onMessage}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        allowsFullscreenVideo
      />
      {Platform.OS === 'ios' && (
        <View style={{ padding: 4 }}>
          <Text style={{ fontSize: 12 }}>
            <View>
              <Text style={{ color: '#3E3E3E', fontSize: 12, fontFamily: 'Museo_300' }}>
                Are you experiencing audio issues?{' '}
              </Text>
            </View>
            <TouchableOpacity onPress={onAudioIssues}>
              <Text style={{ color: '#3E3E3E', fontSize: 12, fontFamily: 'Museo_500' }}>
                Open session in browser
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      )}
      <LoaderComp visible={isLoading} onRequestClose={onRequestClose} />
      {isEnded && (
        <CompletedScreen
          title={t('screens.telehealth.zoom.endedTitle')}
          descr={t('screens.telehealth.zoom.endedDescription')}
          animated
          result={2}
          onClose={onRequestClose}
        />
      )}
    </SafeAreaView>
  );
};

export default ZoomWebView;
