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
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

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
              onPress={() => {}}
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
