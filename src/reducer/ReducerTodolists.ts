import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";


export type AddTopicTodoAT = {
    type: 'ADD-TOPIC-TODOLIST',
    payload: { id: string, title: string },
}
export const AddTopicTodoAC = (id: string, title: string): AddTopicTodoAT => {
    return {type: 'ADD-TOPIC-TODOLIST', payload: {id, title}}
}

export type ChangeEditTitleAT = {
    type: 'CHANGE-TITLE'
    payload: { id: string, title: string }
}
export const ChangeEditTitleAC = (id: string, title: string): ChangeEditTitleAT => {
    return {type: 'CHANGE-TITLE', payload: {id, title}}
}

export type FilterValueTasksAT = {
    type: "FILTERED-TASKS",
    payload: {
        id: string
        filterValue: FilterValueType
    }
}
export const FilterValueTasksAC =(filterValue:FilterValueType,id:string):FilterValueTasksAT=>{
    return {type:'FILTERED-TASKS', payload:{id,filterValue}}
}

export type RemoveTodoListAT = {
    type:'REMOVE-TODOLIST',
    payload:{id:string}
}
export const RemoveTodoListAC = (id:string):RemoveTodoListAT=>{
    return {type:'REMOVE-TODOLIST', payload:{id}}
}
export type TodolistsActions = AddTopicTodoAT | ChangeEditTitleAT | FilterValueTasksAT | RemoveTodoListAT
export const ReducerTodolists = (state: Array<TodoListType>, action: TodolistsActions): Array<TodoListType> => {
    switch (action.type) {
        case 'ADD-TOPIC-TODOLIST':
            return [...state, {id: v1(), title: action.payload.title, filter: "all"}]
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