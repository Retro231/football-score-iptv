import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {useEffect} from 'react';

const LiveScoreWebView = ({sourceContent}) => {
  const [loading, setLoading] = useState('');
  const {width} = Dimensions.get('screen');
  const shouldStartLoadWithRequest = event => {
    console.log(event.url);
    // You can add logic here to control which URLs are allowed to load.
    // For example, only allow the initial URL to load and block others.
    return true;
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, [sourceContent]);

  const injectedJavaScript = `
    document.addEventListener('click', function(event) {
      event.stopPropagation();
      event.preventDefault();
    }, true);
  `;

  return (
    <View style={{flex: 1, width: width}}>
      {!loading && (
        <WebView
          source={{
            uri: sourceContent,
          }}
          scrollEnabled={true} // Allow scrolling
          onShouldStartLoadWithRequest={shouldStartLoadWithRequest}
          maximumZoomScale={1} // Set maximum zoom level
          minimumZoomScale={1} // Set minimum zoom level
          injectedJavaScript={injectedJavaScript}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      )}
      {loading && (
        <View
          style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

export default LiveScoreWebView;

const styles = StyleSheet.create({});
