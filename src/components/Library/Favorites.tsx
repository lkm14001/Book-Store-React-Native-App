import { ActivityIndicator, FlatList, StyleSheet, View, useWindowDimensions } from 'react-native'
import Layout from '../Layout/Layout';
import { useQuery } from '../../realm/context/RealmContext'
import { useUser } from '@realm/react';
import { useState } from 'react';
import Favorites from '../../realm/models/favorites';
import Books from '../../realm/models/books';
import SingleBook from '../Home/Screens/SingleBook';
import { Text } from '@ui-kitten/components';



const UserFavorites = () => {
  
  const user = useUser();
  const userFavorites = useQuery(Favorites)
  const favs = userFavorites.filtered(`userId == "${user.id}"`)

  const [userFav,setUserFav] = useState<Books[]>(favs[0]?.favorites)

  console.log(userFav)
  return (
    <Layout style={styles.root}>
        {userFav?.length > 0 ? (
        <View style={styles.genreBooks}>
          <FlatList
            data={userFav}
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
            <Text category='label' style={{fontSize:30}}>Add Favorites to Display</Text>
        </View>
      )}
    </Layout>
  )
}

export default UserFavorites

const styles = StyleSheet.create({
  root:{
    flex:1
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
})