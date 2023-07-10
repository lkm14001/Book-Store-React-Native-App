import {StyleSheet, TouchableOpacity, View} from 'react-native';
import { Text, Icon, Avatar, IndexPath, OverflowMenu, MenuItem} from '@ui-kitten/components';
import Layout from '../../components/Layout/Layout';
import {useState} from 'react';
import { useApp } from '@realm/react';

const Header = () => {
  const app = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>();

  const openAccountMenu = () => {
    setIsMenuOpen(true);
  };

  const accountMenuSelect = (index: IndexPath) => {
    setSelectedIndex(index);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await app.currentUser?.logOut();
  }

  const AccountIcon = () => (
    <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
        <Avatar
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
          }}
          size="small"
        />
      </TouchableOpacity>
  )

  return (
    <Layout
      style={{
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        borderColor: 'white',
        borderWidth: 0,
        elevation: 10,
      }}>
      
      <OverflowMenu
      animationType='fade'
      centerContent    
      anchor={AccountIcon}
      visible={isMenuOpen}
      // backdropStyle={styles.backDrop}
      style={styles.accountMenu}
      selectedIndex={selectedIndex}
      onBackdropPress={() => setIsMenuOpen(false)}
      indicator={() => (<></>)}
      onSelect={accountMenuSelect}>
        <MenuItem title='Profile' />
        <MenuItem title='Logout' onPress={handleLogout}/>
      </OverflowMenu>
    </Layout>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  accountMenu:{
    marginTop:10
  }
});
