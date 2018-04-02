import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { FormLabel, FormInput, List, ListItem, Button } from 'react-native-elements'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';

export default class MessagePage extends React.Component {

    constructor() {
        super()
        this.state = {
            message: null,
            isMessageMount: false,
            newMessage: null,
            lastMessage: null,
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.getMessage(),
            2000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params.conversation.users[0]._id === params.userInfo._id ?
                `${params.conversation.users[1].name.givenName} ${params.conversation.users[1].name.familyName}`
                : `${params.conversation.users[0].name.givenName} ${params.conversation.users[0].name.familyName}`
        }
    };

    getMessage = () => {
        console.log("refreshing")
        axios.post("http://toolntool.herokuapp.com/api/mobile/messages", {
            cid: this.props.navigation.state.params.conversation._id
        }).then(response => {
            this.setState({
                message: response.data,
                isMessageMount: true,
            })

        })
    }

    sendMessage() {
        console.log("sending new msg")
        axios.post("http://toolntool.herokuapp.com/api/mobile/sendmessage", {
            cid: this.props.navigation.state.params.conversation._id,
            uid: this.props.navigation.state.params.userInfo._id,
            content: this.state.newMessage
        }).then(response => {
            console.log("message response from server \n")
            console.log(response.data)
            this.input.clearText()
            this.scrollView.scrollToEnd({ animated: true })

        })
    }

    logging() {
        // console.log(this.state.message.messages)        
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
                <ScrollView style={{ height: "80%", width: "100%", borderColor: "white" }} ref={(scrollView) => { this.scrollView = scrollView }}>
                    {
                        msg.slice(0).reverse().map((message, key) => {

                            return (

                                <View key={key} style={message.sender._id === params.userInfo._id ?
                                    styles.rightAlign : styles.leftAlign}>

                                    <Text style={message.sender._id === params.userInfo._id ?
                                        styles.nameRight : styles.nameLeft}>

                                        {message.sender._id === params.userInfo._id ?
                                            `${params.conversation.users[1].name.givenName} ${params.conversation.users[1].name.familyName}`
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

                <View style={{ flexDirection: 'row', }}>

                    <FormInput
                        containerStyle={{
                            width: 250,
                            height: 50,
                            backgroundColor: "white",
                            marginLeft:10
                        }}
                        inputStyle={{ fontSize: 20 }}
                        onChangeText={(newMessage) => { this.setState({ newMessage }) }}
                        ref={input => this.input = input} 
                        placeholder="Type message"
                        />

                    <Button buttonStyle={{ width: 80, height: 50, borderWidth:1, borderColor:"grey", marginRight:10}}
                        backgroundColor="#D2D2D2"
                        icon={{ name: 'send', size:30, }}
                        onPress={this.sendMessage.bind(this)} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    msgLeft: {
        backgroundColor: "#DBDBDB",
        borderRadius: 20,
        width: 200,
        minHeight: 50,
        borderColor: "black",
        borderWidth: 0.5,
        padding: 10
    },
    msgRight: {
        backgroundColor: "#FFF6D8",
        borderRadius: 20,
        width: 200,
        minHeight: 50,
        borderColor: "black",
        borderWidth: 0.5,
        padding: 10
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
    }
});
