import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import WebView from 'react-native-webview';
import Header from '../../components/Header/Header';
import LiveScoreMain from '../../components/LiveScore/LiveScoreMain';

const Home = () => {
  const webViewRef = useRef(null);

  const onShouldStartLoadWithRequest = event => {
    const {url} = event;

    console.log(url);

    // Check if the URL starts with 'http' or 'https'
    if (
      url.startsWith('https://www.scorebat.com/') ||
      url.startsWith('http://www.scorebat.com/')
    ) {
      //www.scorebat.com/
      // Load the URL inside the WebView
      https: return true;
    } else {
      // Do not load the URL in the WebView, let it be handled by the system
      // You can also handle other schemes like 'tel:', 'mailto:', etc. here
      return false;
    }
  };
  const onNavigationStateChange = navState => {
    const {url, loading, canGoBack, canGoForward} = navState;

    console.log(url);

    // Check if the URL starts with 'http' or 'https'
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // URL is a webpage, do nothing
    } else {
      // URL is not a webpage, might be a redirect to an external browser like Chrome
      // You can handle it here, for example, by opening it in the system browser
      Linking.openURL(url);
      // You can also add tracking logic here if needed
    }
  };

  const htmlContent = `

  `;

  return (
    <View style={{flex: 1}}>
      <Header title={'Football Live Score'} />
      <LiveScoreMain />
      {/* <WebView
        ref={webViewRef}
        source={{
          uri: 'https://www.scorebat.com/embed/livescore/?token=MTU2MTA4XzE3MTQ2ODM2NTVfMzg0ZjI0NWUyYWQwN2NmYTVkOTUwMjkyZGU2M2I2ZGIwZDM3NmYzZg==',
        }} // onLoad={handleSourceUrlLoad}
        style={{flex: 1}}
        scrollEnabled={true} // Allow scrolling
        maximumZoomScale={1} // Set maximum zoom level
        minimumZoomScale={1} // Set minimum zoom level
        startInLoadingState={true}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onNavigationStateChange={onNavigationStateChange}

        // onLoadEnd={handleLoadEnd}
      /> */}
      {/* <WebView
        originWhitelist={['*']}
        source={{html: htmlContent}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
      /> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
