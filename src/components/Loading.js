import {Text, View, StyleSheet, Image} from 'react-native';
import Colors from '../assets/color.json';

export default function ({isLoading = false}) {
  return isLoading ? (
    <View style={styles.container}>
      <Image
        source={require('../assets/loading.gif')}
        style={{width: 40, height: 40}}
      />
    </View>
  ) : undefined;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '105%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    zIndex: 100000,
  },
});
