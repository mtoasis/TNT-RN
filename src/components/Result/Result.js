import React, { Component } from 'react';
import { connect } from "react-redux";
import { Text, View, StyleSheet, TextInput, Image, ScrollView, Button, RefreshControl } from "react-native";
import { Card, ListItem } from 'react-native-elements'
import { fetchAll, fetchDataSelected } from '../../actions/dataAction'
import { StackNavigator } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';
import { getLocationAsync } from '../../actions/getActions'
import loader from '../../resource/Img/loader.gif'
import { Ionicons } from '@expo/vector-icons';

let mapStateToProps = (store) => {
    return {
        data: store.data.data,
        userInfo: store.data.userInfo,
        isSignedIn: store.data.isSignedIn,
        isMapView: store.data.isMapView,
        geoInfo: store.data.geoInfo,
        isGeoStored: store.data.isGeoStored,
    }
}

class Result extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: {},
            refreshing: false,
        }
    }

    componentWillMount() {
        if (this.props.data.length === 0) {
            this.props.dispatch(fetchAll())
        }
    }

    _onRefresh() {
        console.log("refreshing")
        this.setState({ refreshing: true })
        this.props.dispatch(fetchAll())
        this.setState({ refreshing: false })
    }

    render() {
        const { data } = this.props;
        if (!this.props.isGeoStored) {
            return (
                <View style={styles.container}>
                    <Text>
                        App is Loading
                    </Text>
                    <Image source={loader} style={{ width: 50, height: 50 }} />
                </View>
            )
        }

        else if (this.props.data.length === 0) {
            return (
                <View style={styles.container}>
                    <Text>
                        No Result to show
                    </Text>
                    <Ionicons name="ios-alert-outline" size={45} color="black" />
                </View>
            )
        }

        else if (this.props.isMapView) {
            return (
                <View>
                    <MapView
                        initialRegion={{
                            latitude: this.props.geoInfo.coordinate.latitude,
                            longitude: this.props.geoInfo.coordinate.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        style={{
                            width: 400,
                            height: 700,
                        }}
                    >
                        {data.map((post, key) => (
                            <Marker
                                key={key}
                                coordinate={post.coordinate}
                                title={post.title}
                                description={post.description}

                                onCalloutPress={() => this.props.navigation.navigate('Detail', {
                                    postInfo: post,
                                    userInfo: this.props.userInfo,
                                    isSignedIn: this.props.isSignedIn
                                })}
                            />
                        ))}

                    </MapView>

                </View>
            )
        }
        return (
            <ScrollView
                refreshControl={<RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                />}>
                {data.map((post, key) => (

                    <View key={key}>
                        <Card
                            title={post.title}
                            titleStyle={styles.title}
                        >
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Image source={{ uri: `${post.img}` }}
                                    style={{
                                        width: 150,
                                        height: 150,
                                        marginRight: 30
                                    }} />
                                <View>
                                    <Text style={{
                                        marginBottom: 10,
                                        fontWeight: "bold"
                                    }}>
                                        Price:
                                        </Text>
                                    <Text style={{ marginBottom: 10 }}>
                                        $ {post.price} /day
                                    </Text>
                                    <Text style={{
                                        marginBottom: 10,
                                        fontWeight: "bold"
                                    }}>
                                        Location:
                                        </Text>
                                    <Text style={{ marginBottom: 10 }}>
                                        {post.location}
                                    </Text>
                                    <Text style={{
                                        marginBottom: 10,
                                        fontWeight: "bold"
                                    }}>
                                        Available Date:
                                        </Text>
                                    <Text style={{ marginBottom: 10 }}>
                                        {post.availableDate}
                                    </Text>


                                </View>
                            </View>

                            <Button
                                color='black'
                                title='See Detail'
                                onPress={() => this.props.navigation.navigate('Detail', {
                                    postInfo: post,
                                    userInfo: this.props.userInfo,
                                    isSignedIn: this.props.isSignedIn
                                })
                                }
                            />
                        </Card>

                    </View>
                ))
                }
            </ScrollView>
        )
    }
}
export default connect(mapStateToProps)(Result);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    }

});