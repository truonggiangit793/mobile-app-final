import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import SafeView from '../components/SafeView';
import Colors from '../assets/color.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

export default function ({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState('CK-PT9116');
  const [email, setEmail] = useState('truonggiangit793@gmail.com');
  const [role, setRole] = useState('STAFF');
  const [fullName, setFullName] = useState('Pham Truong Giang');
  const [phoneNumber, setPhoneNumber] = useState('0702907154');
  return (
    <View style={styles.container}>
      <Header navigation={navigation} user="Giang" />
      <SafeView>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            alignSelf: 'center',
            marginVertical: 10,
          }}>
          Thông tin cá nhân
        </Text>
        <View style={styles.main}>
          <View style={[styles.group, {opacity: 0.5}]}>
            <Feather
              name="user"
              size={18}
              color={Colors.mainColor}
              style={styles.icon}
            />
            <Text style={styles.label}>Tài khoản:</Text>
            <TextInput
              style={styles.input}
              value={user}
              placeholder="Tài khoản"
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
          <View style={[styles.group, {opacity: 0.5}]}>
            <Feather
              name="settings"
              size={18}
              color={Colors.mainColor}
              style={styles.icon}
            />
            <Text style={styles.label}>Chức vụ:</Text>
            <TextInput
              style={styles.input}
              value={role}
              placeholder="Chức vụ"
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
          <View style={styles.group}>
            <Feather
              name="smile"
              size={18}
              color={Colors.mainColor}
              style={styles.icon}
            />
            <Text style={styles.label}>Họ tên:</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Họ và tên"
            />
          </View>
          <View style={styles.group}>
            <FontAwesome
              name="envelope-o"
              size={18}
              color={Colors.mainColor}
              style={styles.icon}
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />
          </View>
          <View style={styles.group}>
            <Feather
              name="phone-call"
              size={18}
              color={Colors.mainColor}
              style={styles.icon}
            />
            <Text style={styles.label}>Liên hệ:</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Điện thoại"
            />
          </View>
          <View style={[styles.group, {marginVertical: 20}]}>
            <TouchableHighlight
              onPress={() => {}}
              underlayColor={Colors.white}
              activeOpacity={0.7}>
              <View style={styles.button}>
                <Text style={{fontWeight: 'bold', color: Colors.white}}>
                  Cập nhật
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
    paddingLeft: 120,
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
