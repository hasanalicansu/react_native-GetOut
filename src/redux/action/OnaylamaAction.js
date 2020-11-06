import {GET_ONAYLAMA_DATA} from './types';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import * as RooterNavigation from '../../RooterNavigation.js';
import {Alert} from 'react-native';

export const GetOnaylama = () => {
  return async (dispatch) => {
    try {
      const userToken = await AsyncStorage.getItem('token');
      const res = await axios.get(
        'http://localhost:3000/api/arkadas/istekgetir',
        {
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        },
      );

      //console.log(res.status);
      if (res.status==206) {
        dispatch({type: GET_ONAYLAMA_DATA, payload: "Herhangi bir istek bulunamadı" });
      } else {
        dispatch({type: GET_ONAYLAMA_DATA, payload: res.data.mesaj});
      }
      
    } catch (error) {
      console.log(error)
    }
  };
};

const refreshData= async()=>{
  try {
    const userToken = await AsyncStorage.getItem('token');
      const res = await axios.get(
        'http://localhost:3000/api/arkadas/istekgetir',
        {
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        },
      );
      return res;
  } catch (error) {
    console.log(error)
  }
}

export const SendTrue = (_id) => {
  return async(dispatch) => {
   try {
    const userToken = await AsyncStorage.getItem('token');
    const res = await axios.get(
      'http://localhost:3000/api/arkadas/istek/onay/'+_id,
      {
        headers: {
          Authorization: 'Bearer ' + userToken,
        },
      },
    );

    const res2 = await refreshData()
    dispatch({type: GET_ONAYLAMA_DATA, payload: res2.data.mesaj});
   } catch (error) {
     console.log(error);
   }
  };
};


export const SendFalse = (_id) => {
  return async(dispatch) => {
   try {
    const userToken = await AsyncStorage.getItem('token');
    const res = await axios.get(
      'http://localhost:3000/api/arkadas/istek/red/'+_id,
      {
        headers: {
          Authorization: 'Bearer ' + userToken,
        },
      },
    );

    const res2 = await refreshData()
    dispatch({type: GET_ONAYLAMA_DATA, payload: res2.data.mesaj});
    
   } catch (error) {
     console.log(error);
   }
  };
};
