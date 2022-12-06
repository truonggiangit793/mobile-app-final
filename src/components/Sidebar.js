import {View, Image, Text, TouchableHighlight} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Colors from '../assets/color.json';
import {useContext} from 'react';
import {AuthContext} from '../redux/provider';

export default function (props) {
  const {resetData} = useContext(AuthContext);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: '20%',
          backgroundColor: Colors.mainColor,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 10,
        }}>
        <Image
          source={require('../assets/logo.png')}
          style={{
            resizeMode: 'center',
            width: 100,
            height: 100,
            alignSelf: 'center',
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
      <View
        style={{
          marginBottom: 15,
          width: '100%',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <TouchableHighlight
          onPress={() => {
            resetData();
          }}
          underlayColor={Colors.white}
          activeOpacity={0.7}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: Colors.mainColor,
              paddingVertical: 14,
              paddingHorizontal: 10,
              borderRadius: 150,
              marginBottom: 10,
            }}>
            <Text style={{fontWeight: 'bold', color: Colors.white}}>
              Đăng xuất
            </Text>
          </View>
        </TouchableHighlight>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'center',
            color: 'grey',
            marginBottom: 10,
          }}>
          @truonggiangit793
        </Text>
      </View>
    </View>
  );
}
