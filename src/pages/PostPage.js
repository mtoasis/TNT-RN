import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { Constants, ImagePicker, Ionicons } from 'expo';
import { postData } from '../actions/dataAction'
import { connect } from "react-redux";
import axios from 'axios'

let mapStateToProps = (store) => {
  return {
    userInfo: store.data.userInfo,
    geoInfo: store.data.geoInfo,
    isSignedIn: store.data.isSignedIn,
  }
}


class PostPage extends React.Component {


  static navigationOptions = {
    title: "Post Tool",
  }

  constructor() {
    super()
    this.state = {
      title: "",
      user: "",
      description: "",
      image: null,
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
      }).catch(err => console.log(err))

    }  }


  // logging = () => {
  //   const postingData = {
  //     title: this.state.title,
  //     img: this.state.imgURL,
  //     location: this.state.location,
  //     coordinate: this.state.coordinate,
  //     user: this.props.userInfo._id
  //   }
  //   console.log(postingData)
  // }

  sendPost() {

    if (this.state.imgURL) {

      const postingData = {
        title: this.state.title,
        img: this.state.imgURL,
        location: `${this.props.geoInfo.city}, ${this.props.geoInfo.region}`,
        coordinate: this.props.geoInfo.coordinate,
        user: this.props.userInfo._id,
        description: this.state.description,
      }
      console.log("posting with..\n")
      console.log(postingData)

      axios.post("http://toolntool.herokuapp.com/api/posts/mobile", postingData)
        .then(response => {
          console.log(response.data)
        })
    }

    else {
      Alert.alert("Please complete the form")
    }
  }


  render() {
    let { image } = this.state;

    if (this.props.isSignedIn) {
      return (
        <View style={styles.container}>

          <ScrollView >

            {image &&
              <Image source={{ uri: image }} style={{ width: 400, height: 400 }} />}


            <FormLabel>Title</FormLabel>
            <FormInput onChangeText={(title) => { this.setState({ title }) }} />
            {this.state.title ? <FormValidationMessage /> : <FormValidationMessage>This field is required</FormValidationMessage>}

            <FormLabel>Location</FormLabel>
            <Text style={styles.text}>{this.props.geoInfo.city}, {this.props.geoInfo.region}</Text>

            <FormLabel>description</FormLabel>
            <FormInput onChangeText={(description) => { this.setState({ description }) }} />
            {this.state.description ? <FormValidationMessage /> : <FormValidationMessage>This field is required</FormValidationMessage>}

            {!image &&
              <Button
                title="Insert Image"
                onPress={this._pickImage.bind(this)}
                buttonStyle={styles.button}
              />
            }

            <Button
              title="send post"
              onPress={this.sendPost.bind(this)}
              buttonStyle={styles.button}
            />

          </ScrollView>


        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text>
          Please sign in to post
    </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: "black",
    marginLeft: 40,
    marginBottom: 30
  },
  text: {
    marginLeft: 40
  },

});

export default connect(mapStateToProps)(PostPage)