
export default function(state = null, action){
    switch(action.type){
        case "FETCH_USER":
            //If user is logged out, action.payload will show an empty string. An empty string will return false in javascript.
            return action.payload || false;
        default:
            return state;
    }
}