import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import CardItem from '../components/CardItem';
import Header from '../components/Header';
import SafeView from '../components/SafeView';
import {API_URL, navigationName} from '../configs/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/color.json';
import Loading from '../components/Loading';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useContext} from 'react';
import {AuthContext} from '../redux/provider';

export default ({navigation}) => {
  const {token, user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    axios
      .get(`${API_URL}/account/my-task/all?token=${token}`)
      .then(res => {
        setLoading(false);
        if (res.data.status && res.data.data.total > 0) {
          setData(res.data.data.taskList);
        } else {
          setData([]);
        }
      })
      .catch(e => {
        setLoading(false);
        setData([]);
        console.log({e});
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header navigation={navigation} user={user.fullName} />
      <SafeView>
        <Loading isLoading={loading} />
        <ScrollView
          style={{paddingHorizontal: 20, paddingVertical: 10}}
          refreshControl={<RefreshControl onRefresh={fetchData} />}>
          {data.length <= 0 ? (
            <Text style={{textAlign: 'center', marginVertical: 10}}>
              Không có dữ liệu, danh sách trống.
            </Text>
          ) : (
            data.map((task, index) => {
              return (
                <TouchableHighlight
                  key={index}
                  style={{marginBottom: 14}}
                  underlayColor={null}
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate(navigationName.detail, {
                      taskID: task.taskID,
                    });
                  }}>
                  <CardItem
                    borderColor={task.isDone ? Colors.done : Colors.progressing}
                    title={task.taskName}
                    icon={
                      <FontAwesome
                        name={task.isDone ? 'check-circle' : 'refresh'}
                        size={20}
                        style={{
                          color: task.isDone ? Colors.done : Colors.progressing,
                        }}
                      />
                    }>
                    <Text>Thành viên: {task.memberList.length}</Text>
                  </CardItem>
                </TouchableHighlight>
              );
            })
          )}
        </ScrollView>
      </SafeView>
    </View>
  );
};
