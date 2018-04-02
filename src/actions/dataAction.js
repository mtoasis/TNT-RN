import axios from "axios"

export const fetchData = (title) => (
    async (dispatch) => {
        const res = await axios.get("https://toolntool.herokuapp.com/api/posts/title/" + title);

        dispatch({
            type: "DATA_LOADING",
            payload: res.data
        })
    }
)


export const fetchAll = () => (
    async (dispatch) => {
        const res = await axios.get("https://toolntool.herokuapp.com/api/posts");

        dispatch({
            type: "DATA_LOADING",
            payload: res.data
        })
    }
)

export function postData(postData) {
    axios.post("https://toolntool.herokuapp.com/api/posts", postData)
        .then(response => {
            console.log(response)
        })
}



