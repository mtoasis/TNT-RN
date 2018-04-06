import axios from "axios"

export const fetchData = (title) => (
    async (dispatch) => {
        const res = await axios.get("https://toolntool.herokuapp.com/api/posts/title/" + title);
        console.log(`fetch using term: ${title} done.`)
        dispatch({
            type: "DATA_LOADING",
            payload: res.data
        })
    }
)

export const fetchAll = () => (
    async (dispatch) => {
        const res = await axios.get("https://toolntool.herokuapp.com/api/posts");
        console.log("fetchAll done.")
        dispatch({
            type: "DATA_LOADING",
            payload: res.data
        })
    }
)



