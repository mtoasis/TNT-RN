import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import { Location, Permissions } from 'expo';
import { connect } from "react-redux";
import axios from 'axios'
import GoogleAuth from '../components/GoogleAuth/auth'
import store from '../../store'
import { FormLabel, FormInput, List, ListItem } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import ConversationList from '../components/ConversationList/ConversationList'

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
        this._getLocationAsync()
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permissihjnon to access location was denied',
            });
        }
        let location = await Expo.Location.getCurrentPositionAsync({});

        let response = await Expo.Location.reverseGeocodeAsync({
            latitude: Number(location.coords.latitude),
            longitude: Number(location.coords.longitude)
        })

        let geoInfo = {
            city: response[0].city,
            region: response[0].region,
            coordinate: {
                longitude: location.coords.longitude,
                latitude: location.coords.latitude
            }
        }
        store.dispatch({
            type: "STORE_GEO",
            payload: geoInfo
        })
        console.log("geo done")
    };


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

    getUserPosts() {
        axios.post("http://toolntool.herokuapp.com/api/mobile/userposts", {
            id: this.props.userInfo._id
        })
            .then(response => {
                console.log("user post from server \n")
                console.log(response.data)
            })
    }

    render() {
        if (!this.props.isGeoStored) {
            return (
                <View style={styles.container}>
                    <Text>
                        App is loading
                    </Text>
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

                <ConversationList navigation={this.props.navigation} />

                {/* <Button color="black"
                    title="check log"
                    onPress={this.logData.bind(this)} />

                <Button color="blue"
                    title="check userpost"
                    onPress={this.getUserPosts.bind(this)} /> */}

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