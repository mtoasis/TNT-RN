import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Image, ScrollView, Button, TouchableOpacity } from "react-native";
import { List, ListItem } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json


export default class Testing extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={{ alignSelf: 'flex-start', marginLeft: "8%", color: "tomato" }}>Inbox</Text>
                <View style={{flex:1}} style={styles.boxContainer}>
                
                    <TouchableOpacity style={styles.smallContainer}>
                        <Text style={styles.text}>
                            <Ionicons name="ios-chatboxes-outline" size={37} color="#FF5858" />
                            {`  FirstName LastName`}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallContainer}>
                        <Text style={styles.text}>
                            <Ionicons name="ios-chatboxes-outline" size={37} color="#FF5858" />
                            {`  FirstName LastName`}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallContainer}>
                        <Text style={styles.text}>
                            <Ionicons name="ios-chatboxes-outline" size={37} color="#FF5858" />
                            {`  FirstName LastName`}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallContainer}>
                        <Text style={styles.text}>
                            <Ionicons name="ios-chatboxes-outline" size={37} color="#FF5858" />
                            {`  FirstName LastName`}
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

        // justifyContent: 'center',
        // alignItems: 'center',
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
        padding:20,
        overflow:'scroll'
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