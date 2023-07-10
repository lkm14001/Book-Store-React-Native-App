import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from '../../components/Home/HomeStack';
import TopTabs from '../TopTabs/TopTabs';
import {Avatar, Icon, Layout} from '@ui-kitten/components';
import ShopView from '../../components/Shop/ShopView';
import CustomBottomTab from './CustomBottomTab/CustomBottomTab';
import Header from '../Header/Header';
import { RootTabsParamList } from '../types';

const {Navigator, Screen} = createBottomTabNavigator<RootTabsParamList>();

const Tabs = () => {
  const dark = useColorScheme() === 'dark';
  return (
    <Navigator
    tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={{
        header: () => (<Header />),
        headerTitle: '',
      }}>
      <Screen
        name="Home"
        component={HomeStack}
      />
      <Screen
        name="Library"
        component={TopTabs}
      />
      <Screen
        name="Shop"
        component={ShopView}
      />
    </Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
