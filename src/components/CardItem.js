import {View, StyleSheet, Text, TouchableHighlight, Alert} from 'react-native';
import Colors from '../assets/color.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {useContext} from 'react';
import {AuthContext} from '../redux/provider';
import {API_URL} from '../configs/config';

export default function (props) {
  const {token} = useContext(AuthContext);

  const removeHandler = barcode => {
    axios
      .post(`${API_URL}/task/${props.data.taskID}/undo-action?token=${token}`, {
        barcode: props.data.task.barcode,
        expiredDate: props.data.task.expiredDate,
      })
      .then(res => {
        if (res.data.status) {
          props.methods.fetchData();
        } else {
          Alert.alert('Thất bại', res.data.msg.vn);
        }
      })
      .catch(e => {
        Alert.alert('Thất bại', 'Có lỗi xảy ra, vui lòng thử lại.');
      });
  };

  return (
    <View
      style={[
        styles.card,
        {borderLeftColor: props.borderColor ? props.borderColor : Colors.black},
      ]}>
      <View style={{flex: 9, paddingRight: 20}}>
        {props.title ? (
          <Text style={styles.title} numberOfLines={1}>
            {props.title}
          </Text>
        ) : undefined}
        {props.children}
      </View>
      {props.removeEnabled ? (
        <TouchableHighlight
          style={{paddingHorizontal: 6}}
          underlayColor={null}
          activeOpacity={0.5}
          onPress={() => {
            removeHandler(props.data.task.barcode);
          }}>
          <FontAwesome
            name={'trash'}
            size={20}
            style={{color: Colors.danger}}
          />
        </TouchableHighlight>
      ) : (
        <View style={{flex: 1, alignItems: 'center'}}>{props.icon}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderLeftWidth: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
