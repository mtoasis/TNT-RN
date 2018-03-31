import React from 'react';
import { StyleSheet, Text, View, Image,Button, TouchableOpacity } from 'react-native';
import { ImagePicker } from 'expo';
import axios from 'axios'


export default class DashBoard extends React.Component {

    constructor() {
        super()
        this.state = {
            image: null,
            data: null,
        }
    }


    render() {
        return (
            <View style={styles.container}>

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
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center'
    }

});

