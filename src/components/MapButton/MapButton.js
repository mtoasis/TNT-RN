import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import store from '../../../store'
import { connect } from "react-redux";


let mapStateToProps = (store) => {
    return {
        isMapView: store.data.isMapView
    }
}

class MapButton extends React.Component {


    MapView() {
        store.dispatch({
            type: "MAP_VIEW",
        })
        console.log("showing as map view")
    }

    ListView() {
        store.dispatch({
            type: "LIST_VIEW",
        })
        console.log("showing as list view")

    }

    render() {
        return (
            <View style={{ flexDirection: 'row', marginLeft: 50 }}>
                <TouchableOpacity style={{ marginRight: 10, width: 125, height: 50, backgroundColor: "black", borderColor: "grey", borderWidth: 1 }} onPress={this.ListView.bind(this)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                        <Ionicons name="ios-list" size={35} color="white" />
                        <Text style={{ fontSize: 17, color: "white", marginLeft: 5, fontWeight: "bold" }}>List View </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: 125, height: 50, backgroundColor: "black", borderColor: "grey", borderWidth: 1 }} onPress={this.MapView.bind(this)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                        <Ionicons name="ios-map-outline" size={35} color="white" />
                        <Text style={{ fontSize: 17, color: "white", marginLeft: 5, fontWeight: "bold" }}>Map View </Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}

export default connect(mapStateToProps)(MapButton);
