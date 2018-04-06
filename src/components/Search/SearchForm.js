import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchData, fetchAll } from "../../actions/dataAction"
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { Input, Icon } from 'react-native-elements'


let mapStateToProps = (store) => {
    return {
        data: store.data.data
    }
}

class SearchForm extends Component {

    constructor() {
        super()
        this.state = {
            term: "",
            res: []
        };
    }


    conditionalFetch() {
        if (this.state.term === "") {
            this.props.dispatch(fetchAll())
        }
        else {
            this.props.dispatch(fetchData(this.state.term))
        }
    }

    render() {
        return (
            <View style={styles.search}>
                <TextInput
                    onChangeText={(term) => this.setState({ term })}
                    autofocus
                    onSubmitEditing={this.conditionalFetch.bind(this)}
                    value={this.state.term}
                    placeholder='Type Search'
                    textAlign ="center"
                    style={styles.textInput}
                    underlineColorAndroid={'transparent'}
                />
            </View>
        )
    }    
}

const styles = StyleSheet.create({
    search: {
        marginTop:15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"white",
        borderRadius:20,
        width:300,
        height:50,
        marginLeft:"9%",
        borderColor:"#C5C5C5",
        borderWidth:1            
    },
    textInput:{
        height: 50,
        width: 250,
        fontSize:25,
    } 

})

export default connect(mapStateToProps)(SearchForm);
