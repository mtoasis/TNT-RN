export default function reducer(state = {
    fetching: false,
    fetched: false,
    data: [],
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

        default: {
            return state
        }
    }

}