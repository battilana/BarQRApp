import axios from "axios"
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT"
export function login(username, password){
    return function (dispatch){
    axios.post("http://localhost:3001/login", { username, password }, { withCredentials: true, headers: { 'Cache-Control': 'no-store' } })
    .then((res)=>{
        if (res.data.success === true){
            dispatch({
                type: LOGIN,
                payload: username
            })
        }
        else{
            dispatch({
                type:LOGIN,
                payload: ""
            })
        }
    })
    .catch((error)=>{
        console.log(error)
    })}
}
export function logOut(username, password){
    return function (dispatch){
            dispatch({
                type:LOGOUT,
                payload: ""
            })
        }
}