import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Image, ScrollView, Button, TouchableOpacity } from "react-native";
import { List, ListItem } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import noImage from '../resource/Img/noImage.png'
import Modal from 'react-native-modal';
import MapView, { Marker } from 'react-native-maps';
import { connect } from "react-redux";
import store from '../../store'

let mapStateToProps = (store) => {
    return {
        userInfo: store.data.userInfo,
        geoInfo: store.data.geoInfo,
        isSignedIn: store.data.isSignedIn,
        isSentDone: store.data.isSentDone,
    }
}




class Testing extends React.Component {

    constructor() {
        super()
        this.state = {
            image: null,

        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <View style={styles.container} >
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={styles.titleText}>Tool </Text>
                    <Text style={styles.middleTitleText}>N</Text>
                    <Text style={styles.titleText}> Tool</Text>
                </View>
                <View style={{ marginBottom: 30 }}>
                    <Text style={styles.smallTitleText}>The Ultimate Tool Sharing Marketplace</Text>
                </View>
                <Ionicons name="ios-construct-outline" size={150} color="white" />
                <View style={{ marginBottom: 30 }}>
                    <Text style={{ fontSize: 20, color: "white" }}>Welcome Julian!</Text>
                </View>

            </ View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black"
    },
    titleText: {
        fontSize: 45,
        color: "white",
        fontWeight: "bold",
        marginTop: 15
    },
    middleTitleText: {
        fontSize: 50,
        color: "white",
        fontWeight: "bold",
    },
    smallTitleText: {
        fontSize: 15,
        color: "white",
    },

})

export default connect(mapStateToProps)(Testing)