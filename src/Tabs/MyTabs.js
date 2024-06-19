import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TVHome from '../screens/TabScreens/TVHome';
import NewsFeed from '../screens/TabScreens/NewsFeed';
import Home from '../screens/TabScreens/Home';
import Icons from 'react-native-vector-icons/MaterialIcons';
import LiveVideo from '../screens/TabScreens/LiveVideo';
import TVStack from '../Stack/TVStack';
import {globalColors} from '../GlobalStyles';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'NewsFeed') {
            iconName = 'web';
          } else if (route.name === 'Discussion') {
            iconName = 'chat';
          } else if (route.name === 'Live Video') {
            iconName = 'chat';
          } else if (route.name === 'Profile') {
            iconName = 'account-circle';
          } else if (route.name === 'Menu') {
            iconName = 'menu';
          } else if (route.name === 'Live TV') {
            iconName = 'web';
          }
          // You can return any component that you like here!
          return <Icons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: globalColors.secondaryBackground,
        tabBarInactiveTintColor: globalColors.primaryText,
        tabBarStyle: {
          backgroundColor: globalColors.primaryBackground,
          // borderTopEndRadius: 20,
          // borderTopLeftRadius: 20,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="NewsFeed" component={NewsFeed} />
      <Tab.Screen name="Live Video" component={LiveVideo} />
      <Tab.Screen name="Live TV" component={TVStack} />
      {/*  <Tab.Screen name="Discussion" component={Discussion} />
      <Tab.Screen name="Menu" component={Menu} /> */}
    </Tab.Navigator>
  );
};

export default MyTabs;
