import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TVHome from '../screens/TabScreens/TVHome';
import CategoryDetailsScreen from '../screens/StackScreens/CategoryDetailsScreen';

const Stack = createStackNavigator();

const TVStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TVHome" component={TVHome} />
      <Stack.Screen
        name="CategoryDetailsScreen"
        component={CategoryDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default TVStack;

const styles = StyleSheet.create({});
