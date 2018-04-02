import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios'
import { connect } from "react-redux";
import store from '../../store'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

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

    constructor(){
        super()
        this.state={
            message: null,
        }
    }

    componentDidMount() {
        this.getConversation()
    }


    getConversation = () => {
        console.log("requesting conversation... \n\n")
        axios.post("http://toolntool.herokuapp.com/api/mobile/conversations", {
            _id: this.props.userInfo._id
        })
            .then(response => {
                // console.log(response.data)
                store.dispatch({
                    type: "STORE_CONVERSATION",
                    payload: response.data
                })

            })
    }

    getMessage = () => {
        axios.post("http://toolntool.herokuapp.com/api/mobile/messages", {
            cid: this.props.conversation[0]._id
        }).then(response => {
            console.log(response.data)
        })
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

    sendMessage(){
        axios.post("http://toolntool.herokuapp.com/api/mobile/sendmessage", {
            cid: this.props.conversation[0]._id,
            uid: this.props.userInfo._id,
            content: this.state.message
        }).then(response => {
            console.log("message response from server \n")
            console.log(response.data)
        })
    }

    render() {
        if (this.props.isConversationStored) {
            return (
                <View style={styles.container}>
                    {/* <Text>{JSON.stringify(this.props.conversation)}</Text> */}
                    <Button title="message" onPress={this.getMessage.bind(this)} />

                    <Button title="logging" onPress={this.logging.bind(this)} />

                    <Button title="Checking User" onPress={this.checkUser.bind(this)} />

                    <FormLabel>message</FormLabel>
                    <FormInput onChangeText={(message) => { this.setState({ message }) }} />

                    <Button title="send Message" onPress={this.sendMessage.bind(this)} />


                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text>Loading</Text>
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
        color: 'white',
        fontSize: 30,
        textAlign: 'center'
    }

});