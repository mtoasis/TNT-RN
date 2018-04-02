

export default function reducer(state = {
    fetching: false,
    fetched: false,
    isSignedIn: false,
    isGeoStored: false,
    isConversationStored:false,
    data: [],
    userInfo:{},
    geoInfo:{},
    conversation:{},
    error: null,
}, action) {
    switch (action.type) {
        case "DATA_LOADING": {            
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload
            }
        }
        case "DATA_SELECTED": {            
            return {
                ...state,
                data: action.payload
            }
        }
        
        case "STORE_USER":{
            return{
                ...state,
                isSignedIn:true,
                userInfo: action.payload
            }
        }
        case "STORE_GEO":{
            return{
                ...state,
                isGeoStored:true,
                geoInfo: action.payload
            }
        }
        case "STORE_CONVERSATION":{
            return{
                ...state,
                isConversationStored:true,
                conversation: action.payload
            }
        }

        default: {
            return state
        }
    }

}