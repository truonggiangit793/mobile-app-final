import {View, StyleSheet, Image, StatusBar} from 'react-native';
import Colors from '../assets/color.json';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../redux/provider';
import {navigationName} from '../configs/config';

export default function ({navigation}) {
  const {token} = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      navigation.navigate(navigationName.login);
    } else {
      navigation.navigate(navigationName.root);
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image
        source={require('../assets/logo-small.png')}
        style={{width: 80, height: 80}}
      />
      <Image
        source={require('../assets/loading.gif')}
        style={{width: 40, height: 40}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    zIndex: 100000,
  },
});
