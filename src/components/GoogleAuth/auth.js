import { Constants, Google } from 'expo';
import React, { Component } from 'react';
import { Button, Alert, View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import axios from 'axios'
import {storeUser} from "../../actions/dataAction"



let mapStateToProps = (store) => {
  return {
      userInfo: store.data.userInfo
  }
}


class GoogleAuth extends Component {

  componentWillMount(){
    console.log(this.props.dispatch)
  }

  constructor() {
    super()
    this.state = {
      response : null,
    }
  }

  logData = () => {
    console.log(this.state.response)
  }

  runStore = ()=>{
    this.props.dispatch(storeUser(this.state.response))
    console.log(this.props.userInfo)
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

          const postData = {
            name:{
              familyName: user.familyName,
              givenName: user.givenName
            },
            id:user.id,
            email:user.email,
            photoUrl: user.photoUrl
          }

          axios.post("http://169.234.98.51:3001/auth/mobile", postData)
          .then(response=>{
            console.log(response.data)
            this.setState({response:response.data})
            
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
      <View>
        <Button
          color="red"
          style={styles.button}
          title="Login with Google"
          onPress={this._handleGoogleLogin}
          />

        
        <Button title="check data" onPress={this.logData.bind(this)} />

        <Button color="green" title="store" onPress={this.runStore.bind(this)} />



      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
  },
  button: {
      width: 250,
      height: 50,
      backgroundColor: "black",
      borderRadius: 30,
      justifyContent: 'center',
  },
  text: {
      color: 'white',
      fontSize: 30,
      textAlign: 'center'
  }

});

export default connect(mapStateToProps)(GoogleAuth)