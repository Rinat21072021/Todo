import { combineReducers, createStore } from "redux"
import { ReducerTasks } from "./reducer/ReducerTasks"
import { ReducerTodolists } from "./reducer/ReducerTodolists"

const rootReducer = combineReducers({
    tasks: ReducerTasks,
    todolists: ReducerTodolists
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store