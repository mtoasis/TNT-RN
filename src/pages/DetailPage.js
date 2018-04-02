import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import axios from 'axios'

export default class DetailPage extends React.Component {

    static navigationOptions = ({ navigation }) =>{
        const {params} = navigation.state;
        return{
            title: params ? params.title : 'A Nested Details Screen',
        }
      };

      startConv(){
        axios.post("http://toolntool.herokuapp.com/api/mobile/startconversation", {
            postUserId:this.props.navigation.state.params.postInfo.user._id,
            userId: this.props.navigation.state.params.userInfo._id,
        }).then(response=>{
            console.log(response.data)
        })
      }


    render() {

        const post = this.props.navigation.state.params.postInfo
        // console.log(post)


        return (
            <View style={styles.container}>
                
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

                            <Button title="Rent" onPress={this.startConv.bind(this)} />
                        </View>
                    </View>
                </Card>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});
