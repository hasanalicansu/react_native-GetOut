import {LOGIN_USER_SUCCESS, LOGIN_USER, LOGIN_USER_FAIL} from './types';
import * as RooterNavigation from '../../RooterNavigation.js';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const loginUser = ({email, password}) => {
  return (dispatch) => {
    dispatch({type: LOGIN_USER});

    if (email === '' || password === '') {
      Alert.alert(
        'BOŞ ALAN',
        'Lütfen boş olan alanı doldurunuz',
        [{text: 'OK', onPress: () => loginFail(dispatch)}],
        {cancelable: false},
      );
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/users/login',
        data: {
          email: email,
          sifre: password,
        },
      })
        .then((user) => {
          saveData('token', user.data.token),
            saveData('isim', user.data.user.isim),
            saveData('userName', user.data.user.userName),
            saveData('email', user.data.user.email);
          readData();
        })
        .then(() => loginSuccess(dispatch))
        .catch(() => loginFail(dispatch));
    }
  };
};

const registerLoginUser = (email) => {
  
    Alert.alert(
      'Kayıt Başarılı',
      email+" Belirtilen E-mail ile başarılı bir şekilde hesap oluşturuldu, lütfen giriş yapınız",
      [{text: 'TAMAM', onPress: () => {RooterNavigation.navigate('Home');}}],
      {cancelable: false},
    );
  
};

export const RegisterUser = ({isim, userName, email, password}) => {
  return async (dispatch) => {
    try {

    

      const res = await axios.post(
        'http://localhost:3000/api/users/createAccount',
        {email: email.toLowerCase(), sifre: password, isim:isim.toLowerCase(), userName: userName.toLowerCase()},
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
      );

      if (res.status == 206) {
        console.log(res.data);
        Alert.alert(
          'HATA',
          res.data.mesaj,
          [{text: 'TAMAM', onPress: () => loginFail(dispatch)}],
          {cancelable: false},
        );
      } else if (res.status == 200) {
        console.log(res.status, res.data.email);
        console.log('user.status,user.data.mesaj.email');
        registerLoginUser(res.data.email);
      }

    } catch (error) {
      console.log(error);
    }
  };
};

export const loginWithToken = (token) => {
  return async (dispatch) => {
    try {
      //invalid token

      const res = await axios.get(
        'http://localhost:3000/api/users/login/token',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );

      if (
        res.data.mesaj == 'invalid token' ||
        res.data.mesaj == 'jwt expired'
      ) {
        return loginFail(dispatch);
      } else {
        return loginSuccess(dispatch);
      }
    } catch (error) {
      loginFail(dispatch);
    }
  };
};

const saveData = async (dataName, data) => {
  try {
    await AsyncStorage.setItem(dataName, data);
  } catch (e) {}
};

const readData = async () => {
  try {
    const userToken = await AsyncStorage.getItem('token');
    console.log(userToken);
    const isim = await AsyncStorage.getItem('isim');
    console.log(isim);
    const userName = await AsyncStorage.getItem('userName');
    console.log(userName);
    const email = await AsyncStorage.getItem('email');
    console.log(email);
  } catch (e) {
    alert('Failed to fetch the data from storage');
  }
};

const loginSuccess = (dispatch) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
  });
  RooterNavigation.navigate('a');
};

const loginFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL,
  });
};
