import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import axios from 'axios'
import { connect } from "react-redux";
import store from '../../store'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import ConversationList from '../components/ConversationList/ConversationList'
import { Ionicons } from '@expo/vector-icons';
import RefreshButton from '../components/RefreshButton/RefreshButton'


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
        headerStyle: {
            backgroundColor: 'black',
        },
        headerRight:<RefreshButton />,
        headerTitleStyle: {
            color: "white"
        },
    };

    constructor() {
        super()
        this.state = {
            message: null,
        }
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

