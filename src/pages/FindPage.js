import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SearchForm from '../components/Search'
import Result from '../components/Result'

export default class FindPage extends React.Component {
    static navigationOptions = {
        headerTitle: <SearchForm />,
      };

    render() {
        return (
            <View style={styles.container}>
                    <Result navigation={this.props.navigation}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  });