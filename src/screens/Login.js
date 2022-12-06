import {
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {useState, useContext} from 'react';
import Colors from '../assets/color.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../redux/provider';

export default function ({navigation}) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const {login, loading} = useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Image
          source={require('../assets/6948.png')}
          style={{width: '100%', height: '80%'}}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Xin chào,</Text>
        <Text style={styles.subTitle}>Đăng nhập vào tài khoản</Text>
        <View style={styles.inputGroup}>
          <FontAwesome
            name="user"
            size={24}
            color={Colors.gray}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Tên tài khoản"
            placeholderTextColor={Colors.gray}
            onChangeText={setAccount}
          />
        </View>
        <View style={styles.inputGroup}>
          <FontAwesome
            name="lock"
            size={24}
            color={Colors.gray}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            placeholderTextColor={Colors.gray}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.inputGroup}>
          <TouchableHighlight
            onPress={() => {
              login({account, password});
            }}
            underlayColor={Colors.white}
            activeOpacity={0.7}>
            <View style={styles.button}>
              <Text style={{fontWeight: 'bold', color: Colors.white}}>
                Đăng nhập
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.inputGroup}>
          <ActivityIndicator animating={loading} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 2,
  },
  title: {
    color: Colors.primary,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subTitle: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
  },
  input: {
    borderBottomWidth: 1,
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderColor: Colors.black,
    color: Colors.black,
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 20,
  },
});
