import {
  ActivityIndicator,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SingleStreamModal from '../../components/Single_Stream/SingleStreamModal';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryDetailsScreen from '../StackScreens/CategoryDetailsScreen';
import {ChannelsContext} from '../../Context/ChannelsContext';
import {getChannels} from '../../helper/getChannels';
import {getMergedChannels} from '../../helper/getMergedChannels';
import BannerAd from '../../components/adComponents/BannerAd';
import {globalColors} from '../../GlobalStyles';
const TVHome = () => {
  const navigation = useNavigation();
  const {data, setData} = useContext(ChannelsContext);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(() => !showModal);
  };

  const checkPlaylist = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('channels');
      // console.log(JSON.parse(jsonValue));
      if (jsonValue !== null) {
        // fatch new channelsArray from api.
        const newData = await getChannels();
        const storedData = JSON.parse(jsonValue);
        // compare with stored channelsArray.
        // check channel name and id, if found ,, modify new channels array with favourite property of stored channelsArray.
        const margedArray = await getMergedChannels(newData, storedData);
        // console.log(newData[0]);
        // console.log(storedData[0]);
        // console.log(margedArray[0]);
        setData(margedArray);
        await AsyncStorage.setItem('channels', JSON.stringify(margedArray));
      }

      setLoading(false);
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  useEffect(() => {
    checkPlaylist();
  }, []);

  const handleRefresh = () => {
    checkPlaylist();
  };

  const handleSeachChannels = () => {
    navigation.navigate('GooglePageScreen');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={'Live TV'} refreshData={handleRefresh} />
      {!loading && data === null && (
        <View style={styles.container}>
          <Text style={{fontSize: 24, fontWeight: 'bold', color: '#000'}}>
            No Live TV Channels Added
          </Text>
          <Icon
            name={'search'}
            size={32}
            color={globalColors.primaryBackground}
          />
          <Text style={{color: globalColors.secondaryText}}>
            Click on "Search Channels" and select suitable website
          </Text>
          <Icon.Button
            name="live-tv"
            backgroundColor={globalColors.primaryBackground}
            onPress={handleSeachChannels}>
            <Text
              style={{
                fontFamily: 'Arial',
                fontSize: 15,
                color: globalColors.primaryText,
              }}>
              Search Channels
            </Text>
          </Icon.Button>
          {/* <Icon.Button
            name="play-circle"
            backgroundColor="#039EBD"
            onPress={toggleModal}>
            <Text style={{fontFamily: 'Arial', fontSize: 15, color: '#fff'}}>
              Play Single Stream
            </Text>
          </Icon.Button> */}
          {/* modal signle stream */}
          <Modal
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22,
            }}
            visible={showModal}
            animationType="fade">
            <SingleStreamModal onClose={toggleModal} />
          </Modal>
        </View>
      )}
      {!loading && data !== null && <CategoryDetailsScreen />}
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <ActivityIndicator
            size="large"
            color={globalColors.primaryBackground}
          />
        </View>
      )}
      {/* banner ad */}
      {/* <BannerAd placement_id={'948800379889675_948801103222936'} /> */}
    </SafeAreaView>
  );
};

export default TVHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});