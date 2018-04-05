import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert, TouchableHighlight, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { Constants, ImagePicker, Ionicons } from 'expo';
import { postData } from '../actions/dataAction'
import { connect } from "react-redux";
import axios from 'axios'
import noImage from '../resource/Img/noImage.png'
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';


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
      visibleModal: null,
      markedDate: null,
    };
  }

  cameraPickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    })

    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        base64: result.base64,
      })
    }
    this.setState({ visibleModal: null })
  }

  libraryPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    })

    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        base64: result.base64,
      })
    }
    this.setState({ visibleModal: null })
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
            this.setState({ image: null })
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
        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <ScrollView>
            <TouchableHighlight onPress={() => this.setState({ visibleModal: 1 })}>
              <Image source={image ? { uri: image } : noImage} style={{ width: 400, height: 300 }} />
            </TouchableHighlight>

            <FormLabel>Title</FormLabel>
            <FormInput placeholder="Post Title" onChangeText={(title) => { this.setState({ title }) }} ref={inputTitle => this.inputTitle = inputTitle} />
            {this.state.title ? <FormValidationMessage /> : <FormValidationMessage>This field is required</FormValidationMessage>}

            <FormLabel>Location</FormLabel>
            <Text style={styles.text}>{this.props.geoInfo.city}, {this.props.geoInfo.region}</Text>

            <FormLabel>Available Date</FormLabel>
            <Text onPress={() => this.setState({ visibleModal: 2 })} style={styles.text}>{this.state.markedDate? this.state.markedDate:`Click to set date`}</Text>

            <FormLabel>description</FormLabel>
            <FormInput placeholder="Post Description" onChangeText={(description) => { this.setState({ description }) }} ref={inputDesc => this.inputDesc = inputDesc} />
            {this.state.description ? <FormValidationMessage /> : <FormValidationMessage>This field is required</FormValidationMessage>}
            
 
          </ScrollView>

          <TouchableOpacity
            onPress={this.sendPost.bind(this)}
            style={{ alignSelf: 'center', alignItems: 'center', padding: 5, backgroundColor: 'black', height: 35, width: 200, marginBottom:25, marginTop:25 }}>

            <Text style={{ color: 'white', fontSize: 20 }}>Send Post</Text>

          </TouchableOpacity>

        {/* camera modal */}
          <Modal isVisible={this.state.visibleModal === 1}>
            <View style={styles.modalContent}>

              <TouchableOpacity onPress={this.cameraPickImage.bind(this)}>
                <View style={styles.modalButton}>
                  <Text>Take Picture</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.libraryPickImage.bind(this)}>
                <View style={styles.modalButton}>
                  <Text>Open Gallery</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ visibleModal: null })}>
                <View style={styles.modalButton}>
                  <Text>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>

        {/* calendar modal */}
          <Modal isVisible={this.state.visibleModal === 2}>
            <View style={styles.modalContent}>

              <Calendar
                onDayPress={(day) => {
                  this.setState({ markedDate: day.dateString })
                  console.log(this.state.marked)
                }}
              />
              <Text style={styles.calenderText}>{this.state.markedDate ? this.state.markedDate : "Year-Month-Date"}</Text>

              <TouchableOpacity onPress={() => this.setState({ visibleModal: null })}>
                <View style={styles.modalButton}>
                  <Text>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
          </KeyboardAvoidingView>
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
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalButton: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  calenderText: {
    fontSize: 20,
    marginTop: 20
  }


});

export default connect(mapStateToProps)(PostPage)