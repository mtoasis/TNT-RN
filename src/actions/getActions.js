import { Location, Permissions } from 'expo';
import store from '../../store'
import axios from 'axios'

export const getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);

  let location = await Expo.Location.getCurrentPositionAsync({});

  let response = await Expo.Location.reverseGeocodeAsync({
    latitude: Number(location.coords.latitude),
    longitude: Number(location.coords.longitude)
  })

  let geoInfo = {
    city: response[0].city,
    region: response[0].region,
    coordinate: {
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    }
  }
  store.dispatch({
    type: "STORE_GEO",
    payload: geoInfo
  })
  console.log("geo done")
};

export const getUserPosts = (user_id) => {
  axios.post("http://toolntool.herokuapp.com/api/mobile/userposts", {
    id: user_id
  })
    .then(response => {
      store.dispatch({
        type: "STORE_USERPOST",
        payload: response.data
      })
      console.log("user post stored")
    })
}

export const getConversation = async (user_id, extension) => {
  console.log("requesting conversation... ")
  let res = await axios.post("http://toolntool.herokuapp.com/api/mobile/conversations", {
    _id: user_id
  })
    .then(response => {
      store.dispatch({
        type: "STORE_CONVERSATION",
        payload: response.data
      })
      // console.log(response.data)
      if (extension) {
        getUserPosts(user_id)
      }
      console.log("conversation loaded")
    })
}