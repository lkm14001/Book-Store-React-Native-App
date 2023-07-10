import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  App: undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
export type RegistrationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Registration'
>;
export type AppScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'App'
>;


export type RootTabsParamList = {
  Home:undefined;
  Library:undefined;
  Shop:undefined;
}

export type HomeScreenNavigatorProp = NativeStackNavigationProp<RootTabsParamList,'Home'>
export type LibraryScreenNavigationProp = NativeStackNavigationProp<RootTabsParamList,'Library'>
export type ShopScreenNavigationProp = NativeStackNavigationProp<RootTabsParamList,'Shop'>


export type RootHomeStackParamList = {
  Main:undefined;
  Genres:undefined;
  GenreSpecificBooks:{
    genre:string
  }
}

export type MainScreenNavigationProp = NativeStackNavigationProp<RootHomeStackParamList,'Main'>
export type GenreScreenNavigationProp = NativeStackNavigationProp<RootHomeStackParamList,'Genres'>
export type GenreSpecificBooksScreenNavigationProp = NativeStackNavigationProp<RootHomeStackParamList,'GenreSpecificBooks'>

