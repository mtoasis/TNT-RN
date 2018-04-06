import React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, ScrollView } from 'react-native';
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

                Alert.alert("You can't start a conversation to your own post")
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
            // <View style={styles.container}>
            <ScrollView>
                <Card
                    containerStyle={{marginBottom:20}} 
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
                            <View style={styles.inlineText}>
                            <Text style={styles.cardTextBold}>
                                {`Price: `} 
                                        </Text>
                            <Text style={styles.cardText}>
                                $ {post.price} /day
                            </Text>
                            </View>
                            <View style={styles.inlineText}>
                            <Text style={styles.cardTextBold}>
                                {`Location: `}
                                        </Text>
                            <Text style={styles.cardText}>
                                {post.location}
                            </Text>
                            </View>
                            <View style={styles.inlineText}>
                            <Text style={styles.cardTextBold}>
                                {`Available Date: `}
                                        </Text>
                            <Text style={styles.cardText}>
                                {post.availableDate}
                            </Text>
                            </View>
                            <Text style={styles.cardTextBold}>
                                Description: 
                            </Text>
                            <Text style={styles.cardText}>
                                {post.description}
                            </Text>

                        </View>
                    </View>
                    {this.props.navigation.state.params.isSignedIn &&
                        <Button title="Request Rent" color="black" onPress={this.startConv.bind(this)} />
                    }
                </Card>
            </ScrollView>
            /* </View> */ 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardTextBold: {
        fontWeight: "bold",
        fontSize: 20,
        color:"#205AA1"
    },
    cardText: {
        marginTop:3,
        fontSize: 17,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold"
    },
    inlineText:{
        flexDirection:"row",
        marginBottom:10
    }

});
