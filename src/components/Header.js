import {View, TouchableOpacity, StyleSheet, Text, Platform} from 'react-native';
import Colors from '../assets/color.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default ({
  navigation,
  title = null,
  user = null,
  back = false,
  backTo = null,
}) => {
  return (
    <View style={styles.header}>
      {back ? (
        <TouchableOpacity
          onPress={() => {
            backTo ? navigation.navigate(backTo) : navigation.goBack(true);
            console.log('Back');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesome
            name="angle-left"
            size={25}
            style={{color: Colors.white, marginRight: 10}}
          />
          <Text style={{color: Colors.white, fontSize: 15}}>Quay lại</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <FontAwesome
            name="align-left"
            size={20}
            style={{color: Colors.white}}
          />
        </TouchableOpacity>
      )}
      {user ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{color: Colors.white}}>Xin chào, {user}</Text>
          <FontAwesome
            name="user"
            size={18}
            style={{color: Colors.white, marginLeft: 10}}
          />
        </View>
      ) : title ? (
        <Text style={{color: Colors.white, fontWeight: 'bold'}}>{title}</Text>
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: Platform.OS == 'android' ? 'center' : 'flex-end',
    paddingBottom: Platform.OS == 'ios' ? 20 : 0,
    height: Platform.OS == 'ios' ? 100 : 60,
    backgroundColor: Colors.mainColor,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
    paddingHorizontal: 30,
    position: 'absolute',
    zIndex: 100000,
  },
});
