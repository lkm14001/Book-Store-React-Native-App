import {Alert, StyleSheet, View} from 'react-native';
import {Layout, Button, Input} from '@ui-kitten/components';
import {useState} from 'react';

import {useApp} from '@realm/react';
import Realm from 'realm';

import {useNavigation} from '@react-navigation/native';
import { RegistrationScreenNavigationProp } from '../../navigation/types';

const Registration = () => {
  const app = useApp()
  const navigation = useNavigation<RegistrationScreenNavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegistration = async () => {
    try {
      await app.emailPasswordAuth.registerUser({email, password});
      Alert.alert('Registration Successfull','Navigate to Login Screen ?',[{text:'Go to Login',onPress:() => navigation.navigate('Login')}])
    } catch (err) {
      console.log('Error', err);
    }
  };

  return (
    <>
      <Layout style={styles.root}>
        <View style={styles.registrationView}>
          <Input
            placeholder="Enter email id"
            label="Email Id"
            value={email}
            onChangeText={newValue => setEmail(newValue)}
          />
          <Input
            placeholder="Enter Password"
            label="Password"
            value={password}
            secureTextEntry
            onChangeText={newValue => setPassword(newValue)}
          />
          <Button onPress={handleRegistration}>Register</Button>
        </View>
      </Layout>
    </>
  );
};

export default Registration;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  registrationView: {
    margin: 30,
    gap: 20,
  },
});
