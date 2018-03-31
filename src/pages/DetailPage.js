import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import { Card, ListItem } from 'react-native-elements'

export default class DetailPage extends React.Component {

    static navigationOptions = ({ navigation }) =>{
        const {params} = navigation.state;
        return{
            title: params ? params.title : 'A Nested Details Screen',
        }
      };


    render() {

        const post = this.props.navigation.state.params


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
