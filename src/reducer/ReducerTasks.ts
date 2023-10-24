import {FilterValueType, TasksArrayType, TaskType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTopicTodoAT, RemoveTodoListAT} from "./ReducerTodolists";

export type AddTask = ReturnType<typeof addTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type ChangeTaskAT = ReturnType<typeof changeTaskAC>
export type CheckedTaskAT = ReturnType<typeof checkedTaskAC>

export type TasksActions = AddTask 
| RemoveTaskAT 
| ChangeTaskAT 
| CheckedTaskAT 
| RemoveTodoListAT 
| AddTopicTodoAT

const initialState: TasksArrayType = {}

export const ReducerTasks = (state = initialState, action: TasksActions): TasksArrayType => {
    switch (action.type) {
        case "ADD-TASK":
            let newTask: TaskType= { id:action.payload.id, title:action.payload.title, isDone:false}
            return { ...state, [action.payload.todoId]:[newTask, ...state[action.payload.todoId]] }
        case "REMOVE-TASK":
            return {...state, [action.payload.todoId]:state[action.payload.todoId]
                    .filter(f => f.id !== action.payload.id)}
        case "CHANGE-TITLE":
            return {...state, [action.payload.todoId]:state[action.payload.todoId]
                    .map(m=>m.id === action.payload.id ? {...m, title:action.payload.title}:m)}
        case "CHECKED-TASK":
            return {...state, [action.payload.todoId]:state[action.payload.todoId]
                    .map(m => m.id === action.payload.id ? {...m, isDone: action.payload.isDone}: m)}
        case "REMOVE-TODOLIST":
            let {[action.payload.id]:[], ...rest} = state
            return rest
        case "ADD-TOPIC-TODOLIST":
            return {...state, [action.payload.id]:[{id:v1(), title:action.payload.title, isDone:false}]}
        default:
            return state
    }
}

export const addTaskAC = (todoId: string, title: string) => {
    return {type: 'ADD-TASK', payload: {todoId, id:v1(), title}} as const
}
export const removeTaskAC = (todoId:string, id:string)=>{
    return {type: 'REMOVE-TASK', payload:{todoId, id}} as const
}

export const changeTaskAC = (todoId:string, id:string, title:string)=>{
    return {type:'CHANGE-TITLE', payload: {todoId, id, title}} as const
}

export const checkedTaskAC = (todoId:string, id: string, isDone:boolean)=>{
    return {type: 'CHECKED-TASK', payload:{todoId, id, isDone}} as const
}