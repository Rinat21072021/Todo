import React from "react";
import {FilterValueType, TaskType} from "../App";
import style from '../components/Style.module.css'
import {AddItemForm} from "./addItemForm/AddItemForm";
import {EditTableSpan} from "./editTableSpan/EditTableSpan";
import {Button, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export type TodolistType = {
	todoId: string
	tasks: Array<TaskType>
	title: string
	removeTask: (id: string, todoId: string) => void
	addTask: (value: string, todoId: string) => void
	filterValueTasks: (value: FilterValueType, todoId: string) => void
	checkedTask: (id: string, isDone: boolean, todoId: string) => void
	removeTodoList: (todoId: string) => void
	filterValue: FilterValueType
	changeTask: (id: string, newTitle: string, todolistId: string) => void
	changeEditTitle: (todolistId: string, newTitle: string) => void
}

export const TodoList = (props: TodolistType) => {

	const removeTaskHandle = (id: string) => props.removeTask(id, props.todoId)
	const checkedTaskHandle = (id: string, isDone: boolean) => props.checkedTask(id, isDone, props.todoId)
	const filterValueTasksHandle = (value: FilterValueType) => props.filterValueTasks(value, props.todoId)

	let tasks = props.tasks.map((elem) => {
		const changeTask = (newTitle: string) => {
			props.changeTask(elem.id, newTitle, props.todoId)
		}
		return (
			<ListItem key={elem.id}
					  divider
					  sx={{p:0}}
					  className={`${elem.isDone ? style.isDone : ''} ${style.taskLine}`}>
				<div>
					<Checkbox size={'small'}
							  checked={elem.isDone}
							  onChange={() => checkedTaskHandle(elem.id, !elem.isDone)}/>
					<EditTableSpan callback={changeTask} title={elem.title}/>
				</div>
				<IconButton onClick={() => removeTaskHandle(elem.id)}>
					<DeleteForeverIcon/>
				</IconButton>
			</ListItem>
		)
	})

	return (
		<div className={style.main}>
				<Typography variant="h6" sx={{fontWeight:'bolt'}}>
						<EditTableSpan title={props.title}
									   callback={(newTitle) => props.changeEditTitle(props.todoId, newTitle)}/>
					<Button onClick={() => props.removeTodoList(props.todoId)}
							size="small"
							variant="contained"
							startIcon={<DeleteForeverIcon/>}>
					</Button>
				</Typography>
			<div className={style.todoListManager}>
				<AddItemForm callback={(title) => props.addTask(title, props.todoId)} value={'Field cannot be empty'}/>
			</div>
			<List className={style.taskList} sx={{display: 'flex', flexDirection:"column",
				justifyContent: 'space-between'}}>
				{tasks}
			</List>
			<div className={style.btnFilter}>
				<Button
					sx={{mr: 1}}
					variant="contained"
					color={`${props.filterValue === 'all' ? 'secondary' : 'primary'}`}
					size="small"
					disableElevation
					onClick={() => filterValueTasksHandle('all')}>all</Button>
				<Button
					sx={{mr: 1}}
					variant="contained"
					color={props.filterValue === 'active' ? 'secondary' : 'primary'}
					size="small"
					disableElevation
					onClick={() => filterValueTasksHandle('active')}>active</Button>
				<Button

					sx={{mr: 1}}
					variant="contained"
					color={props.filterValue === 'completed' ? 'secondary' : 'primary'}
					size="small"
					disableElevation
					onClick={() => filterValueTasksHandle('completed')}>completed</Button>
			</div>
		</div>
	)
}