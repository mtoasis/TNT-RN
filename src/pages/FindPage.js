import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import SearchForm from '../components/Search'
import Result from '../components/Result'
import { Ionicons } from '@expo/vector-icons';
import MapButton from '../components/MapButton/MapButton'
import { connect } from "react-redux";

let mapStateToProps = (store) => {
    return {
        isMapView: store.data.isMapView,
        isSearchOn: store.data.isSearchOn,
    }
}


class FindPage extends React.Component {
    static navigationOptions = {
        headerTitle: <MapButton />,
        headerStyle: {
            backgroundColor: 'black',
        },
    };

    render() {
        return (
            <View style={styles.container}>
               {this.props.isSearchOn && <SearchForm />} 
                <Result navigation={this.props.navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});


export default connect(mapStateToProps)(FindPage)