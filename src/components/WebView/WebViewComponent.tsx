import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const WebViewComponent = ({link}:any) => {
  return (
    <SafeAreaView style={{flex:1}}>
        <WebView
        originWhitelist={[link+'.html']}
        source={{
            uri:link+'.html'
        }}
        />
    </SafeAreaView>
  )
}

export default WebViewComponent

const styles = StyleSheet.create({})