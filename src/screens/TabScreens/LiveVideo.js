import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import Header from '../../components/Header/Header';
import LiveVideoMain from '../../components/LiveVideo/LiveVideoMain';

const LiveVideo = () => {
  return (
    <View style={{flex: 1}}>
      <Header title={'Live Video'} />
      <LiveVideoMain />
      {/* <WebView
        // ref={webViewRef}
        source={{
          uri: 'https://www.scorebat.com/embed/?token=MTU2MTA4XzE3MTQ2ODM2NTVfMzg0ZjI0NWUyYWQwN2NmYTVkOTUwMjkyZGU2M2I2ZGIwZDM3NmYzZg==',
        }}
        // onLoad={handleSourceUrlLoad}
        style={{flex: 1}}
        scrollEnabled={true} // Allow scrolling
        maximumZoomScale={1} // Set maximum zoom level
        minimumZoomScale={1} // Set minimum zoom level
        startInLoadingState={true}
        // onLoadEnd={handleLoadEnd}
      /> */}
    </View>
  );
};

export default LiveVideo;

const styles = StyleSheet.create({});
