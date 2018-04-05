import React, { Component } from 'react';
import { connect } from "react-redux";
import { Text, View, StyleSheet, TextInput, Image, ScrollView, Button, TouchableOpacity } from "react-native";
import { List, ListItem } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json

let mapStateToProps = (store) => {
    return {
        data: store.data.data,
        userInfo: store.data.userInfo,
        conversation: store.data.conversation
    }
}


class ConversationList extends Component {

    constructor(props) {
        super(props)
    }



    render() {

        const list = this.props.conversation;

        return (

            <ScrollView>
                <List>
                    {
                        list.map((conversation, key) => {

                            return (
                                <ListItem
                                key={key} 
                                onPress={() => this.props.navigation.navigate('Message', {
                                    conversation: conversation,
                                    userInfo:this.props.userInfo
                                })}
                                title={this.props.userInfo._id === conversation.users[0]._id ?
                                    `${conversation.users[1].name.givenName} ${conversation.users[1].name.familyName}`
                                    : `${conversation.users[0].name.givenName} ${conversation.users[0].name.familyName}`}
                                
                                />
                            )
                        })
                    }
                    </List>
            </ScrollView>

        )
    }
}

export default connect(mapStateToProps)(ConversationList);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    text: {
        fontSize: 20,
        color: "#FF5858",
        marginLeft: 15,     
    },
    boxContainer: {
        width: "95%",
        height: 250,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        padding:20,
    },
    smallContainer: {
        width: "90%",
        height: 55,
        backgroundColor: "#F6F6F6",
        borderColor: "#B4B4B4",
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 15,
    },
});


