import {GET_FRIENDS, GET_ONE_FRIENDS} from './types';
import * as RooterNavigation from '../../RooterNavigation.js';
import {Alert} from 'react-native';
import {functions} from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const GetFriends =  () => {
  return async (dispatch) => {
    const userToken = await AsyncStorage.getItem('token');
    const res = await axios.get('https://nameless-ocean-22153.herokuapp.com/api/arkadas/get', {
      headers: {
        Authorization: "Bearer "+userToken,
      },
    });
    
    
    dispatch({type: GET_FRIENDS, payload: res.data.mesaj})
  };
};

export const DeleteFriends = (dellId) => {
  return async(dispatch) => {
    try {
      const userToken = await AsyncStorage.getItem('token');
      const res = await axios.get(
      'https://nameless-ocean-22153.herokuapp.com/api/arkadas/arkadasSil/'+dellId,
      {
        headers: {
          Authorization: 'Bearer ' + userToken,
        },
      },
    );
    } catch (error) {
      console.log(error)
    }
  };
};
