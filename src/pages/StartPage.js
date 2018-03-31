import React from 'react';
import { StyleSheet, Text, Linking, View, Button } from 'react-native';
import GoogleAuth from '../components/GoogleAuth/auth'
import { connect } from "react-redux";
import { fetchUser } from '../actions/userAction'
import axios from "axios"

export default class StartPage extends React.Component {

    // componentDidMount(){
    //     this.props.fetchUser();
    //   }

    // login = () => {
    //     const url = "https://toolntool.herokuapp.com/auth/google"
    //     Linking.openURL(url).catch(err => console.error('An error occurred', err));
    // }

    render() {
        return (
            <View>
                <Text>Welcome to Tool N Tool</Text>

                <GoogleAuth />
                {/* <Button title="auth" onPress={this.login.bind(this)} /> */}

            </View>
        )
    }
}

// export default connect(null, fetchUser)(StartPage);