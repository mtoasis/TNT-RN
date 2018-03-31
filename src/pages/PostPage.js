import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Constants, Location, Permissions, ImagePicker } from 'expo';


export default class PostPage extends React.Component {


  static navigationOptions = {
    title: "Post Tool"
  }

  constructor() {
    super()
    this.state = {
      title: "",
      user: "",
      description: "",
      image: null,
      location: null,
      coordinate: null,
    };
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    // console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
    console.log(this.state.image)
  };


  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    let response = await Expo.Location.reverseGeocodeAsync({ latitude: Number(location.coords.latitude), longitude: Number(location.coords.longitude) })
    this.setState({ location: `${response[0].city}, ${response[0].region}` });
    this.setState({ coordinate: response[0] })
    console.log(this.state.coordinate)

  };



  render() {
    let { image } = this.state;
    return (
      <ScrollView style={styles.container}>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {image &&
            <Image source={{ uri: image }} style={{ width: 400, height: 400 }} />}
        </View>

        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={(title) => { this.setState({ title }) }} />
        {this.state.title ? <FormValidationMessage /> : <FormValidationMessage>This field is required</FormValidationMessage>}

        <FormLabel>Location</FormLabel>
        <FormInput>{this.state.location}</FormInput>
        <Button title="Locate Me" onPress={this._getLocationAsync.bind(this)} />

        <FormLabel>description</FormLabel>
        <FormInput onChangeText={(description) => { this.setState({ description }) }} />
        {this.state.description ? <FormValidationMessage /> : <FormValidationMessage>This field is required</FormValidationMessage>}
        {!image &&
          <Button
            title="Insert Image"
            onPress={this._pickImage}
          />
        }
        {image &&
          <Button
            title="Change Image"
            onPress={this._pickImage}
          />
        }

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});