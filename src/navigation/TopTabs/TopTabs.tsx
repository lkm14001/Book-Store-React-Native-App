import { StyleSheet, Text, View } from 'react-native'
import { MaterialTopTabBarProps, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import WishList from '../../components/Library/WishList';
import { Tab, TabBar } from '@ui-kitten/components';
import UserFavorites from '../../components/Library/Favorites';

const {Navigator,Screen} = createMaterialTopTabNavigator();

const TopTabBar = ({ navigation, state }:any) => (
    <TabBar
    style={{height:50}}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <Tab title='Favorites'/>
      <Tab title='WishList'/>
    </TabBar>
  );

  // tabBar={(props: MaterialTopTabBarProps) => <TopTabBar {...props} />}
  
const TopTabs = () => {
  return (
    <Navigator>
        <Screen name="Favorites" component={UserFavorites} />
        <Screen name="WishList" component={WishList} />
    </Navigator>
  )
}

export default TopTabs

const styles = StyleSheet.create({})