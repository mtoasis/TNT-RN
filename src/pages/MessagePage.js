import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, List, ListItem, Button } from 'react-native-elements'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';

export default class MessagePage extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params.conversation.users[0]._id === params.userInfo._id ?
                `${params.conversation.users[1].name.givenName} ${params.conversation.users[1].name.familyName}`
                : `${params.conversation.users[0].name.givenName} ${params.conversation.users[0].name.familyName}`,
            headerStyle: {
                backgroundColor: 'black',
            },
            headerTitleStyle: {
                color: "white"
            },
            headerTintColor: 'white',
        }
    };

    constructor() {
        super()
        this.state = {
            message: null,
            isMessageMount: false,
            newMessage: null,
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.getMessage(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    getMessage = () => {

        axios.post("http://toolntool.herokuapp.com/api/mobile/messages", {
            cid: this.props.navigation.state.params.conversation._id
        }).then(response => {

            if (this.state.message === null || response.data.messages.length !== this.state.message.messages.length) {
                console.log("updating message")
                this.setState({
                    message: response.data,
                    isMessageMount: true,
                })
            }
            // this.scrollView.scrollToEnd({ animated: true })
        })
    }

    sendMessage() {
        console.log("sending new msg")
        axios.post("http://toolntool.herokuapp.com/api/mobile/sendmessage", {
            cid: this.props.navigation.state.params.conversation._id,
            uid: this.props.navigation.state.params.userInfo._id,
            content: this.state.newMessage
        }).then(response => {
            this.input.clearText()
            // this.scrollView.scrollToEnd({ animated: true })
        })
    }

    render() {

        if (!this.state.isMessageMount) {
            return (
                <View>
                    <Text>Message Loading</Text>
                </View>
            )
        }

        const msg = this.state.message.messages
        const params = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
                    <ScrollView style={{ height: "85%" }}
                        ref={(scrollView) => { this.scrollView = scrollView }}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            this.scrollView.scrollToEnd({ animated: true });
                        }}>

                        {
                            msg.slice(0).reverse().map((message, key) => {

                                return (

                                    <View key={key} style={message.sender._id === params.userInfo._id ?
                                        styles.rightAlign : styles.leftAlign}>

                                        <Text style={message.sender._id === params.userInfo._id ?
                                            styles.nameRight : styles.nameLeft}>

                                            {message.sender._id === params.userInfo._id ?
                                                `${params.userInfo.name.givenName} ${params.userInfo.name.familyName}`
                                                : `${message.sender.name.givenName} ${message.sender.name.familyName}`}
                                        </Text>

                                        <Text style={message.sender._id === params.userInfo._id ?
                                            styles.msgRight : styles.msgLeft}
                                        >
                                            {message.content}

                                        </Text>

                                        <Text style={message.sender._id === params.userInfo._id ?
                                            styles.nameRight : styles.nameLeft}>

                                            {message.date.slice(0, 10)}, {message.date.slice(11, 16)}
                                        </Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView >
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <FormInput
                            containerStyle={{
                                width: 250,
                                height: 50,
                                backgroundColor: "white",
                                marginLeft: 15
                            }}
                            inputStyle={{ fontSize: 20 }}
                            onChangeText={(newMessage) => { this.setState({ newMessage }) }}
                            onSubmitEditing={this.sendMessage.bind(this)}
                            ref={input => this.input = input}
                            placeholder="Type message"
                        />

                        <Button buttonStyle={{ width: 80, height: 50, marginRight: 15 }}
                            backgroundColor="transparent"
                            icon={{ name: 'send', size: 30, color: "black" }}
                            onPress={this.sendMessage.bind(this)} />

                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    msgLeft: {
        backgroundColor: "#DBDBDB",
        borderRadius: 20,
        width: 200,
        minHeight: 50,
        borderColor: "black",
        borderWidth: 0.5,
        padding: 10,
        overflow: "hidden"
    },
    msgRight: {
        backgroundColor: "#FFF6D8",
        borderRadius: 20,
        width: 200,
        minHeight: 50,
        borderColor: "black",
        borderWidth: 0.5,
        padding: 10,
        overflow: "hidden"
    },
    nameRight: {
        fontSize: 13,
        alignSelf: 'flex-end',
        color: "#7E7E7E",
        marginRight: 10
    },
    nameLeft: {
        fontSize: 13,
        alignSelf: 'flex-start',
        color: "#7E7E7E",
        marginLeft: 10
    },
    leftAlign: {
        alignSelf: 'flex-start',
        marginBottom: 30,
        marginLeft: 10
    },
    rightAlign: {
        alignSelf: 'flex-end',
        marginBottom: 30,
        marginRight: 10
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
    },
});