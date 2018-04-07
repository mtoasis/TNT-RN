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
import SignOutButton from '../components/SignOutButton/SignOutButton'


let mapStateToProps = (store) => {
    return {
        userInfo: store.data.userInfo,
        geoInfo: store.data.geoInfo,
        userPost: store.data.userPost,
        isSignedIn: store.data.isSignedIn,
        isGeoStored: store.data.isGeoStored,
        isConversationStored: store.data.isConversationStored,
        isUserPostStored: store.data.isUserPostStored,
        conversation: store.data.conversation,
    }
}

class DashBoard extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight: <SignOutButton />,
            headerStyle: {
                backgroundColor: 'black',
                borderBottomWidth: 0,
            },
        }
    }

    constructor() {
        super()
    }

    componentWillMount() {
        getLocationAsync()    
    }

    render() {
        if (!this.props.isGeoStored) {
            return (
                <View style={styles.container}>
                    <Text style={styles.smallTitleText}>
                        Initialize App....
                    </Text>
                    <Text style={styles.smallTitleText}>
                        Please Press "YES" on location permission
                    </Text>
                    <Image source={loader} style={{ width: 50, height: 50 }} />
                </View>
            )
        }
        else if (this.props.isGeoStored && !this.props.isSignedIn) {
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
                        <Text style={{ fontSize: 20, color: "white" }}>Please Sign-in to Start</Text>
                    </View>
                    <GoogleAuth />
                </ View>
            )
        }
        else if (this.props.isGeoStored && this.props.isSignedIn && !this.props.isConversationStored && !this.props.isUserPostStored) {
            return (
                <View style={styles.container}>
                    <Text style={styles.smallTitleText}>
                        Loading user data...
                    </Text>
                    <Image source={loader} style={{ width: 50, height: 50 }} />
                </View>
            )
        }
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
                <View style={{ marginBottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: "white" }}>Welcome! {this.props.userInfo.name.givenName}</Text>
                </View>
                <Text style={{ fontSize: 20, color: "white" }}>You have {this.props.conversation.length} conversations</Text>
                <Text style={{ fontSize: 20, color: "white" }}>and {this.props.userPost.length} posts</Text>

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
});


export default connect(mapStateToProps)(DashBoard)