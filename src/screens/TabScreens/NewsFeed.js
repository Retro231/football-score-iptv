import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NewsfeedMain from '../../components/Newsfeed/NewsfeedMain';
import Header from '../../components/Header/Header';

const NewsFeed = () => {
  return (
    <View style={{flex: 1}}>
      <Header title={'NewsFeed'} />
      <NewsfeedMain />
    </View>
  );
};

export default NewsFeed;

const styles = StyleSheet.create({});
