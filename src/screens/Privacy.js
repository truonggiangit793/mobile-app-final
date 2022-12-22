import {useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import SafeView from '../components/SafeView';
import Colors from '../assets/color.json';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../redux/provider';
import Loading from '../components/Loading';
import axios from 'axios';
import {API_URL} from '../configs/config';

export default function ({navigation}) {
  const {user, token, setToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const updatePassword = () => {
    console.log('Request to change password');
    setIsLoading(true);
    axios
      .put(`${API_URL}/account/change-password?token=${token}`, {
        oldPassword: oldPassword,
        newPassword: newPassword,
        repeatPassword: repeatPassword,
      })
      .then(res => {
        setIsLoading(false);
        if (res.data.status) {
          Alert.alert('Thành công!', res.data.msg.vn);
          setToken(res.data.token);
          setOldPassword('');
          setNewPassword('');
          setRepeatPassword('');
        } else {
          Alert.alert('Thất bại!', res.data.msg.vn);
        }
      })
      .catch(e => {
        setIsLoading(false);
        Alert.alert('Thất bại!', 'Có lỗi xảy ra, vui lòng thử lại.');
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} user={user.fullName} />
      <SafeView>
        <Loading isLoading={isLoading} />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            alignSelf: 'center',
            marginVertical: 10,
          }}>
          Thay đổi mật khẩu
        </Text>
        <View style={styles.main}>
          <View style={styles.group}>
            <Feather
              name="user"
              size={18}
              color={Colors.mainColor}
              style={styles.icon}
            />
            <Text style={styles.label}>Mật khẩu cũ:</Text>
            <TextInput
              style={styles.input}
              value={oldPassword}
              placeholder="* * * * *"
              onChangeText={setOldPassword}
              secureTextEntry={true}
              selectTextOnFocus={false}
            />
          </View>
          <View style={styles.group}>
            <Feather
              name="user"
              size={18}
              color={Colors.mainColor}
              style={styles.icon}
            />
            <Text style={styles.label}>Mật khẩu mới:</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              placeholder="* * * * *"
              onChangeText={setNewPassword}
              secureTextEntry={true}
              selectTextOnFocus={false}
            />
          </View>
          <View style={styles.group}>
            <Feather
              name="user"
              size={18}
              color={Colors.mainColor}
              style={styles.icon}
            />
            <Text style={styles.label}>Nhập lại:</Text>
            <TextInput
              style={styles.input}
              value={repeatPassword}
              placeholder="* * * * *"
              onChangeText={setRepeatPassword}
              secureTextEntry={true}
              selectTextOnFocus={false}
            />
          </View>
          <View style={[styles.group, {marginVertical: 20}]}>
            <TouchableHighlight
              onPress={updatePassword}
              underlayColor={Colors.white}
              activeOpacity={0.7}>
              <View style={styles.button}>
                <Text style={{fontWeight: 'bold', color: Colors.white}}>
                  Đổi mật khẩu
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <ActivityIndicator animating={isLoading} />
        </View>
      </SafeView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  main: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  group: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: {
    position: 'absolute',
  },
  label: {
    fontSize: 12,
    position: 'absolute',
    marginLeft: 30,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    width: '100%',
    paddingLeft: 130,
    paddingVertical: 20,
    borderColor: Colors.gray,
    color: Colors.black,
    fontSize: 12,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
  },
});
