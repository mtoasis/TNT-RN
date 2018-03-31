import { Constants, Google } from 'expo';
import React, { Component } from 'react';
import { Button, Alert, View } from "react-native";
import { connect } from "react-redux";


export default class GoogleAuth extends Component {

  constructor() {
    super()
    this.state = {
      user : null,
    }
  }

  checkUser = () => {
    console.log(this.state.user)
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

          this.setState({ user: user })
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
      <View>
        <Button
          title="Login with Google"
          onPress={this._handleGoogleLogin}
        />

        <Button title="check user" onPress={this.checkUser.bind(this)} />
      </View>
    )
  }

}
