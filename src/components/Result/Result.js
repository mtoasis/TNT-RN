import React, { Component } from 'react';
import { connect } from "react-redux";
import { Text, View, StyleSheet, TextInput, Image, ScrollView, Button } from "react-native";
import { Card, ListItem } from 'react-native-elements'
import { fetchAll, fetchDataSelected } from '../../actions/dataAction'
import { StackNavigator } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';
import { getLocationAsync } from '../../actions/getActions'


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
        }
    }

    componentWillMount() {
        this.props.dispatch(fetchAll())
    }

    logging() {
        console.log("geo info")
        console.log(this.props.geoInfo)
        console.log("items")
        console.log(this.props.data[0].coordinate.latitude)

    }

    render() {
        const { data } = this.props;
        if (!this.props.isGeoStored) {
            return (
                <View style={styles.container}>
                    <Text>
                        App Loading
                    </Text>
                </View>
            )
        }

        else if (this.props.data.length === 0) {
            return (
                <View style={styles.container}>
                    <Text>
                        No Result to show
                    </Text>
                </View>
            )
        }

        else if (this.props.isMapView) {
            return (
                <View>
                    {/* <Button title="logging" onPress={this.logging.bind(this)} /> */}

                    <MapView
                        initialRegion={{
                            latitude: this.props.geoInfo.coordinate.latitude,
                            longitude: this.props.geoInfo.coordinate.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        style={{
                            width: 400,
                            height: 400,
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
            <ScrollView>
                {data.map((post, key) => (

                    <View key={key}>
                        <Card
                            title={post.title}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={{ uri: `${post.img}` }}
                                    style={{
                                        width: 200,
                                        height: 200,
                                        marginRight: 30
                                    }} />
                                <View>
                                    <Text style={{
                                        marginBottom: 10,
                                        fontWeight: "bold"
                                    }}>
                                        Description:
                                        </Text>
                                    <Text style={{ marginBottom: 10 }}>
                                        {post.description}
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
    }
});