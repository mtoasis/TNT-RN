import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import SearchForm from "../Search"
import { connect } from 'react-redux';
import { Header, Button, Icon } from 'react-native-elements'

class Nav extends Component {

    

    render() {

        return (
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                centerComponent={<SearchForm />}
                leftComponent={{ icon: 'menu', color: '#fff' }}
                rightComponent={{ icon: 'home', color: '#fff' }}
                outerContainerStyles={{
                    backgroundColor: 'black',
                    height: 77
                }}
            />
        );
    }
}

export default Nav;
