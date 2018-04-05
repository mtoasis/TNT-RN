import React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import axios from 'axios'

export default class DetailPage extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params ? params.postInfo.title : 'A Nested Details Screen',
            headerStyle: {
                backgroundColor: 'black',
            },
            headerTitleStyle: {
                color: "white"
            },
            headerTintColor: 'white',
        }
    };

    startConv() {
        const params = this.props.navigation.state.params
        axios.post("http://toolntool.herokuapp.com/api/mobile/startconversation", {
            postUserId: params.postInfo.user._id,
            userId: params.userInfo._id,
        }).then(response => {
            console.log(response.data)
            if (response.data.length !== undefined) {

                Alert.alert("You can't start conversation to your own post")
            }
            else {
                this.props.navigation.navigate('Message', {
                    conversation: response.data,
                    userInfo: params.userInfo
                })
            }


        })
    }


    render() {

        const post = this.props.navigation.state.params.postInfo


        return (
            <View style={styles.container}>

                <Card
                    title={post.title}
                    titleStyle={styles.title}
                >
                    <View>
                        <Image source={{ uri: `${post.img}` }}
                            style={{
                                width: 300,
                                height: 200,
                                marginRight: 30
                            }} />
                        <View>
                            <Text style={styles.cardTextBold}>
                                Description:
                            </Text>
                            <Text style={styles.cardText}>
                                {post.description}
                            </Text>
                            <Text style={styles.cardTextBold}>
                                Location:
                                        </Text>
                            <Text style={styles.cardText}>
                                {post.location}
                            </Text>

                        </View>
                    </View>
                    {this.props.navigation.state.params.isSignedIn &&
                        <Button title="Request Rent" onPress={this.startConv.bind(this)} />
                    }
                </Card>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardTextBold: {
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 25
    },
    cardText: {
        marginBottom: 10,
        fontSize: 20
    },
    title: {
        fontSize: 30,
        fontWeight: "bold"
    }

});
