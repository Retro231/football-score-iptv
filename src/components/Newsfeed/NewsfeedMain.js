import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {globalColors} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NewsCard from './NewsCard';
import {getNews} from '../../helper/getNews';
import NewsfeedFootball from './NewsfeedFootball';
import NewsfeedCricket from './NewsfeedCricket';

const headItem = [
  {
    id: 1,
    name: 'Football',
    iconName: 'sports-soccer',
    iconSize: 22,
  },
  {
    id: 2,
    name: 'Cricket',
    iconName: 'sports-cricket',
    iconSize: 20,
  },
];
const NewsfeedMain = () => {
  const [active, setActive] = useState(1);
  const [news, setNews] = useState([]);
  const handlePress = id => {
    setActive(id);
  };
  useEffect(() => {
    const getData = async id => {
      const data = await getNews(id);
      setNews(data);
      return;
    };
    getData(active);
  }, [active]);
  return (
    <View style={{flex: 1}}>
      <View style={styles.categorayHead}>
        {headItem.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(item.id)}
            style={[
              styles.headItem,
              {
                backgroundColor:
                  active === item.id
                    ? globalColors.secondaryBackground
                    : globalColors.primaryBackground,
              },
            ]}>
            <Icon
              name={item.iconName}
              size={item.iconSize}
              color={
                active === item.id
                  ? globalColors.primaryBackground
                  : globalColors.secondaryBackground
              }
            />
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color:
                  active === item.id
                    ? globalColors.primaryBackground
                    : globalColors.secondaryBackground,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.contentWrapper}>
        {active === 1 ? <NewsfeedFootball /> : <NewsfeedCricket />}
        {/* <FlatList
          data={news}
          renderItem={({item}) => (
            <NewsCard
              title={item.title}
              link={item.link}
              summary={item.summary}
            />
          )}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps="always"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        /> */}
      </View>
    </View>
  );
};

export default NewsfeedMain;

const styles = StyleSheet.create({
  categorayHead: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
  },
  headItem: {
    backgroundColor: 'gray',
    width: Dimensions.get('window').width / headItem.length,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
  },
});
