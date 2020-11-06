import {Alert} from 'react-native';
import {GET_SEARCH} from './types';
import * as RooterNavigation from '../../RooterNavigation.js';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const SearchUser = (name) => {
  return async(dispatch) => {
    if (name === '') {
      Alert.alert(
        'BOŞ ALAN',
        'Lütfen boş olan alanı doldurunuz',
        [{text: 'OK', onPress: () => null}],
        {cancelable: false},
      );
    } else {
      try {
        const userToken = await AsyncStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/arkadas/arama/'+name.toLowerCase(), {
        headers: {
          Authorization: "Bearer "+userToken,
        },
      });
      console.log(res.data.mesaj);
      
      if (res.status==200) {
        dispatch({type: GET_SEARCH, payload: res.data.mesaj});
      } else {
        Alert.alert(
          '',
          'Böyle bir kullanıcı bulunmamaktadır',
          [{text: 'OK', onPress: () => null}],
          {cancelable: false},
        );
      }
      } catch (error) {
        console.log(error)
      }
      
    }
  };
};

export const AddFriend = (friendsId) => {
  return async(dispatch)=>{
    try {
      const userToken = await AsyncStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/arkadas/istek/'+friendsId, {
      headers: {
        Authorization: "Bearer "+userToken,
        },
      });
      console.log(res);
      if (res.status===200) {
        Alert.alert(
          'EKLİ KİŞİ',
          'Eklemeye çalıştığınız arkdaşınıza istek gönderildi',
          [{text: 'OK', onPress: () => null}],
          {cancelable: false},
        );
      }else if(res.status===206) {
        Alert.alert(
          'EKLİ KİŞİ',
          "Halihazırda arkadaşsınız",
          [{text: 'OK', onPress: () => null}],
          {cancelable: false},
        );
      }else if(res.status===207) {
        Alert.alert(
          'EKLİ KİŞİ',
          res.data.mesaj,
          [{text: 'OK', onPress: () => null}],
          {cancelable: false},
        );
      }
      
    } catch (error) {
      console.log(error,"aaa")
    }
  }

};
