import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import axios from 'axios'
import { connect } from "react-redux";
import store from '../../store'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import ConversationList from '../components/ConversationList/ConversationList'
import { Ionicons } from '@expo/vector-icons';


let mapStateToProps = (store) => {
    return {
        userInfo: store.data.userInfo,
        geoInfo: store.data.geoInfo,
        isSignedIn: store.data.isSignedIn,
        isGeoStored: store.data.isGeoStored,
        conversation: store.data.conversation,
        isConversationStored: store.data.isConversationStored,
    }
}

class InboxPage extends React.Component {


    static navigationOptions = {
        title: "Inbox",
    };

    constructor() {
        super()
        this.state = {
            message: null,
        }
    }

    getConversation = async () => {
        console.log("requesting conversation... \n\n")
        let res = await axios.post("http://toolntool.herokuapp.com/api/mobile/conversations", {
            _id: this.props.userInfo._id
        })
            .then(response => {
                store.dispatch({
                    type: "STORE_CONVERSATION",
                    payload: response.data
                })
            })
        console.log("conversation loaded")
    }



    logging() {
        console.log(this.props.conversation)
        console.log(this.props.isConversationStored)
    }

    checkUser() {
        if (this.props.userInfo._id === this.props.conversation[0].users[0]._id) {
            console.log(this.props.conversation[0].users[1].name)
        }
        else {
            console.log(this.props.conversation[0].users[0].name)
        }
    }

    render() {

        if (!this.props.isSignedIn) {
            return (
                <View style={styles.container}>
                    <Text>Please sign in to access inbox</Text>
                </View>
            )
        }
        return (
            <View>
                <ConversationList navigation={this.props.navigation} />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: 230, height: 50, backgroundColor: "lightblue", borderColor: "grey", borderWidth: 1 }} onPress={this.getConversation.bind(this)}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                            <Ionicons name="ios-refresh" size={35} color="white" />
                            <Text style={{ fontSize: 20, color: "white", marginLeft: 5, fontWeight: "bold" }}>Refresh Inbox </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps)(InboxPage)

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
        color: 'black',
        fontSize: 30,
        textAlign: 'center'
    },
});

