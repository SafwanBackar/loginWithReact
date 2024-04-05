import axios from "axios"

const authCheck = ()=>{
    try {
        axios({
            method: "POST",
            url: "http://localhost:5000/auth/authenticate",
            // data: { token }
        }).then((res) =>{
            return res
        })
    } catch (error) {
        console.error(error)
    }
}


export default authCheck