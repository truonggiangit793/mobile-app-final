import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import Colors from '../assets/color.json';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigationName} from '../configs/config';

const {width} = Dimensions.get('window');

export default ({methods, data, navigation}) => {
  return (
    <View style={styles.footer}>
      <View style={styles.cirle}>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate(navigationName.camera, {taskID: data.taskID});
          }}
          underlayColor={Colors.mainColor}
          activeOpacity={0.5}>
          <MaterialCommunityIcons
            name="barcode-scan"
            size={40}
            color={Colors.white}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: Platform.OS == 'ios' ? 60 : 40,
    backgroundColor: Colors.mainColor,
    alignItems: 'center',
    zIndex: 100000,
  },
  cirle: {
    top: -30,
    position: 'absolute',
    backgroundColor: Colors.mainColor,
    padding: 20,
    borderRadius: 100,
  },
});
