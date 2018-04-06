import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert, TouchableHighlight, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { Constants, ImagePicker } from 'expo';
import { postData } from '../actions/dataAction'
import { connect } from "react-redux";
import axios from 'axios'
import noImage from '../resource/Img/noImage.png'
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';
import loader from '../resource/Img/loader.gif'
import { Ionicons } from '@expo/vector-icons';
import SendButton from '../components/SendButton/SendButton'
import GoogleAuth from '../components/GoogleAuth/auth'
import { getUserPosts } from '../actions/getActions'


let mapStateToProps = (store) => {
  return {
    userInfo: store.data.userInfo,
    geoInfo: store.data.geoInfo,
    isSignedIn: store.data.isSignedIn,
  }
}


class PostPage extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Post Tool",

      headerRight: <SendButton sendPost={params.sendPost} />,
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTitleStyle: {
        color: "white"
      }
    }
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
      price: null,
      isSent: false,
    };
  }

  componentDidMount(){
    this.setState({ isSent: false })
    console.log(`isSent state is: ${this.state.isSent}`)
    this.props.navigation.setParams({
      sendPost: this.sendPost.bind(this)
    });
  }

  cameraPickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.7,
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

  saveDate(date) {
    this.setState({ markedDate: date })
  }



  sendPost() {
    if (!this.props.isSignedIn) {
      Alert.alert("Please Sign in")
    }

    else if (this.state.image !== null &&
      this.state.title !== "" &&
      this.state.description !== "" &&
      this.state.price !== null &&
      !this.state.markedDate !== null
    ) {
      this.setState({ visibleModal: 3 })
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
      }).then(response => {
        let data = response._bodyText
        this.setState({ imgURL: JSON.parse(data).secure_url })

        const postingData = {
          title: this.state.title,
          img: this.state.imgURL,
          location: `${this.props.geoInfo.city}, ${this.props.geoInfo.region}`,
          coordinate: this.props.geoInfo.coordinate,
          user: this.props.userInfo._id,
          description: this.state.description,
          price: this.state.price,
          availableDate: this.state.markedDate
        }
        console.log("posting with..\n")
        console.log(postingData)

        axios.post("http://toolntool.herokuapp.com/api/posts/mobile", postingData)
          .then(response => {

            this.inputTitle.clearText()
            this.inputDesc.clearText()
            this.inputPrice.clearText()
            this.setState({
              isSent: true,
              markedDate: null,
              image: null,
            })
            getUserPosts(this.props.userInfo._id)
            this.timerID = setInterval(
              () => {
                this.setState({ visibleModal: null })
                clearInterval(this.timerID);
              },
              1000
            );


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

              <FormLabel labelStyle={styles.formLable}>Title</FormLabel>
              <FormInput maxLength={20} placeholder="Post Title (Max Character: 20)" onChangeText={(title) => { this.setState({ title }) }} ref={inputTitle => this.inputTitle = inputTitle} />
              {this.state.title ? <FormValidationMessage /> : <FormValidationMessage>This field is required</FormValidationMessage>}

              <FormLabel labelStyle={styles.formLable}>Price</FormLabel>
              <FormInput keyboardType='numeric' placeholder="Price (USD/day)" onChangeText={(price) => { this.setState({ price }) }} ref={inputPrice => this.inputPrice = inputPrice} />
              {this.state.price ? <FormValidationMessage /> : <FormValidationMessage>This field is required</FormValidationMessage>}

              <FormLabel labelStyle={styles.formLable}>Available Date</FormLabel>
              <TouchableOpacity onPress={() => this.setState({ visibleModal: 2 })}>
                <Text style={styles.text}>{this.state.markedDate ? this.state.markedDate : `Click to set the date`}</Text>
              </TouchableOpacity>

              <FormLabel labelStyle={styles.formLable}>Description</FormLabel>
              <FormInput placeholder="Post Description" multiline onChangeText={(description) => { this.setState({ description }) }} ref={inputDesc => this.inputDesc = inputDesc} />
              {this.state.description ? <FormValidationMessage /> : <FormValidationMessage>This field is required</FormValidationMessage>}

              <FormLabel labelStyle={styles.formLable}>Location</FormLabel>
              <Text style={styles.text}>{this.props.geoInfo.city}, {this.props.geoInfo.region}</Text>

            </ScrollView>


            {/* camera modal */}
            <Modal isVisible={this.state.visibleModal === 1}>
              <View style={styles.modalContent}>

                <TouchableOpacity onPress={this.cameraPickImage.bind(this)}>
                  <View style={styles.modalButton}>
                    <Text style={styles.modalText}>Take Picture</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.libraryPickImage.bind(this)}>
                  <View style={styles.modalButton}>
                    <Text style={styles.modalText}>Open Gallery</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.setState({ visibleModal: null })}>
                  <View style={styles.modalButton}>
                    <Text style={styles.modalText}>Close</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>

            {/* calendar modal */}
            <Modal isVisible={this.state.visibleModal === 2}>
              <View style={styles.modalContent}>

                <Calendar
                  onDayPress={(day) => {
                    this.saveDate(day.dateString)

                  }}
                />
                <Text style={styles.calenderText}>{this.state.markedDate ? this.state.markedDate : "Year-Month-Date"}</Text>

                <TouchableOpacity onPress={() => this.setState({ visibleModal: null })}>
                  <View style={styles.modalButton}>
                    <Text style={styles.modalText}>Close</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>

            <Modal isVisible={this.state.visibleModal === 3}>
              <View style={styles.modalContent}>
                <Text style={styles.calenderText}>{this.state.isSent ? `Post Sucess!` : `Sending Post...`}</Text>
                {this.state.isSent ? <Ionicons name="md-checkmark" size={35} color="black" /> : <Image source={loader} style={{ width: 50, height: 50 }} />}
              </View>
            </Modal>
          </KeyboardAvoidingView>
        </View>
      )
    }

    return (
      <View style={styles.containerBlack}>
        <Text style={{ fontSize: 20, color: "white", marginBottom:40  }}>
          Please sign in to post
    </Text>
        {/* <GoogleAuth /> */}
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
  containerBlack: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: "black",
    marginLeft: 40,
    marginBottom: 30
  },
  text: {
    marginLeft: 40,
    fontSize: 17
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
    backgroundColor: 'black',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  calenderText: {
    fontSize: 20,
    marginTop: 20,
    color: "#0080D1"
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formLable: {
    fontSize: 17
  },
  modalText: {
    color: "white"
  }


});

export default connect(mapStateToProps)(PostPage)