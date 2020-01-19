import axios from 'axios';
import {action, createStore, thunk} from 'easy-peasy';
import {baseUrl} from '../libs/vars';
import AsyncStorage from '@react-native-community/async-storage';

export const store = createStore({
  institute: {
    students: [],
  },
  getInstitute: thunk(async (actions: any, payload: any) => {
    const token = await AsyncStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const {data} = await axios.post(
      baseUrl + '/api/reseller/institute',
      payload,
      {
        headers,
      },
    );

    actions.setInstitute(data.institute);
  }),
  setInstitute: action((state: any, payload: any) => {
    state.institute = payload;
  }),

  addStudent: thunk(async (actions: any, payload: any) => {
    const token = await AsyncStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const {data} = await axios.post(
      baseUrl + '/api/reseller/students/add',
      payload,
      {
        headers,
      },
    );

    actions.setInstitute(data.institute);
  }),

  toggleSubscription: thunk(async (actions: any, payload: any) => {
    const token = await AsyncStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const {data} = await axios.post(
      baseUrl + '/api/reseller/subscriptions/toggle',
      payload,
      {
        headers,
      },
    );

    actions.setInstitute(data.institute);
  }),
});
