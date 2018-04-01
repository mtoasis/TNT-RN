import { Constants, Google,  } from 'expo';
import React, { Component } from 'react';
import { Button, Alert, View, Text, StyleSheet } from "react-native";
import axios from 'axios'
import { storeUser } from "../../actions/dataAction"
import store from "../../../store"

export default class GoogleAuth extends Component {

  constructor() {
    super()
    this.state = {
      response: null,
    }
  }



_handleGoogleLogin = async () => {
  try {
    const { type, user } = await Google.logInAsync({
      androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
      iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
      androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
      iosClientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    });

    switch (type) {
      case 'success': {
        Alert.alert(
          'Logged in!',
          `Hi ${user.name}!`,
        );

        const info = {
          name: {
            familyName: user.familyName,
            givenName: user.givenName
          },
          id: user.id,
          email: user.email,
          photoUrl: user.photoUrl
        }
        axios.post("http://toolntool.herokuapp.com/auth/mobile", info)
          .then(response => {
            store.dispatch({
              type: "STORE_USER",
              payload: response.data
            })
          })
        break;
      }
      case 'cancel': {
        Alert.alert(
          'Cancelled!',
          'Login was cancelled!',
        );
        break;
      }
      default: {
        Alert.alert(
          'Oops!',
          'Login failed!',
          'default',
        );
      }
    }
  } catch (e) {
    Alert.alert(
      'Oops!',
      'Login failed!',
      'error',
    );
  }
};

render() {
  return (

      <Button
        color="red"
        title="Login with Google"
        onPress={this._handleGoogleLogin}
      />

  )
}

}
