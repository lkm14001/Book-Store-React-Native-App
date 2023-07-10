import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Layout} from '@ui-kitten/components';
import TopTabs from '../../navigation/TopTabs/TopTabs';


const Library = () => {

  return (
    <Layout style={styles.root}>
    
    </Layout>
  );
};

export default Library;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabView: {
    paddingVertical: 25,
  },
  tab: {
    justifyContent: 'center',
  },
});
