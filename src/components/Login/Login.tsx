import {StyleSheet, View, Pressable} from 'react-native';
import { Button, Input, Text} from '@ui-kitten/components';
import Layout from '../Layout/Layout';
import {useState} from 'react';

import {useNavigation} from '@react-navigation/native';


import Realm from 'realm';
import { LoginScreenNavigationProp } from '../../navigation/types';
import { useApp } from '@realm/react';


const Login = () => {
  const app = useApp()
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const credentials = Realm.Credentials.emailPassword(email, password); 
    await app.logIn(credentials)
  };

  const handleNavigate = () => {};

  return (
    <>
      <Layout style={styles.root}>
        <View style={styles.loginView}>
          <Input
            label="Email Id"
            placeholder="Enter Email id"
            value={email}
            onChangeText={newValue => setEmail(newValue)}
          />
          <Input
            secureTextEntry
            label="Password"
            placeholder="Enter password"
            value={password}
            onChangeText={newValue => setPassword(newValue)}
          />
          <Button onPress={handleLogin}>Login</Button>
          <Pressable onPress={() => navigation.navigate('Registration')}>
            <Text>Register Here</Text>
          </Pressable>
        </View>
      </Layout>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loginView: {
    margin: 30,
    gap: 20,
  },
});
