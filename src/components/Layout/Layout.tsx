import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'

const Layout = ({children,style}:any) => {
    const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={[styles.root,style,{backgroundColor:isDarkMode ? '#222831':'#DDE6ED'}]}>
      {children}
    </View>
  )
}

export default Layout

const styles = StyleSheet.create({
    root:{
        // backgroundColor:
    }
})