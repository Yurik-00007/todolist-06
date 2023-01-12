import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {combineReducers, createStore} from "redux";

export const rootReduser=combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer
})

export type AppRootType=ReturnType<typeof rootReduser>
export const store=createStore(rootReduser)

// @ts-ignore
window.store=store