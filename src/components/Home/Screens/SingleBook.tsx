import {
  Alert,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Icon,
  Text,
  MenuItem,
  OverflowMenu,
  IndexPath,
} from '@ui-kitten/components';
import Layout from '../../Layout/Layout';
import {useUser} from '@realm/react';
import {
  useObject,
  useQuery,
  useRealm,
} from '../../../realm/context/RealmContext';
import Rating from '../../../realm/models/rating';
import Shop from '../../../realm/models/shop';

const SingleBook = ({
  image,
  title,
  author,
  shopDisplay,
  price,
  id,
  file,
  genre,
}: any) => {
  const user = useUser();
  const realm = useRealm();
  const fav = useQuery('Favorites');
  const userRatings = useQuery(Rating);
  const userFavorite = fav.filtered(`userId =="${user.id}"`);
  const userShop = useQuery(Shop).filtered(`userId == "${user.id}"`);
  const [showWeb, setShowWeb] = useState<boolean>(false);

  const presentBookRating = userRatings.filtered(`userId =="${user.id}"`);

  // if(userFavorite.length > 0) {
  //   userFavorite.forEach((ele:any) => {
  //     const isBookPresent =
  //   })
  // }
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [bookRating, setBookRating] = useState<number>(0);
  const [favRefresh, setFavRefresh] = useState<boolean>(false);
  const [ratingRefresh, setRatingRefresh] = useState<boolean>(false);

  useEffect(() => {
    const isFavoritePresent = userFavorite.filter((ele: any) => {
      const isBookPresent = ele.favorites.filter((ele: any) => ele.id === id);
      if (isBookPresent.length > 0) {
        return true;
      } else {
        return false;
      }
    });

    if (isFavoritePresent.length > 0) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favRefresh]);

  useEffect(() => {
    let isRatingPresent;
    if (presentBookRating.length > 0) {
      isRatingPresent = presentBookRating[0].ratings.filter(
        (ele: any) => ele.id === id,
      );
      if (isRatingPresent.length > 0) {
        setBookRating(isRatingPresent[0].rating!);
      } else {
        return;
      }
    }
  }, [ratingRefresh]);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      mutableSubs.add(realm.objects('Favorites'));
      mutableSubs.add(realm.objects('Rating'));
      mutableSubs.add(realm.objects('Shop'));
    });
  });

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>();

  const onMenuSelect = (index: IndexPath): void => {
    setSelectedIndex(index);
    setIsMenuOpen(false);
  };

  const onBookLongPress = () => {
    setIsMenuOpen(true);
  };

  const book = {
    id,
    file,
    author: author === undefined ? '' : author,
    title,
    genre,
    image,
    price,
  };

  const handleAddToCart = () => {
    // console.log(userShop)
    if (userShop.length > 0) {
      userShop.forEach((ele: any) => {
        realm.write(() => {
          ele.cart?.push(book);
        });
      });
    } else {
      const shop = [];
      shop.push(book);
      const shopData = {
        cart: shop,
        userId: user.id,
      };
      realm.write(() => {
        realm.create('Shop', shopData);
      });
    }
  };

  const handleFavorite = () => {
    setFavRefresh(!favRefresh);
    const favorite = fav.filtered(`userId == "${user.id}"`);

    if (favorite.length > 0) {
      favorite.forEach((ele: any) => {
        const isBookPresent = ele.favorites.filter((ele: any) => ele.id === id);
        if (isBookPresent.length > 0) {
          Alert.alert('Removed From FavoritesD');
          ele.favorites.forEach((ele: any) => {
            if (ele.id === id) {
              realm.write(() => {
                realm.delete(ele);
              });
            }
          });
        } else {
          realm.write(() => {
            ele.favorites.push(book);
          });
        }
      });
    } else {
      let favorites = [];
      favorites.push(book);
      const favData = {
        favorites,
        userId: user.id,
      };
      console.log('Data',favData)
      console.log('Realm Data Writing');

      realm.write(() => {
        realm.create('Favorites', favData);
        console.log('Successfull');
      });
    }
  };

  const handleRating = (ratingNumber: number) => {
    setRatingRefresh(!ratingRefresh);
    const rating = userRatings.filtered(`userId == "${user.id}"`);
    console.log('Ratings', rating);

    if (rating.length > 0) {
      // update the Entry
      rating.forEach((ele: any) => {
        const isRatingPresent = rating.filter((ele: any) => ele.id === id);
        if (isRatingPresent.length > 0) {
          Alert.alert('Already Rated the Book !');
        } else {
          const newBook = {...book, rating: ratingNumber};
          realm.write(() => {
            ele.ratings.push(newBook);
          });
        }
      });
    } else {
      // new Entry
      let newRatings = [];
      const newBook = {...book, rating: ratingNumber};
      console.log(newBook);
      newRatings.push(newBook);
      console.log('NewRatings', newRatings);
      const ratingData = {
        ratings: newRatings,
        userId: user.id,
      };
      realm.write(() => {
        realm.create('Rating', ratingData);
      });
    }
  };

  const BookCoverView = () => (
    <TouchableOpacity onLongPress={onBookLongPress}>
      <View style={styles.bookCover}>
        <ImageBackground
          source={{uri: image}}
          resizeMode="contain"
          imageStyle={{borderRadius: 10}}
          style={styles.backgroundImage}
        />
        {!shopDisplay && (
          <TouchableOpacity style={styles.favorite} onPress={handleFavorite}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              style={{height: 30, width: 30}}
              fill={isFavorite ? '#ff0000' : '#b2beb5'}
              animation="pulse"
              animationConfig={{
                cycles: 3,
                isInteraction: false,
                useNativeDriver: true,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout style={styles.bookView}>
      {!shopDisplay ? (
        <OverflowMenu
          animationType="fade"
          centerContent
          style={styles.bookMenu}
          anchor={BookCoverView}
          visible={isMenuOpen}
          backdropStyle={styles.backDrop}
          selectedIndex={selectedIndex}
          onBackdropPress={() => setIsMenuOpen(false)}
          indicator={() => <></>}
          onSelect={onMenuSelect}>
          <MenuItem title="Open Book" onPress={() => Linking.openURL(file)} />
          <MenuItem title="Add to Cart" onPress={handleAddToCart} />
        </OverflowMenu>
      ) : (
        <BookCoverView />
      )}
      <View style={styles.bookDetails}>
        <View style={{maxWidth: '85%'}}>
          <Text category="label" style={{alignSelf: 'flex-start'}}>
            {title}
          </Text>
          <Text category="label" style={styles.descriptionText}>
            {author}
          </Text>
          <Text category="label" style={styles.descriptionText}>
            Price: ₹{price}
          </Text>
          {!shopDisplay && (
            <View style={styles.rating}>
              {bookRating > 0 ? (
                [...Array(bookRating)].map((ele: any, key: any) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => Alert.alert('Book Already Rated!')}>
                    <Icon
                      name="star"
                      style={{height: 15, width: 15}}
                      fill="#fedf00"
                    />
                  </TouchableOpacity>
                ))
              ) : (
                <>
                  {[1, 2, 3, 4, 5].map((ele: any, key: any) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() => handleRating(ele)}>
                      <Icon
                        name="star-outline"
                        style={{height: 15, width: 15}}
                        fill="#b2beb5"
                      />
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </View>
          )}
        </View>
        {!shopDisplay && (
          <View>
            <TouchableOpacity>
              <Icon
                name="bookmark-outline"
                style={{height: 30, width: 30}}
                fill="#b2beb5"
                animation="pulse"
                animationConfig={{
                  cycles: 3,
                  isInteraction: false,
                  useNativeDriver: true,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Layout>
  );
};

export default SingleBook;

const styles = StyleSheet.create({
  bookView: {
    minHeight: 270,
    width: 150,
    gap: 10,
  },
  bookCover: {
    height: 220,
    width: 150,
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  bookDetails: {
    // gap: 3,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionText: {
    color: 'grey',
  },
  favorite: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  rating: {
    flexDirection: 'row',
    gap: 2,
  },
  bookMenu: {},
  backDrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});
