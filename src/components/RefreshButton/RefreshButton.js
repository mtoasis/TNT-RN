import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import store from '../../../store'
import { connect } from "react-redux";
import {getConversation} from '../../actions/getActions'



let mapStateToProps = (store) => {
    return {
        userInfo: store.data.userInfo,
    }
}

class RefreshButton extends React.Component {

    render() {
        return (
            <View style={{ flexDirection: 'row', marginLeft: 50 }}>
                <TouchableOpacity style={{ marginRight: 10, width: 125, height: 50, }} onPress={()=>{getConversation(this.props.userInfo._id, false)}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                        <Ionicons name="ios-refresh" size={35} color="white" />
                        <Text style={{ fontSize: 17, color: "white", marginLeft: 5, fontWeight: "bold" }}>Refresh</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect(mapStateToProps)(RefreshButton);

