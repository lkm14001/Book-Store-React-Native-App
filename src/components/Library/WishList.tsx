import { StyleSheet, View } from 'react-native'
import {Layout,Text} from '@ui-kitten/components'

const WishList = () => {
  return (
    <Layout style={styles.root}>
        <Text>WishList</Text>
    </Layout>
  )
}

export default WishList

const styles = StyleSheet.create({
    root:{
        flex:1
    }
})