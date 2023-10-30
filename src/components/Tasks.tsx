import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { EditTableSpan } from './editTableSpan/EditTableSpan';
import IconButton from '@mui/material/IconButton';
import { TaskType } from '../App';
import style from '../components/Style.module.css'

export type TaskPropsType = {
    task: TaskType
    id:string
    removeTask:(id: string)=>void
    checkedTask: (id: string, isDone: boolean)=>void
    changeTask:(id:string, newTitle: string)=>void
}

export const Tasks = ({task, removeTask,checkedTask, changeTask}:TaskPropsType) => {
    const removeTaskHandle = (id: string) => removeTask(id)
    const checkedTaskHandle = (id: string, isDone: boolean) => checkedTask(id, isDone)
    const changeTaskHandle = ( newTitle: string) => {changeTask( task.id, newTitle)}
    
        return (<ListItem 
                      divider
                      sx={{p: 0, display: "flex", justifyContent: "space-between"}}
                      className={`${task.isDone ? style.isDone : ''} ${style.taskLine}`}>
                <Checkbox size={'small'}
                          checked={task.isDone}
                          onChange={() => checkedTaskHandle(task.id, !task.isDone)}/>
                <EditTableSpan callback={changeTaskHandle} title={task.title}/>
                <IconButton onClick={() => removeTaskHandle(task.id)}>
                    <DeleteForeverIcon/>
                </IconButton>
            </ListItem>
        )
    };
 