

export default function reducer(state = {
    fetching: false,
    fetched: false,
    data: [],
    userInfo:{},
    dataSelected: {},
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
                userInfo: action.payload
            }
        }

        default: {
            return state
        }
    }

}