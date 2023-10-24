import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type AddTopicTodoAT = {
    type: 'ADD-TOPIC-TODOLIST',
    payload: { id: string, title: string },
}
export type ChangeEditTitleAT = {
    type: 'CHANGE-TITLE'
    payload: { id: string, title: string }
}
export type FilterValueTasksAT = {
    type: "FILTERED-TASKS",
    payload: {
        id: string
        filterValue: FilterValueType
    }
}
export type RemoveTodoListAT = {
    type:'REMOVE-TODOLIST',
    payload:{id:string}
}

export type TodolistsActions = AddTopicTodoAT | ChangeEditTitleAT | FilterValueTasksAT | RemoveTodoListAT

const initialState:Array<TodoListType> = []
export const ReducerTodolists = (state=initialState, action: TodolistsActions): Array<TodoListType> => {
    switch (action.type) {
        case 'ADD-TOPIC-TODOLIST':
            return [...state, {id: action.payload.id, title: action.payload.title, filter: "all"}]
        case "CHANGE-TITLE":
            return state.map(m => m.id === action.payload.id ? {...m, title: action.payload.title} : m)
        case "FILTERED-TASKS":
            return state.map(m => m.id === action.payload.id ? {...m, filter: action.payload.filterValue} : m)
        case "REMOVE-TODOLIST":
            return state.filter(f=>f.id !==action.payload.id)
        default:
            return state
    }
}
export const AddTopicTodoAC = ( title: string): AddTopicTodoAT => {
    return {type: 'ADD-TOPIC-TODOLIST', payload: {id:v1(), title}}
}
export const ChangeEditTitleAC = (id: string, title: string): ChangeEditTitleAT => {
    return {type: 'CHANGE-TITLE', payload: {id, title}}
}
export const FilterValueTasksAC =(filterValue:FilterValueType,id:string):FilterValueTasksAT=>{
    return {type:'FILTERED-TASKS', payload:{id,filterValue}}
}
export const RemoveTodoListAC = (id:string):RemoveTodoListAT=>{
    return {type:'REMOVE-TODOLIST', payload:{id}}
}