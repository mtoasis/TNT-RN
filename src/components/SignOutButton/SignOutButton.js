import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import store from '../../../store'
import { connect } from "react-redux";
import { getConversation } from '../../actions/getActions'

let mapStateToProps = (store) => {
    return {
        isSignedIn: store.data.isSignedIn,
    }
}


class SignOutButton extends React.Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', marginLeft: 50 }}>
            {this.props.isSignedIn?
                <TouchableOpacity style={{ marginRight: 10, width: 125, height: 50, }} onPress={()=>{
                     store.dispatch({
                        type: "SIGN_OUT",
                    })
                    Alert.alert("Thank you!")
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>                        
                        <Text style={{ fontSize: 17, color: "white", marginLeft: 5, fontWeight: "bold" }}>Log Out</Text>
                        <Ionicons name="ios-key-outline" size={35} color="white" />
                    </View>
                </TouchableOpacity>:
                <View></View>}
            </View>
        )
    }
}

export default connect(mapStateToProps)(SignOutButton)