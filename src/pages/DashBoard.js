import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios'
import GoogleAuth from '../components/GoogleAuth/auth'
import store from '../../store'
import { FormLabel, FormInput, List, ListItem } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { getLocationAsync } from '../actions/getActions'
import loader from '../resource/Img/loader.gif'

let mapStateToProps = (store) => {
    return {
        userInfo: store.data.userInfo,
        geoInfo: store.data.geoInfo,
        isSignedIn: store.data.isSignedIn,
        isGeoStored: store.data.isGeoStored,
        conversation: store.data.conversation,
        isConversationStored: store.data.isConversationStored,
        userPost: store.data.userPost,
        isUserPostStored: store.data.isUserPostStored,
    }
}

class DashBoard extends React.Component {

    constructor() {
        super()
    }

    componentWillMount() {
        getLocationAsync()
    }


    logData() {
        console.log("redux user state")
        console.log(this.props.userInfo)
        console.log("redux geo state")
        console.log(this.props.geoInfo)
        console.log("redux conversation state")
        console.log(this.props.conversation)
        console.log("redux userPost state")
        console.log(this.props.userPost)


    }

    render() {
        if (!this.props.isGeoStored) {
            return (
                <View style={styles.container}>
                    <Text>
                        Initialize App,
                    </Text>
                    <Text>
                        Please Press "YES" on location permission
                    </Text>
                    <Image source={loader} style={{ width: 50, height: 50 }} />
                </View>
            )
        }
        else if (this.props.isGeoStored && !this.props.isSignedIn) {
            return (
                <View style={styles.container}>
                    <GoogleAuth />
                </View >
            )
        }
        else if (this.props.isGeoStored && this.props.isSignedIn && !this.props.isConversationStored && !this.props.isUserPostStored) {
            return (
                <View style={styles.container}>
                    <Text>
                        Loading user data...
                    </Text>
                    <Image source={loader} style={{ width: 50, height: 50 }} />
                    <Text>
                        {this.isConversationStored ? `User conversation loaded` : ``}
                    </Text>
                    <Text>
                        {this.isUserPostStored ? `User post loaded` : ``}
                    </Text>


                </View>
            )
        }
        return (
            <View style={styles.container}>

                <Text>Welcome! {this.props.userInfo.name.givenName}</Text>

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
    },
});


export default connect(mapStateToProps)(DashBoard)