import React from "react";
import { FilterValueType, TaskType } from "../App";
import style from '../components/Style.module.css'
import { AddItemForm } from "./addItemForm/AddItemForm";
import { EditTableSpan } from "./editTableSpan/EditTableSpan";
import { Button, IconButton, List, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Tasks } from "./Tasks";
import { useDispatch } from "react-redux";
import { addTaskAC, changeTaskAC, checkedTaskAC, removeTaskAC } from "../reducer/ReducerTasks";
import { ChangeEditTitleAC, RemoveTodoListAC } from "../reducer/ReducerTodolists";

export type TodolistType = {
    todoId: string
    tasks: Array<TaskType>
    title: string
    filterValueTasks: (value: FilterValueType, todoId: string) => void
    filterValue: FilterValueType
}

export const TodoList = (props: TodolistType) => {
    const dispatch = useDispatch()

    const filterValueTasksHandle = (value: FilterValueType) => props.filterValueTasks(value, props.todoId)

    const handleRemoveTask = (id: string) => dispatch(removeTaskAC(props.todoId, id))
    const handleCheckedTask = (id: string, isDone: boolean) => dispatch(checkedTaskAC(props.todoId, id, isDone))
    const handleChangeTask = (id: string, newTitle: string) => dispatch(changeTaskAC(props.todoId, id, newTitle))
    return (
        <div className={style.main}>
            <Typography variant="h6" sx={{
                fontWeight: 'bolt',
                p: 3,
                display: 'flex',
                justifyContent: "center",
                alignItems: "center"
            }}>
                <EditTableSpan
                    title={props.title}
                    callback={(newTitle) => dispatch(ChangeEditTitleAC(props.todoId, newTitle))} />
                <IconButton onClick={() => dispatch(RemoveTodoListAC(props.todoId))}>
                    <DeleteForeverIcon />
                </IconButton>
            </Typography>
            <div className={style.todoListManager}>
                <AddItemForm callback={(title) => dispatch(addTaskAC(props.todoId, title))} value={'Field cannot be empty'} />
            </div>
            <List sx={{
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'space-between'
            }}>
                {props.tasks.map((m) => {
                    return <Tasks key={m.id}
                        task={m}
                        id={m.id}
                        removeTask={handleRemoveTask}
                        checkedTask={handleCheckedTask}
                        changeTask={handleChangeTask}
                    />
                })
                }
            </List>
            <div className={style.btnFilter}>
                <Button
                    sx={{ mr: 1 }}
                    variant="contained"
                    color={`${props.filterValue === 'all' ? 'secondary' : 'primary'}`}
                    size="small"
                    disableElevation
                    onClick={() => filterValueTasksHandle('all')}>all</Button>
                <Button
                    sx={{ mr: 1 }}
                    variant="contained"
                    color={props.filterValue === 'active' ? 'secondary' : 'primary'}
                    size="small"
                    disableElevation
                    onClick={() => filterValueTasksHandle('active')}>active</Button>
                <Button
                    sx={{ mr: 1 }}
                    variant="contained"
                    color={props.filterValue === 'completed' ? 'secondary' : 'primary'}
                    size="small"
                    disableElevation
                    onClick={() => filterValueTasksHandle('completed')}>completed</Button>
            </div>
        </div>
    )
}