import React, { useRef, useState, useCallback } from 'react';
import { Alert, View, TouchableOpacity, ScrollView, Platform, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync } from 'expo-image-manipulator';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import HeaderComp from '../components/HeaderComp';
import ShareSvg from '../components/Svg/ShareSvg';
import { iso8601ToFormatted } from '../utilis/dateTime';

const WebViewHandler = ({
  route: {
    params: { url, viewshot, title },
  },
}) => {
  const webview = useRef(null);
  const webViewRef = useRef();
  const navigation = useNavigation();

  const { t } = useTranslation();

  const [webHeight, setWebHeight] = useState(1);
  const [imData, setImData] = useState(null);
  const [canGoBackURL, setCanGoBackURL] = useState(false);

  const openShareDialogAsync = useCallback(
    async (imgUrl) => {
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert(t('screens.webView.alert'));
        return;
      }
      if (Platform.OS === 'ios') {
        await Share.share({
          // message: fileName,
          title: 'Share file',
          url: imgUrl,
        });
      } else {
        await Sharing.shareAsync(imgUrl);
      }
    },
    [t]
  );

  const openDialog = useCallback(
    async (imageData) => {
      const timestamp = new Date();
      const downloadPath = `${FileSystem.cacheDirectory}${title?.replace(
        / /g,
        '_'
      )}_${iso8601ToFormatted(timestamp.toISOString(), 'yyyy-MM-dd_HH:mm:ss')}.png`;

      const imageProc = await manipulateAsync(imageData);
      await FileSystem.moveAsync({ from: imageProc.uri, to: downloadPath });
      openShareDialogAsync(downloadPath);
    },
    [openShareDialogAsync, title]
  );

  const LoadWebViewEnd = () => {
    if (viewshot) {
      captureRef(webview, {
        format: 'png',
        quality: 0.8,
      }).then(
        (uri) => {
          setImData(uri);
          openDialog(uri);
        },
        (error) => console.error('Oops, snapshot failed', error)
      );
    }
  };

  const handleGoBack = () => {
    if (canGoBackURL) {
      webViewRef.current.goBack();
    } else {
      navigation.goBack();
    }
  };

  const handleNavigationURL = (event) => {
    setCanGoBackURL(event.canGoBack);
  };

  const handleMessage = (event) => {
    const { data } = event.nativeEvent;
    setTimeout(() => {
      LoadWebViewEnd();
    }, 500);
    if (!Number.isNaN(parseInt(data, 10))) {
      setWebHeight(parseInt(event.nativeEvent.data, 10));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComp
        left='arrow'
        onLeftClick={handleGoBack}
        center={[
          `${title ? `${title}` : ''}`,
          {
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
          },
        ]}
        right={['x', handleGoBack, { marginRight: 16 }]}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View
          ref={webview}
          collapsable={false}
          style={{ flexGrow: 1, minHeight: viewshot ? webHeight : 0 }}
        >
          <WebView
            ref={webViewRef}
            source={{ uri: url }}
            style={{ minHeight: viewshot ? webHeight : 0 }}
            scrollEnabled={!viewshot}
            onMessage={handleMessage}
            onNavigationStateChange={handleNavigationURL}
            javaScriptEnabled
            domStorageEnabled
            useWebKit
          />
        </View>
      </ScrollView>
      {viewshot && (
        <View style={{ height: 70, paddingHorizontal: 10, paddingVertical: 10 }}>
          <TouchableOpacity onPress={() => openDialog(imData)}>
            <ShareSvg />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default WebViewHandler;
