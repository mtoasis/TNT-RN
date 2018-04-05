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
        //for findAll case
        if (this.state.term === "") {
            this.props.dispatch(fetchAll())
        }
        //for findByTitle case
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
                    style={{
                        height: 50,
                        width: 250,
                        color:"black",
                        fontSize:25,
                        borderColor:"gray",
                        borderRadius:20
                    }}
                />
            </View>
        )
    }    
}

const styles = StyleSheet.create({
    search: {
        marginTop:20,
        alignItems: 'center',
        justifyContent: 'center',        
    }
})

export default connect(mapStateToProps)(SearchForm);
