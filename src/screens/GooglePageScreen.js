import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getChannels} from '../helper/getChannels';
import {ChannelsContext} from '../Context/ChannelsContext';
import BannerAd from '../components/adComponents/BannerAd';
import {InterstitialAdManager} from 'react-native-fbads';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';

const GooglePageScreen = () => {
  const navigation = useNavigation();
  const webViewRef = useRef(null);
  const {_, setData} = useContext(ChannelsContext);
  const [searching, setSearching] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [mainUriLoaded, setMainUriLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showpopup, setshowpopup] = useState(true);
  const [togglePopUpCheckBox, setTogglePopUpCheckBox] = useState(false);
  const [mainUri, setMainUri] = useState(
    'https://www.google.com/search?q=github+iptv',
  );
  const uri1 = 'https://github.com/iptv-org/iptv';

  const checkShowAgainPopup = async () => {
    const jsonValue = await AsyncStorage.getItem('glpagePopup');

    if (jsonValue !== null) {
      const {showAgain} = JSON.parse(jsonValue);

      if (showAgain) {
        setshowpopup(false);
      }
    }
  };

  useEffect(() => {
    checkShowAgainPopup();
  }, []);

  const handlePopupCheckbox = async value => {
    setTogglePopUpCheckBox(value);
    const jsonValue = JSON.stringify({showAgain: value});
    await AsyncStorage.setItem('glpagePopup', jsonValue);
  };

  const handleSourceUrlLoad = e => {
    // console.log(e.nativeEvent.url);
    setMainUriLoaded(true);
    // console.log('mainUrl loaded');
  };
  const handleShouldStartLoadWithRequest = event => {
    // Extract the URL from the event
    const {url} = event;
    // console.log(url);

    // console.log(event.loading);

    if (mainUriLoaded) {
      if (url.startsWith('https://www.google.com/search?q=github+iptv')) {
        return true;
      }
      if (url === uri1) {
        setSearching(true);

        setTimeout(() => {
          setShowModal2(true);
        }, 3000);
        setTimeout(() => {
          setSearching(false);
        }, 5000);
      } else {
        setSearching(true);

        setTimeout(() => {
          setShowModal1(true);
        }, 3000);
        setTimeout(() => {
          setSearching(false);
        }, 5000);
      }
    }

    // Allow the WebView to load the URL
    return true;
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const goToNextPage = async () => {
    try {
      const value = await getChannels();
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('channels', jsonValue);
      setData(value);
      navigation.navigate('Home');

      // Interstitial Ad
      InterstitialAdManager.showAd('948800379889675_948801323222914')
        .then(didClick => {})
        .catch(error => {
          console.log('err', error);
        });
    } catch (e) {
      // saving error
    }
  };

  const returnToMainPage = () => {
    // Check if the WebView reference is available
    if (webViewRef.current) {
      // Navigate back to the main page
      webViewRef.current.goBack();
    }
    setShowModal1(false);
    // Interstitial Ad
    InterstitialAdManager.showAd('948800379889675_948801323222914')
      .then(didClick => {})
      .catch(error => {
        console.log('err', error);
      });
  };
  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{uri: mainUri}}
        onLoad={handleSourceUrlLoad}
        style={{flex: 1}}
        scrollEnabled={true} // Allow scrolling
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        maximumZoomScale={1} // Set maximum zoom level
        minimumZoomScale={1} // Set minimum zoom level
        startInLoadingState={true}
        onLoadEnd={handleLoadEnd}
      />
      {showModal1 && (
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            {searching ? (
              <>
                <ActivityIndicator size={'small'} color={'#fff'} />
                <Text style={styles.modalValue}>Searching playlist....</Text>
              </>
            ) : (
              <>
                <View style={{alignItems: 'center'}}>
                  <Icon name="cancel" size={28} color="#ff4040" />
                  <Text style={styles.modalValue}>No Playlist Found!</Text>
                </View>
                <Button
                  style={styles.modalButton}
                  color={'#003A53'}
                  onPress={returnToMainPage}
                  title="Go Back"></Button>
              </>
            )}
          </View>
        </View>
      )}
      {showModal2 && (
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            {searching ? (
              <>
                <ActivityIndicator size={'small'} color={'#fff'} />
                <Text style={styles.modalValue}>Searching playlist....</Text>
              </>
            ) : (
              <>
                <View style={{alignItems: 'center'}}>
                  <Icon name="check-circle" size={28} color="#33e823" />
                  <Text style={styles.modalValue}>Playlist Found</Text>
                </View>
                <Button
                  style={styles.modalButton}
                  color={'#003A53'}
                  onPress={goToNextPage}
                  title="Save Playlist"></Button>
              </>
            )}
          </View>
        </View>
      )}
      {showpopup && (
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={{gap: 10}}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                Are you unsure about what to do next? Let us help you!
              </Text>
              <View style={{gap: 5}}>
                <Text style={{color: '#fff', fontSize: 15}}>
                  If you know what to do next, click 'Continue' to proceed.
                </Text>
                <Button
                  title="Continue"
                  color={'#003A53'}
                  onPress={() => setshowpopup(false)}
                />
              </View>
              <View style={{gap: 5}}>
                <Text style={{color: '#fff', fontSize: 15}}>
                  Click 'Tutorial' if you'd like a step-by-step guide on using
                  our application.
                </Text>
                <Button
                  title="Tutorial"
                  color={'#003A53'}
                  onPress={() => {
                    navigation.navigate('HowToUse');
                    setshowpopup(false);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                textAlign: 'right',
              }}>
              <CheckBox
                disabled={false}
                value={togglePopUpCheckBox}
                onValueChange={handlePopupCheckbox}
                onTintColor="#fff"
                onFillColor="#003A53"
              />
              <Text style={{color: '#fff', fontSize: 15}}>
                Don't show this again
              </Text>
            </View>
          </View>
        </View>
      )}
      {/* banner ad */}
      <BannerAd placement_id={'948800379889675_948801103222936'} />
    </View>
  );
};

export default GooglePageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  modalContainer: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#00000000',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#039EBD',
    padding: 30,
    borderRadius: 15,
    gap: 5,
    // width: Dimensions.get('screen').width - 30,
    // height: Dimensions.get('screen').height / 2,
  },
  modalValue: {
    color: 'white',
    textAlign: 'center',
    margin: 10,
    fontSize: 18,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {},
});
