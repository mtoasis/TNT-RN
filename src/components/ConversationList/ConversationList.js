import React, { Component } from 'react';
import { connect } from "react-redux";
import { Text, View, StyleSheet, TextInput, Image, ScrollView, Button } from "react-native";
import { List, ListItem } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';


let mapStateToProps = (store) => {
    return {
        data: store.data.data,
        userInfo: store.data.userInfo,
        conversation: store.data.conversation
    }
}


class ConversationList extends Component {

    constructor(props) {
        super(props)
    }



    render() {

        const list = this.props.conversation;

        return (

            <ScrollView>
                <List>
                    {
                        list.map((conversation, key) => {

                            return (
                                <ListItem key={key}
                                    titleStyle={{ marginLeft: 30, fontSize: 25 }}
                                    title={this.props.userInfo._id === conversation.users[0]._id ?
                                        `${conversation.users[1].name.givenName} ${conversation.users[1].name.familyName}`
                                        : `${conversation.users[0].name.givenName} ${conversation.users[0].name.familyName}`}

                                    onPress={() => this.props.navigation.navigate('Message', {
                                        conversation: conversation,
                                        userInfo:this.props.userInfo
                                    }
                                    )}

                                />
                            )
                        })
                    }
                </List>
            </ScrollView>

        )
    }
}

export default connect(mapStateToProps)(ConversationList);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
});