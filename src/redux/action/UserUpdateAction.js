import {USER_UPDATE, GET_USER_DATA} from './types';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//dispatch({type: GET_USER_DATA, payload: users.val()});

export const UserDataGetAction = () => {
  return async (dispatch) => {
    try {
      const res = await DataGet();
      dispatch({type: GET_USER_DATA, payload: res.data});
    } catch (error) {
      console.log(error);
    }
  };
};

const DataGet = async () => {
  try {
    const userToken = await AsyncStorage.getItem('token');
    const res = await axios.get('https://nameless-ocean-22153.herokuapp.com/api/durum/get/', {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error)
  }
 
};

export const UserDataUpdateAction = (note, cikma) => {
  return async (dispatch) => {
    try {
      const userToken = await AsyncStorage.getItem('token');
      const update = await axios.patch(
        'https://nameless-ocean-22153.herokuapp.com/api/durum',
        {text: note, durum: cikma},
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
        },
      );
      const res = await DataGet();
      dispatch({type: GET_USER_DATA, payload: res.data});
    } catch (error) {
      console.log(error);
    }
  };
};
