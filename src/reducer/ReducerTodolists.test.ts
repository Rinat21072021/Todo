import {v1} from "uuid";
import {TodoListType} from "../App";
import {
    AddTopicTodoAC,
    ChangeEditTitleAC,
    FilterValueTasksAC,
    ReducerTodolists,
    RemoveTodoListAC
} from "./ReducerTodolists";

test("should be add todolist", ()=>{
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const startState: Array<TodoListType> = [
        {id:todolistID_1, title: "testing task", filter:"all"},
        {id:todolistID_2, title: "Lomuchei test", filter:"all"}
    ]

    const endState = ReducerTodolists(startState, AddTopicTodoAC(v1(),'new title'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('new title')
})

test("should be change title todolist", ()=>{
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const startState: Array<TodoListType> = [
        {id:todolistID_1, title: "testing task", filter:"all"},
        {id:todolistID_2, title: "Lomuchei test", filter:"all"}
    ]

    const endState = ReducerTodolists(startState, ChangeEditTitleAC(todolistID_1, 'Change title'))

    expect(endState[0].title).toBe('Change title')
    expect(endState.length).toBe(2)
})

test("should be filtered tasks", ()=>{
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const startState:Array<TodoListType> = [
        {id:todolistID_1, title:"testing task", filter:'all'},
        {id:todolistID_2, title:"Lomuchei test", filter:'all'}
    ]

    const endState: Array<TodoListType>=ReducerTodolists(startState,FilterValueTasksAC('completed',todolistID_2))

    expect(endState[1].filter).toBe('completed')
})

test("should be remove todolist", ()=>{
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const startState:Array<TodoListType> = [
        {id:todolistID_1, title:"testing task", filter:'all'},
        {id:todolistID_2, title:"Lomuchei test", filter:'all'}
    ]

    const endState: Array<TodoListType>=ReducerTodolists(startState,RemoveTodoListAC(todolistID_2))

    expect(endState.length).toBe(1)
})