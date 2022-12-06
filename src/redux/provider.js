import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useState} from 'react';
import {API_URL} from '../configs/config';

export const AuthContext = createContext();

export const Provider = ({children}) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [splashing, setSplashing] = useState(false);

  const login = ({account, password}) => {
    setLoading(true);
    axios
      .post(`${API_URL}/account/login`, {userCode: account, password})
      .then(res => {
        setLoading(false);
        if (res.data.status) {
          saveAuthentication({token: res.data.token, user: res.data.payload});
        } else {
          Alert.alert('Thất bại', res.data.msg.vn);
        }
      })
      .catch(e => {
        setLoading(false);
        Alert.alert('Thất bại', e.response.data.msg.vn);
        console.log(`Login error: ${e}`);
      });
  };

  const saveAuthentication = ({token, user}) => {
    setUser(user);
    setToken(token);
    AsyncStorage.setItem('user', JSON.stringify(user));
    AsyncStorage.setItem('token', JSON.stringify(token));
  };

  const updateProfile = (email, fullName, phoneNumber) => {
    setLoading(true);
    axios
      .put(`${API_URL}/account/update-me?token=${token}`, {
        email,
        fullName,
        phoneNumber,
      })
      .then(res => {
        setLoading(false);
        if (res.data.status) {
          Alert.alert('Thành công', res.data.msg.vn);
          authentication();
        } else {
          Alert.alert('Thất bại', res.data.msg.vn);
        }
      })
      .catch(e => {
        setLoading(false);
        Alert.alert('Thất bại', e);
        console.log(`Update profile failed: ${e}`);
      });
  };

  const resetData = () => {
    if (token && user) {
      AsyncStorage.removeItem('user');
      AsyncStorage.removeItem('token');
      setUser({});
      setToken('');
    }
  };

  const authentication = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      let user = await AsyncStorage.getItem('user');
      axios
        .get(`${API_URL}/account/me?token=${JSON.parse(token)}`)
        .then(res => {
          if (res.data.status) {
            user = res.data.data;
            token = res.data.data.access_token;
            saveAuthentication({token, user});
          } else {
            resetData();
          }
        })
        .catch(e => {
          resetData();
          console.log(`Authentication failed: ${e}`);
        });
    } catch (e) {
      Alert.alert('Thất bại', 'Có lỗi xảy ra, vui lòng thử lại.');
      console.log(`Authentication failed: ${e}`);
      resetData();
    }
  };

  useEffect(() => {
    authentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        token,
        user,
        loading,
        splashing,
        setLoading,
        setSplashing,
        setToken,
        setUser,
        updateProfile,
        resetData,
        authentication,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
