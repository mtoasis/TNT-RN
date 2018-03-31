import React, { Component } from 'react';
import { connect } from "react-redux";
import { Text, View, StyleSheet, TextInput, Image, ScrollView, Button } from "react-native";
import { Card, ListItem } from 'react-native-elements'
import { fetchAll,fetchDataSelected } from '../../actions/dataAction'
import { StackNavigator } from 'react-navigation';



let mapStateToProps = (store) => {
    return {
        data: store.data.data,
    }
}

class Result extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            selected: {}
        }
    }

    componentWillMount() {
        this.props.dispatch(fetchAll())
    }

    render() {
        const { data } = this.props;

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
                                onPress={() => this.props.navigation.navigate('Detail', post)                               
                                                                    
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
