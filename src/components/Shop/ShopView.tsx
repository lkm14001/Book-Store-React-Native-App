import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from '@ui-kitten/components';
import Layout from '../Layout/Layout';
import Realm from 'realm';
import {useObject, useQuery, useRealm} from '../../realm/context/RealmContext';
import Shop from '../../realm/models/shop';
import {useUser} from '@realm/react';
import Books from '../../realm/models/books';
import SingleBook from '../Home/Screens/SingleBook';
import {useNavigation} from '@react-navigation/native';
import {ShopScreenNavigationProp} from '../../navigation/types';

const width = Dimensions.get('screen').width;

const ShopView = () => {
  const navigation = useNavigation<ShopScreenNavigationProp>();
  const user = useUser();
  const userShop = useQuery(Shop).filtered(`userId == "${user.id}"`);
  const realm = useRealm();

  let bookShop: any;
  if (userShop.length > 0) {
    bookShop = useObject(Shop, userShop[0]._id);
  }

  const shopUpdate = userShop[0];
  const [shopData, setShopData] = useState<Books[]>();
  const [isCheckedOut, setIsCheckedOut] = useState<boolean>(false);

  useEffect(() => {
    const getData = () => {
      setShopData(userShop[0]?.cart!);
      console.log('Data Fetched');
    };
    getData();

    return () => getData();
  }, [navigation]);

  const handleCheckout = () => {
    Alert.alert('Order Placed!');
    if (shopUpdate) {
      realm.write(() => {
        bookShop!.orders = bookShop.cart;
      });
    }
    if (userShop.length > 0) {
      userShop.forEach((ele: any) => {
        realm.write(() => {
          realm.delete(ele.cart);
        });
      });
    }
    setIsCheckedOut(true);
  };

  return (
    <Layout style={styles.root}>
      <View style={styles.bookShop}>
        {shopData !== undefined && shopData.length > 0 ? (
          <View style={styles.shopList}>
            <FlatList
              data={shopData}
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
                  shopDisplay={true}
                  file={item.file}
                  genre={item.genre}
                  price={item.price}
                />
              )}
            />
          </View>
        ) : (
          <>
            {isCheckedOut === true ? (
              <Text category="label" style={{fontSize: 30}}>
                Orders Placed!...Please Head over to Library or Home
              </Text>
            ) : (
              <View style={styles.shopList}>
                <ActivityIndicator size={'large'} />
              </View>
            )}
          </>
        )}
      </View>
      {shopData !== undefined && shopData.length > 0 && (
        <View style={[styles.innerRoot]}>
          <TouchableOpacity onPress={handleCheckout}>
            <View style={styles.checkoutView}>
              <Text category="label" style={styles.checkoutText}>
                Checkout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </Layout>
  );
};

export default ShopView;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-around',
  },
  innerRoot: {
    bottom: 10,
    alignSelf: 'center',
    width: width * 0.7,
    position: 'absolute',
  },
  checkoutView: {
    zIndex: 10,
    height: 65,
    marginHorizontal: width * 0.09,
    backgroundColor: '#000',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 25,
  },
  bookShop: {
    // maxHeight: '85%',
  },
  shopList: {
    marginTop: 30,
    alignItems: 'center',
  },
  bookList: {
    marginVertical: 5,
    gap: 30,
    // paddingHorizontal: 20,
  },
});
