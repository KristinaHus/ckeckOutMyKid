import { types } from 'mobx-state-tree';
import { AsyncStorage } from 'react-native';
import { persist } from './persist';

const Store = types.model('Store', {
  date: '1989-06-01',
  hydrated: false,
  get age() {
    return this.date;
  },
}, {
  setDate(date) {
    this.date = date;
  },
  afterHydration() {
    // This lifecycle is called after the store is hydrated
    this.hydrated = true;
    console.log('I feel refreshed!');
  },
});

const store = Store.create();

persist('@MyStoreKey', store, {
  storage: AsyncStorage, // AsyncStorage for React-Native, localStorage for web
  jsonify: true, // Set to true if using AsyncStorage
}, {
  date: true, // which keys to persist
});

export default store;