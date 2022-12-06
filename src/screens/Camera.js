import {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, Image, Alert} from 'react-native';
import {API_URL, navigationName} from '../configs/config';
import Header from '../components/Header';
import {BarCodeScanner} from 'expo-barcode-scanner';
import Colors from '../assets/color.json';
import Loading from '../components/Loading';
import SafeView from '../components/SafeView';
import axios from 'axios';
import {AuthContext} from '../redux/provider';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

export default ({route, navigation}) => {
  const {token} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    setLoading(true);
    axios
      .get(`${API_URL}/product/get-detail?barcode=${data}&token=${token}`)
      .then(res => {
        if (res.data.status) {
          navigation.navigate(navigationName.action, {
            data: res.data.result.data,
            taskID: route.params.taskID,
          });
        } else {
          Alert.alert('Thất bại', res.data.msg.vn);
          navigation.goBack(true);
        }
      })
      .catch(e => {
        Alert.alert('Thất bại', e.response.data.msg.vn);
        navigation.goBack(true);
        console.log(e);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} back={true} title="Máy quét" />
      <SafeView>
        <Loading isLoading={loading} />
        {!loading ? (
          <View style={styles.scannerContainer}>
            {hasPermission === null ? (
              <Text style={{color: Colors.black}}>
                Requesting for camera permission
              </Text>
            ) : undefined}
            {hasPermission === false ? (
              <Text style={{color: Colors.black}}>
                No permission access to camera
              </Text>
            ) : undefined}
            {hasPermission ? (
              <View style={styles.scannerContainer}>
                <Image
                  source={require('../assets/scanner-frame.png')}
                  style={styles.frame}
                />
                <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  style={styles.camera}
                />
              </View>
            ) : undefined}
          </View>
        ) : undefined}
      </SafeView>
    </View>
  );
};

const styles = StyleSheet.create({
  scannerContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    position: 'absolute',
    width: width - 150,
    height: height - 700,
    zIndex: 100,
  },
  camera: {
    width: width - 100,
    height: height - 400,
  },
});
