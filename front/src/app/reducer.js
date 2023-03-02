
import {LOGIN, LOGOUT} from "./actions";
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
            case LOGOUT:
            return {
                ...state,
                username : action.payload
            }
        default: return state
    }
}