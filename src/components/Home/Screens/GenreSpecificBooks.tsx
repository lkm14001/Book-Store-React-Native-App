import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import Layout from '../../Layout/Layout';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks/hooks';
import {
  bookData,
  clearCategoryBooksState,
  fetchCategoriesAsync,
} from '../../../redux/slices/BookSlice/bookSlice';
import SingleBook from './SingleBook';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { GenreSpecificBooksScreenNavigationProp } from '../../../navigation/types';

const GenreSpecificBooks = ({route}: any) => {
    const navigation = useNavigation<GenreSpecificBooksScreenNavigationProp>();

  const {genre} = route.params;

  const dispatch = useAppDispatch();
  const genreSpecificBooks = useAppSelector(bookData).categoryBooks;

  useEffect(() => {
    dispatch(fetchCategoriesAsync(genre));

    return () => {
        dispatch(clearCategoryBooksState())
    }
  }, [navigation]);

  console.log(genreSpecificBooks);
  return (
    <Layout style={styles.root}>
      {genreSpecificBooks.data.length > 0 ? (
        <View style={styles.genreBooks}>
          <FlatList
            data={genreSpecificBooks.data}
            numColumns={2}
            columnWrapperStyle={styles.bookList}
            keyExtractor={(id, index) => (Math.random() * 100000).toString()}
            showsVerticalScrollIndicator={false}
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
        <View style={styles.genreBooks}>
            <ActivityIndicator size={'large'} />
        </View>
      )}
    </Layout>
  );
};

export default GenreSpecificBooks;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  genreBooks:{
    marginTop:30,
    alignItems:'center'
  },
  bookList: {
    marginVertical:5,
    gap: 30,
    // paddingHorizontal: 20,
  },
});
