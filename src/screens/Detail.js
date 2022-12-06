import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import {API_URL, navigationName} from '../configs/config';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SafeView from '../components/SafeView';
import CardItem from '../components/CardItem';
import Colors from '../assets/color.json';
import Loading from '../components/Loading';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {AuthContext} from '../redux/provider';

export default ({route, navigation}) => {
  const taskID = route.params.taskID;
  const {token} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    axios
      .get(`${API_URL}/account/my-task/${taskID}/detail?token=${token}`)
      .then(res => {
        setLoading(false);
        if (res.data.data.yourProductTrackedList.total > 0) {
          setData(res.data.data.yourProductTrackedList.list);
        } else {
          setData([]);
        }
      })
      .catch(e => {
        setLoading(false);
        setData([]);
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData();
    return () => {
      console.log('Detail component unmounded');
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header navigation={navigation} back={true} title="Danh sách sản phẩm" />
      <SafeView hasFooter={true}>
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
                    navigation.navigate(navigationName.action, {data: task});
                  }}>
                  <CardItem
                    borderColor={Colors.mainColor}
                    title={task.productName}
                    removeEnabled={true}
                    methods={{fetchData}}
                    data={{task, taskID: taskID}}>
                    <Text>{task.barcode}</Text>
                    <Text>HSD: {task.expiredDate}</Text>
                    <Text>QTY: {task.quantity}</Text>
                  </CardItem>
                </TouchableHighlight>
              );
            })
          )}
        </ScrollView>
      </SafeView>
      <Footer navigation={navigation} data={{taskID: taskID}} />
    </View>
  );
};
