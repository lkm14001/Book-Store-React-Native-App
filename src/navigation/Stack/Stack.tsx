import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackHeaderProps, createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../../components/Login/Login';
import Registration from '../../components/Registration/Registration';
import {RootStackParamList} from '../types';
import {useApp, useUser} from '@realm/react';
import Tabs from '../Tabs/Tabs';
import Header from '../Header/Header';
import { Icon } from '@ui-kitten/components';

const {Navigator, Screen} = createNativeStackNavigator();

const Stack = () => {
  const app = useApp();
  // const user = useUser()

  return (
    <Navigator
      initialRouteName="Registration" screenOptions={{headerShown:false}}>
      {!app.currentUser?.isLoggedIn ? (
        <>
          <Screen name="Login" component={Login} />
          <Screen name="Registration" component={Registration} />
        </>
      ) : (
        <Screen name='App' component={Tabs} />
      )}
    </Navigator>
  );
};

export default Stack;

const styles = StyleSheet.create({});
