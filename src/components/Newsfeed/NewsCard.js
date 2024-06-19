import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const NewsCard = ({link, title, summary}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('NewsViewer', {uri: link});
    // console.log(link);
  };
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        <Text style={styles.subtitle}>{summary.substring(0, 100)}...</Text>
      </View>
      <Image
        // source={require('../assets/images/news.png')}
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfz1iHMT6lmip0xCmUzQEc065zpJj0DJ0uIw&s',
        }}
        style={styles.image}
      />
    </View>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#F3F3F3',
    borderRadius: 13,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 13,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    // color: "#2e3cff",
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'justify',
  },
  image: {
    width: 100,
    height: 70,
    borderRadius: 10,
  },
});
