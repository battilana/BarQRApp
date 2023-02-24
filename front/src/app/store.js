import {applyMiddleware} from "redux"
import reducer from "./reducer"
import thunk from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({reducer: reducer}, applyMiddleware(thunk))

