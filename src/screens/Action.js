import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {API_URL, navigationName} from '../configs/config';
import Header from '../components/Header';
import SafeView from '../components/SafeView';
import Colors from '../assets/color.json';
import {useContext, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import axios from 'axios';
import {AuthContext} from '../redux/provider';

export default ({route, navigation}) => {
  const taskID = route.params.taskID;
  const data = route.params.data;
  const {token} = useContext(AuthContext);
  const [qty, setQty] = useState(0);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const hideDatepicker = () => {
    setShow(false);
  };
  const submitHandler = () => {
    setShow(false);
    let dateString = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    axios
      .post(`${API_URL}/task/${taskID}/action?token=${token}`, {
        barcode: data.barcode,
        quantity: qty,
        expiredDate: dateString,
      })
      .then(res => {
        if (res.data.status) {
          navigation.navigate(navigationName.detail, {taskID});
        } else {
          Alert.alert('Thất bại', res.data.msg.vn);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        navigation={navigation}
        back={true}
        backTo={navigationName.home}
        title="Thực hiện"
      />
      <SafeView>
        <ScrollView style={{paddingHorizontal: 20}}>
          <View
            style={{
              marginVertical: 20,
              alignItems: 'center',
            }}>
            <Barcode value="12345678999" options={{format: 'UPC'}} />
            <Text>{data.barcode}</Text>
          </View>
          <View style={{marginVertical: 20}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {data.productName}
            </Text>
          </View>

          <View style={{marginBottom: 20}}>
            <Text
              numberOfLines={1}
              style={{
                fontWeight: 'bold',
                marginBottom: 8,
              }}>
              Số lượng:
            </Text>
            <TextInput
              maxLength={2}
              keyboardType={'numeric'}
              style={styles.quantityInput}
              onChangeText={setQty}
              placeholder="Số lượng"
            />
          </View>

          <View style={{marginBottom: 20}}>
            <Text
              numberOfLines={1}
              style={{
                fontWeight: 'bold',
                marginBottom: 10,
              }}>
              Hạn sử dụng:
            </Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                onPressIn={showDatepicker}
                editable={false}
                style={{
                  width: 40,
                  textAlign: 'center',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 6,
                  marginRight: 10,
                  borderColor: Colors.gray,
                }}
                color={Colors.back}
                placeholder="DD"
                value={date.getDate().toString()}
              />
              <Text style={{marginRight: 10}}>/</Text>
              <TextInput
                onPressIn={showDatepicker}
                editable={false}
                style={{
                  width: 40,
                  textAlign: 'center',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 6,
                  marginRight: 10,
                  borderColor: Colors.gray,
                }}
                color={Colors.back}
                placeholder="MM"
                value={(date.getMonth() + 1).toString()}
              />
              <Text style={{marginRight: 10}}>/</Text>
              <TextInput
                onPressIn={showDatepicker}
                editable={false}
                style={{
                  width: 60,
                  textAlign: 'center',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 6,
                  marginRight: 10,
                  borderColor: Colors.gray,
                }}
                color={Colors.back}
                placeholder="YYYY"
                value={date.getFullYear().toString()}
              />
            </View>
          </View>
          <View style={{marginBottom: 20}}>
            <TouchableHighlight
              onPress={submitHandler}
              underlayColor="null"
              activeOpacity={0.8}>
              <View
                style={{
                  backgroundColor: Colors.mainColor,
                  paddingVertical: 12,
                  borderRadius: 6,
                }}>
                <Text style={{color: Colors.white, textAlign: 'center'}}>
                  Xác nhận
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </SafeView>
      {show ? (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: Colors.lightGray,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              backgroundColor: Colors.lightGrayDarker,
              color: Colors.white,
            }}>
            <TouchableHighlight
              onPress={hideDatepicker}
              underlayColor={Colors.lightGrayDarker}
              activeOpacity={0.5}>
              <Text
                style={{
                  color: Colors.black,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                Xong
              </Text>
            </TouchableHighlight>
          </View>
          <DateTimePicker
            value={date}
            mode={'date'}
            display={'spinner'}
            onChange={onChange}
          />
        </View>
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  quantityInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
});
