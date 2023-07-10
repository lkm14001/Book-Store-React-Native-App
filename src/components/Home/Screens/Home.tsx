import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks/hooks';
import {
  bookData,
  fetchBooksAsync,
} from '../../../redux/slices/BookSlice/bookSlice';

import {Button, Text} from '@ui-kitten/components';
import Layout from '../../Layout/Layout';
import {useNavigation} from '@react-navigation/native';
import SingleBook from './SingleBook';
import {
  HomeScreenNavigatorProp,
  MainScreenNavigationProp,
} from '../../../navigation/types';

const useStyles = () => {
  const {width, height} = useWindowDimensions();

  return StyleSheet.create({
    root: {
      flex: 1,
    },
    topSection: {
      height: height > 700 ? 300 : 250,
      justifyContent: 'center',
      alignItems: 'center',
    },
    libraryUtil: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    libraryNavigateButton: {
      borderRadius: 50,
    },
    bottomSection: {
      flex: 1,
      justifyContent: 'space-around',
    },
    bookList: {
      // flex:1,
      gap: 10,
      paddingHorizontal: 20,
    },
    categorySelect: {
      paddingHorizontal: 20,
      gap: 15,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    genreButton: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      width: 100,
      borderColor: 'grey',
    },
  });
};

const Home = () => {
  const styles = useStyles();
  const navigation = useNavigation<MainScreenNavigationProp>();
  const libraryNavigation = useNavigation<HomeScreenNavigatorProp>();
  const dispatch = useAppDispatch();

  const books = useAppSelector(bookData).books;

  useEffect(() => {
    dispatch(fetchBooksAsync());
    return () => {};
  }, []);

  return (
    <Layout style={styles.root}>
      <View style={styles.topSection}>
        <View style={styles.libraryUtil}>
          <Text category="h6">Ready to read?</Text>
          <Text category="label">
            Get started with a book from your library
          </Text>
          <Button
            style={styles.libraryNavigateButton}
            onPress={() => libraryNavigation.navigate('Library')}>
            Go to Library
          </Button>
        </View>
      </View>
      <View style={styles.bottomSection}>
        {books.length > 0 ? (
          <View>
            <FlatList
              data={books}
              horizontal
              keyExtractor={(id, index) => (Math.random() * 100000).toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.bookList}
              renderItem={({item}) => (
                <SingleBook
                  title={item.title}
                  author={item.author}
                  image={item.image}
                  id={item.id}
                  rating={item.rating}
                  file={item.file}
                  genre={item.genre}
                  price={item.price}
                />
              )}
            />
          </View>
        ) : (
          <ActivityIndicator size={'large'} />
        )}
        <View style={styles.categorySelect}>
          <TouchableOpacity onPress={() => navigation.navigate('Genres')}>
            <View style={styles.genreButton}>
              <Text category="label">Genres</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({});
