import {createStackNavigator} from '@react-navigation/stack';
import GooglePageScreen from '../screens/StackScreens/GooglePageScreen';
import Player from '../components/player/Player';
import PrivacyPolicy from '../screens/StackScreens/PrivacyPolicy';
import HowToUse from '../screens/StackScreens/HowToUse';
import MyTabs from '../Tabs/MyTabs';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TabScreens" component={MyTabs} />
      <Stack.Screen name="GooglePageScreen" component={GooglePageScreen} />

      <Stack.Screen name="Player" component={Player} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="HowToUse" component={HowToUse} />
    </Stack.Navigator>
  );
}
