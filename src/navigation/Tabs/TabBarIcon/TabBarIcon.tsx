import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React from 'react';
import {Icon} from '@ui-kitten/components';

interface TabBarIconProps {
  route: string;
  isFocused: boolean;
}

const TabBarIcon = ({route, isFocused}: TabBarIconProps) => {
  const dark = useColorScheme() === 'dark';

  return (
    <>
      {route === 'Home' ? (
        <>
          <Icon
            name="home"
            fill={isFocused && dark ? '#fff' : 'grey'}
            style={{width: 20, height: 20}}
          />
        </>
      ) : route === 'Library' ? (
        <>
          <Icon
            name="book-open"
            fill={isFocused && dark ? '#fff' : 'grey'}
            style={{width: 20, height: 20}}
          />
        </>
      ) : route === 'Shop' ? (
        <>
          <Icon
            name="shopping-cart"
            fill={isFocused && dark ? '#fff' : 'grey'}
            style={{width: 20, height: 20}}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TabBarIcon;

const styles = StyleSheet.create({});
