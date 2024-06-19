import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {globalColors} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LiveVideoFootball from './LiveVideoFootball';
import LiveVideoCricket from './LiveVideoCricket';
import LiveScoreWebView from '../LiveScore/LiveScoreWebView';

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

const LiveVideoMain = () => {
  const [active, setActive] = useState(1);
  const handlePress = id => {
    setActive(id);
  };
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
        {/* {active === 1 ? <LiveVideoFootball /> : <LiveVideoCricket />}
         */}
        <LiveScoreWebView
          sourceContent={
            'https://www.scorebat.com/embed/?token=MTU2MTA4XzE3MTQ2ODM2NTVfMzg0ZjI0NWUyYWQwN2NmYTVkOTUwMjkyZGU2M2I2ZGIwZDM3NmYzZg=='
          }
        />
      </View>
    </View>
  );
};

export default LiveVideoMain;

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