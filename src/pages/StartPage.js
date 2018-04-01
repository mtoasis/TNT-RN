import React from 'react';
import { StyleSheet, Text, Linking, View, Button } from 'react-native';
import GoogleAuth from '../components/GoogleAuth/auth'

import Tabs from "../components/config/router"


export default class StartPage extends React.Component {

    render() {
        console.log(this.props.userInfo)

        return (
            <View>
                <Text>Welcome to Tool N Tool</Text>

                <GoogleAuth />
                
            </View>
        )
    }
}

