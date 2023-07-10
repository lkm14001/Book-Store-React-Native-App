import { StyleSheet, View,Dimensions, Pressable } from 'react-native'
import Layout from '../../../components/Layout/Layout';
import TabBarIcon from '../TabBarIcon/TabBarIcon';

const {width} = Dimensions.get('window')

const CustomBottomTab = ({state,descriptors,navigation}:any) => {
  return (
    <>
    <Layout style={styles.mainContainer}>
      {state.routes.map((route: any , index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key = {index} style = {[styles.mainItemContainer]}>
            <Pressable
              onPress = {onPress}
              style = {{backgroundColor: isFocused?"#030D16": "#182028", borderRadius: 20, }}>
              <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15}}>
                <TabBarIcon route={label} isFocused={isFocused}/>
              </View>
            </Pressable>
          </View>
        );
      })}
    </Layout>
    </>
  )
}

export default CustomBottomTab

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        bottom: 0,
        height:70,
        elevation:50
      },
      mainItemContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        marginVertical: 10,
        borderRadius: 1, 
        borderColor: "#333B42"
      }, 
})