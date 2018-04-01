import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios'

export default class InboxPage extends React.Component {

    componentDidMount(){
        // this.getConversation()
    }

    getConversation(){
        axios.get("http://toolntool.herokuapp.com/api/conversations")
        .then(response=>{
            console.log(response)
        })
    }

    render() {
      return (
          <View>
              <Text>InBox Page</Text>
              </View>
      )
    }
}