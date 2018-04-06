

export default function reducer(state = {
    isSignedIn: false,
    isGeoStored: false,
    isConversationStored:false,
    isUserPostStored:false,
    isMapView: false,
    isSearchOn: false,
    data: [],
    userInfo:{},
    geoInfo:{},
    conversation:[],
    userPost:[],
    error: null,    
}, action) {
    switch (action.type) {
        case "DATA_LOADING": {            
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
        case "SIGN_OUT":{
            return{
                ...state,
                isSignedIn:false,
                isUserPostStored: false,
                isConversationStored: false,
                userInfo: {},
                userPost: [],
                conversation: [],
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
        case "STORE_USERPOST":{
            return{
                ...state,
                isUserPostStored:true,
                userPost: action.payload
            }
        }
        case "MAP_VIEW":{
            return{
                ...state,
                isMapView:true,
            }
        }
        case "LIST_VIEW":{
            return{
                ...state,
                isMapView:false,
            }
        }
        case "SEARCH_ON":{
            return{
                ...state,
                isSearchOn:true,
            }
        }
        case "SEARCH_OFF":{
            return{
                ...state,
                isSearchOn:false,
            }
        }        
        default: {
            return state
        }
    }

}