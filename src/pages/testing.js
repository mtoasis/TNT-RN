import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Image, ScrollView, Button, TouchableOpacity } from "react-native";
import { List, ListItem } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import noImage from '../resource/Img/noImage.png'
import Modal from 'react-native-modal';
import MapView, { Marker } from 'react-native-maps';

export default class Testing extends React.Component {

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
            <View>
                

                <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}

                    style={{
                        width: 400,
                        height: 400,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: 37.75,
                            longitude: -122.45
                        }}
                        title="testing"
                        description="desc testing"

                        onCalloutPress={() => console.log("hello")}
                    />

                    <Marker
                        coordinate={{
                            latitude: 37.80,
                            longitude: -122.45
                        }}
                        title="testing"
                        description="desc testing"
                        onCalloutPress={() => console.log("hello")}
                    />

                </MapView>

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
        // backgroundColor: 'white'
    },
    text: {
        fontSize: 20,
        color: "#FF5858",
        marginLeft: 15,
        // alignItems: 'center',        
    },
    boxContainer: {
        width: "95%",
        height: 250,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        // paddingVertical: 20,
        padding: 20,
        overflow: 'scroll'
    },
    smallContainer: {
        width: "90%",
        height: 55,
        backgroundColor: "#F6F6F6",
        borderColor: "#B4B4B4",
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems:'center',
        marginBottom: 15,
    },


})