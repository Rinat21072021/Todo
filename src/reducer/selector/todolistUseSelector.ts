import { AppRootStateType } from "../../store";
import { TodoListType } from "../../App";

export const todoListSelector =(state:AppRootStateType):Array<TodoListType> => state.todolists