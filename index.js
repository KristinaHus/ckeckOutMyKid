import React from 'react'
import { AppRegistry } from 'react-native';
import App from './App';
import Store from './store'

AppRegistry.registerComponent('checkOutMyKid', () => (<App store={Store} />));
