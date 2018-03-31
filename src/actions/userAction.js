import axios from 'axios';

export const fetchUser = () =>(
    async (dispatch) =>{
        const res = await axios.get('https://toolntool.herokuapp.com/api/current_user');
        dispatch({
            type: "FETCH_USER",
            payload: res.data
        })
    }
)