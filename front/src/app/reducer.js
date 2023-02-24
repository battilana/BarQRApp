
import {LOGIN} from "./actions";
const axios = require("axios")
const initialState ={
    username: ""
}
export default function reducer (state=initialState, action){
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                username : action.payload
            }
        default: return state
    }
}