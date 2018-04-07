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
import sv from '../resource/Img/sv.png'
import SignOutButton from '../components/SignOutButton/SignOutButton'
import { Audio } from 'expo'
import svs from '../resource/Audio/svs.mp3'


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
        this.state = {
            count: 0,
            isSoundOn: false,
        }
    }

    componentWillMount() {
        getLocationAsync()
    }

    countPlus = () => {
        let newCount = this.state.count + 1
        this.setState({
            count: newCount
        })
        if (this.state.count >= 4) {
            this.playMusic()
        }
        console.log(`count is: ${this.state.count}`)
    }


    playMusic = async () => {
        const { sound } = await Audio.Sound.create(svs, { shouldPlay: true, isLooping: true });
        this.audioPlayer = sound;
      }
    
      stopMusic = async () => {
        await this.audioPlayer.stopAsync();
      }


    // _handlePlaySoundAsync = async () => {
    //     await Audio.setIsEnabledAsync(true);
    //     let sound = new Audio.Sound();
    //     await sound.loadAsync(svs)

    //     if (!this.state.isSoundOn) {
    //         await sound.playAsync();
    //         this.setState({ isSoundOn: true })
    //     }
    //     else {
    //         await this.sound.stopAsync()
    //         this.setState({ isSoundOn: false })
    //     }
    // };

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
                    <View style={{ marginBottom: 30 }}>
                        <Ionicons name="ios-construct-outline" size={150} color="white" />
                    </View>
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
        else if (this.state.count >= 5) {
            return (
                <View style={styles.containerRed}>
                    <View style={{ marginBottom: 40 }}>
                        <Image source={sv} style={{ width: 300, height: 300, marginBottom: 30 }} />
                        <Text style={styles.hiddenText}>{`Welcome comrade ${this.props.userInfo.name.givenName}!`}</Text>
                        <Text style={styles.hiddenText}>{`Enjoy the "share" economy!`}</Text>
                    </View>

                    <TouchableOpacity onPress={() => {
                        this.stopMusic()
                        this.setState({ count: 0 })
                    }}>
                        <Text style={styles.smallTitleText}>Go Back....but really?</Text>
                    </TouchableOpacity>

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

                <View style={{ marginBottom: 30 }}>
                    <TouchableOpacity onPress={this.countPlus.bind(this)}>
                        <Ionicons name="ios-construct-outline" size={150} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: "white" }}>Welcome! {this.props.userInfo.name.givenName}</Text>
                </View>
                <Text style={{ fontSize: 20, color: "white" }}>{`You have ${this.props.userPost.length} posts`}</Text>
                <Text style={{ fontSize: 20, color: "white" }}>{`and ${this.props.conversation.length} conversations`}</Text>

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
    containerRed: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "red"
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
    hiddenText: {
        fontSize: 25,
        color: "black",
        fontWeight: "bold",
    },
});


export default connect(mapStateToProps)(DashBoard)