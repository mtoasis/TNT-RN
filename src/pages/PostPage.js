import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Constants, Location, Permissions, ImagePicker } from 'expo';
import axios from 'axios'
import * as firebase from 'firebase';
import {postData} from '../actions/dataAction'

const firebaseConfig = {
  apiKey: "AIzaSyDaEVs6ejMUL6WRNuahA4Je0MuyZggTc_Q",
  authDomain: "toolntool-8882f.firebaseapp.com",
  databaseURL: "https://toolntool-8882f.firebaseio.com",
  storageBucket: "toolntool-8882f.appspot.com",
};

firebase.initializeApp(firebaseConfig);

export default class PostPage extends React.Component {

  //grab user info from redux

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
      imgURL: null,
    };
  }


  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (!result.cancelled) {
      this.setState({
        image: result.uri,        
      })

      let base64Img = `data:image/jpg;base64,${result.base64}`

      //Add your cloud name
      let apiUrl = 'https://api.cloudinary.com/v1_1/daretodate/image/upload';
  
      let data = {
        "file": base64Img,
        "upload_preset": "v4gae7vn",
      }
      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then(r => {
        let data = r._bodyText
        this.setState({ imgURL: JSON.parse(data).secure_url })
        // console.log(JSON.parse(data).secure_url)
        // console.log(this.state.imageURL)
      }).catch(err => console.log(err))
  
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});

    let response = await Expo.Location.reverseGeocodeAsync({
      latitude: Number(location.coords.latitude),
      longitude: Number(location.coords.longitude)
    })

    this.setState({ location: `${response[0].city}, ${response[0].region}` });

    this.setState({ coordinate: response[0] })

    console.log(this.state.coordinate)

  };

  logging = () =>{
    const postingData = {
      title: this.state.title,
      img: this.state.imgURL,
      location: this.state.location,
      coordinate: this.state.coordinate,
      //user : this.props.user
    }
    console.log("posting with..\n")
    console.log(postingData)

    axios.post("https://toolntool.herokuapp.com/api/posts",postingData)
    .then(response=>{
        console.log(response)
    })
  }


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
            onPress={this._pickImage.bind(this)}
          />
        }

        {image &&
          <Button
            title="push"
            onPress={this.logging.bind(this)}
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