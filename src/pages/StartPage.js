import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import GoogleAuth from '../components/GoogleAuth/auth'

export default class StartPage extends React.Component {

    render() {
        return (
            <View>
                <Text>Welcome to Tool N Tool</Text>

                <GoogleAuth />

            </View>
        )
    }
}

