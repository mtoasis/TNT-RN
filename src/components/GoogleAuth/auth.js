import { Constants, Google, } from 'expo';
import React, { Component } from 'react';
import { Button, Alert, View, Text, StyleSheet } from "react-native";
import axios from 'axios'
import { storeUser } from "../../actions/dataAction"
import store from "../../../store"

export default class GoogleAuth extends Component {

  constructor() {
    super()
    this.state = {
      userInfo: null,
    }
  }

  getUserPosts() {
    axios.post("http://toolntool.herokuapp.com/api/mobile/userposts", {
        id: this.state.userInfo._id
    })
        .then(response => {
          store.dispatch({
            type: "STORE_USERPOST",
            payload: response.data
          })
            console.log("user post stored")
        })
}

  getConversation = async () => {
    console.log("requesting conversation... ")
    let res = await axios.post("http://toolntool.herokuapp.com/api/mobile/conversations", {
      _id: this.state.userInfo._id
    })
      .then(response => {
        store.dispatch({
          type: "STORE_CONVERSATION",
          payload: response.data
        })
        this.getUserPosts()
        console.log("conversation loaded")
      })
    
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
              this.setState({userInfo:response.data})
              let res = store.dispatch({
                type: "STORE_USER",
                payload: response.data
              })
              this.getConversation()
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
