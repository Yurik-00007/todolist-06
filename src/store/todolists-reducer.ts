import {FilterValuesType, TasksStateType, TodolistType} from "../AppWithReducers";
import {v1} from "uuid";

export type ActionType = removeTodolistACType
    | addTodolistACType
|changeFilterACType
|changeTodolistTitleACType

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState:Array<TodolistType>=[
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]

export const todolistsReducer = (state: Array<TodolistType>=initialState, action: ActionType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            return [{id: action.todolistId, title: action.title, filter: "all"}, ...state]
        }

        case "CHANGE-TODOLIST-FILTER":{
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.filter} : el)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.todolistId ? {...el, title: action.newTodolistTitle} : el)

        }

        default: {
            return state
        }
    }
}
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId,
    } as const
}
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        todolistId: v1(),
        title,
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId,
        filter:value,
    } as const
}
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId:string,newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId,
        newTodolistTitle,

    } as const
}
