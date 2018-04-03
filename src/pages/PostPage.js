import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert, TouchableHighlight, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { Constants, ImagePicker, Ionicons } from 'expo';
import { postData } from '../actions/dataAction'
import { connect } from "react-redux";
import axios from 'axios'
import noImage from '../resource/Img/noImage.png'

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
      description: "",
      image: null,
      imgURL: null,
      base64: null,
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
        base64: result.base64,
      })
    }
  }

  sendPost() {
    if (this.state.image && this.state.title !== "" && this.state.description !== "") {
      console.log("sending post")

      let base64Img = `data:image/jpg;base64,${this.state.base64}`

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
            // console.log(response.data)
            Alert.alert("Post Success!")
            this.inputTitle.clearText()
            this.inputDesc.clearText()
            this.setState({ img: null })
          })
          .catch(err => console.log(err))
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
            <TouchableHighlight onPress={this._pickImage.bind(this)}>
              <Image source={image ? { uri: image } : noImage} style={{ width: 400, height: 300 }} />
            </TouchableHighlight>

            <FormLabel>Title</FormLabel>
            <FormInput placeholder="Post Title" onChangeText={(title) => { this.setState({ title }) }} ref={inputTitle => this.inputTitle = inputTitle} />
            {this.state.title ? <FormValidationMessage /> : <FormValidationMessage>This field is required</FormValidationMessage>}

            <FormLabel>Location</FormLabel>
            <Text style={styles.text}>{this.props.geoInfo.city}, {this.props.geoInfo.region}</Text>

            <FormLabel>description</FormLabel>
            <FormInput placeholder="Post Description" onChangeText={(description) => { this.setState({ description }) }} ref={inputDesc => this.inputDesc = inputDesc} />
            {this.state.description ? <FormValidationMessage /> : <FormValidationMessage>This field is required</FormValidationMessage>}

          </ScrollView>
          <TouchableOpacity
            onPress={this.sendPost.bind(this)}
            style={{ alignSelf:'center', alignItems: 'center', padding: 5, backgroundColor: 'black', height: 35, width: 200 }}>

            <Text style={{ color: 'white', fontSize: 20 }}>Send Post</Text>

          </TouchableOpacity>

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