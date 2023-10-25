import { AppRootStateType } from "../../store";
import { TasksArrayType } from "../../App";

export const tasksSelector = (state:AppRootStateType):TasksArrayType => state.tasks