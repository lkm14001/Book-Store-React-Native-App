import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import { Text, Icon, Button} from '@ui-kitten/components';
import Layout from '../../Layout/Layout';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks/hooks';
import {bookData, fetchCategoriesAsync} from '../../../redux/slices/BookSlice/bookSlice';
import SingleBook from './SingleBook';
import {useNavigation} from '@react-navigation/native';
import {GenreSpecificBooksScreenNavigationProp} from '../../../navigation/types';

const Genres = () => {
  const navigation = useNavigation<GenreSpecificBooksScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const categories = [
    'arts',
    'computers',
    'cooking',
    'engineering',
    'fiction',
    'thriller',
    'horror',
    'romance',
    'history',
  ];
  return (
    <Layout style={styles.root}>
      <ScrollView
        style={styles.genreContainer}
        showsVerticalScrollIndicator={false}>
        {categories.map((ele: string, key: any) => (
          <TouchableOpacity
            key={key}
            onPress={() =>
              navigation.navigate('GenreSpecificBooks', {genre: ele})
            }>
            <View style={styles.genre}>
              <Text category="h6">
                {ele.charAt(0).toUpperCase() + ele.slice(1)}
              </Text>
              <Icon
                style={styles.icon}
                name="arrow-circle-right"
                fill="#fff"
                animation="pulse"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Layout>
  );
};

export default Genres;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  genreContainer: {
    margin: 30,
  },
  bookList: {
    gap: 15,
    paddingHorizontal: 20,
  },
  genre: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genreButton: {
    textAlign: 'left',
  },
  icon: {
    width: 25,
    height: 25,
  },
});

{
  /* <FlatList
                data={useAppSelector(bookData).categoryBooks.data}
                horizontal
                keyExtractor={(id, index) =>
                  (Math.random() * 100000).toString()
                }
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.bookList}
                renderItem={({item}) => (
                  <SingleBook
                    title={item.title}
                    author={item.author}
                    image={item.image}
                    id={item.id}
                    rating={item.rating}
                  />
                )}
              /> */
}
