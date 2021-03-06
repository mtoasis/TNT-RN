import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from "react-redux"
import store from "./store"
import Tabs from './src/components/config/router'


export default class App extends Component {

  render() {

    return (
      <Provider store={store}>    

        <Tabs />

      </Provider>
    );
  }
}
