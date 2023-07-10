import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Genres from './Screens/Genres';
import { RootHomeStackParamList } from '../../navigation/types';
import GenreSpecificBooks from './Screens/GenreSpecificBooks';

const {Navigator,Screen} = createNativeStackNavigator<RootHomeStackParamList>();

const HomeStack = () => {
  return (
    <Navigator screenOptions={{headerShown:false}}>
        <Screen name='Main' component={Home} />
        <Screen name='Genres' component={Genres} />
        <Screen name='GenreSpecificBooks' component={GenreSpecificBooks} />
    </Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})