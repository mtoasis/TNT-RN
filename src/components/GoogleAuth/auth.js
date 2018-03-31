import { Constants, Google } from 'expo';
import React, { Component } from 'react';
import { Button, Alert } from "react-native";
import { connect } from "react-redux";


let mapStateToProps = (store) => {
  return {
      userInfo: store.data.userInfo
  }
}

class GoogleAuth extends Component {
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
            dispatch({
              type: "STORE_USER",
              payload: dataSelected
          })
          console.log(this.props.userInfo)
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

    render(){
      return(
        
        <Button
        title="Login with Google"
        onPress={this._handleGoogleLogin}
      />
      )
    }

}

export default connect(mapStateToProps)(GoogleAuth);