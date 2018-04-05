import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import SearchForm from '../components/Search'
import Result from '../components/Result'
import { Ionicons } from '@expo/vector-icons';
import MapButton from '../components/MapButton/MapButton'


export default class FindPage extends React.Component {
    static navigationOptions = {
        headerTitle: <MapButton />
    };

    render() {
        return (
            <View style={styles.container}>
                <SearchForm />
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