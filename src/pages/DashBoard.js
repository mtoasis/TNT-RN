import React from 'react';
import { StyleSheet, Text, View, Image,Button, TouchableOpacity } from 'react-native';
import { ImagePicker } from 'expo';
import axios from 'axios'




export default class DashBoard extends React.Component {

    constructor() {
        super()
        this.state = {
            image: null,
            uploading: false,
        }
    }



    // pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //       allowsEditing: true,
    //       aspect: [4, 3],
    //     });
        
    //     if (!result.cancelled) {
    //       this.setState({ 
    //         image: result.uri,
    //         data: 'data:image/jpeg;base64,'+result.base64 });
    //     }
    //     console.log(this.state.image)
    //   };
    
    // uploadImg = ()=>{
    //     console.log("axios running...")

    //     axios.post('https://api.cloudinary.com/v1_1/daretodate/image/upload',{
    //         file: this.state.data,
    //         tags: "hammer",
    //         upload_preset: 'v4gae7vn',
    //     }
    //     ,{headers: {          
    //         'Content-Type': 'multipart/form-data'
    //     }
    //     }).then(response=>{
    //         console.log(response)
    //     })
    // }

    _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        this._handleImagePicked(pickerResult);
      };
    
      _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        this._handleImagePicked(pickerResult);
      };
    
      _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;
    
        try {
          this.setState({ uploading: true });
    
          if (!pickerResult.cancelled) {
            uploadResponse = await uploadImageAsync(pickerResult.uri);
            uploadResult = await uploadResponse.json();
            this.setState({ image: uploadResult.location });
          }
        } catch (e) {
          console.log({ uploadResponse });
          console.log({ uploadResult });
          console.log({ e });
          alert('Upload failed, sorry :(');
        } finally {
          this.setState({ uploading: false });
        }
      };


    render() {
        return (
            <View style={styles.container}>

                <Image
                    style={{ width: 400, height: 400 }}
                    source={this.state.image != null ?
                        { uri: this.state.image } : require('../components/hm.png')}
                />
                <TouchableOpacity
                    onPress={this.pickImage.bind(this)}
                    style={styles.button}
                >
                    <Text style={styles.text}>Select</Text>
                </TouchableOpacity>

                <Button
                title="Upload"
                onPress={this.uploadImg.bind(this)}
                style={styles.button}
                />
                

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifiyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    button: {
        width: 250,
        height: 50,
        backgroundColor: "black",
        borderRadius: 30,
        justifiyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center'
    }

});


async function uploadImageAsync(uri) {
    let apiUrl = 'https://api.cloudinary.com/v1_1/daretodate/image/upload?';
  
    // Note:
    // Uncomment this if you want to experiment with local server
    //
    // if (Constants.isDevice) {
    //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
    // } else {
    //   apiUrl = `http://localhost:3000/upload`
    // }
  
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
  
    let formData = new FormData();
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
  
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
  
    return fetch(apiUrl, options);
  }