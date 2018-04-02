import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { Location, Permissions } from 'expo';
import { connect } from "react-redux";
import axios from 'axios'
import GoogleAuth from '../components/GoogleAuth/auth'
import store from '../../store'

let mapStateToProps = (store) => {
    return {
        userInfo: store.data.userInfo,
        geoInfo: store.data.geoInfo,
        isSignedIn: store.data.isSignedIn,
        isGeoStored: store.data.isGeoStored,
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
        // this.setState({ isGeoStored: true })
        console.log("geo done")
    };


    logData() {
        console.log("redux user state")
        console.log(this.props.userInfo)
        console.log("redux geo state")
        console.log(this.props.geoInfo)

    }

    getUserPosts(){
        axios.post("http://toolntool.herokuapp.com/api/mobile/userposts", {
            id:this.props.userInfo._id
        })
            .then(response => {
                console.log("user post from server \n")
                console.log(response.data)
            })
    }

    getConversation = () => {
        console.log("requesting conversation... \n\n")
        axios.post("http://toolntool.herokuapp.com/api/mobile/conversations", {
            _id:this.props.userInfo._id
        })
            .then(response => {
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


                </View>
            )
        }
        return (
            <View style={styles.container}>

                <Text>Welcome! {this.props.userInfo.name.givenName}</Text>

                <Button color="black"
                    title="check log"
                    onPress={this.logData.bind(this)} />

                <Button color="black"
                    title="check conversation"
                    onPress={this.getConversation.bind(this)} />

                <Button color="blue"
                    title="check userpost"
                    onPress={this.getUserPosts.bind(this)} />

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
    }

});


export default connect(mapStateToProps)(DashBoard)