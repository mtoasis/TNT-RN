import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import store from '../../../store'
import { connect } from "react-redux";


let mapStateToProps = (store) => {
    return {
        userInfo: store.data.userInfo,
        isSignedIn: store.data.isSignedIn,
    }
}

class SendButton extends React.Component {

    constructor(props){
        super(props)
    }
    render() {
        return (
            <View style={{ flexDirection: 'row', marginLeft: 50 }}>
            {this.props.isSignedIn?
                <TouchableOpacity style={{ marginRight: 10, width: 125, height: 42, }} onPress={()=>{this.props.sendPost()}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                        <Ionicons name="ios-send-outline" size={35} color="white" />
                        <Text style={{ fontSize: 17, color: "white", marginLeft: 5, fontWeight: "bold" }}>Send</Text>
                    </View>
                </TouchableOpacity>
                :<View></View>}
            </View>
        )
    }
}

export default connect(mapStateToProps)(SendButton);

