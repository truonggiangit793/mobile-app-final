import {View, Dimensions, Platform} from 'react-native';
const {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');

export default function (props) {
  const screenHeight = props.hasFooter ? height - 90 : height;
  return (
    <View
      style={{
        position: 'absolute',
        paddingTop: 10,
        marginTop: Platform.OS == 'ios' ? 100 : 60,
        height: Platform.OS == 'ios' ? screenHeight - 125 : screenHeight - 85,
        width: width,
      }}>
      {props.children}
    </View>
  );
}
