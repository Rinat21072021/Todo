import React, {ChangeEvent, KeyboardEvent} from "react";
import {FilterValueType, TasksArrayType, TaskType} from "../App";
import style from '../components/Style.module.css'
import {Button} from "./Button";
import {AddItemForm} from "./addItemForm/AddItemForm";
import {EditTableSpan} from "./editTableSpan/EditTableSpan";

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
	changeEditTitle:(todolistId: string, newTitle: string)=>void
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
			<li key={elem.id} className={`${elem.isDone ? style.isDone : ''} ${style.taskLine}`}>
				<div>
					<input type="checkbox"
						   checked={elem.isDone}
						   onChange={() => checkedTaskHandle(elem.id, !elem.isDone)}/>
					<EditTableSpan callback={changeTask} title={elem.title}/>
				</div>
				<button onClick={() => removeTaskHandle(elem.id)}>x</button>
			</li>
		)
	})

	return (
		<div className={style.main}>
			<div className={style.todoListManager}>
				<h3>
					<EditTableSpan title={props.title} callback={(newTitle)=>props.changeEditTitle(props.todoId,newTitle)}/>
				</h3>
				<button onClick={() => props.removeTodoList(props.todoId)}>x</button>
			</div>
			<div className={style.todoListManager}>
				<AddItemForm callback={(title) => props.addTask(title, props.todoId)} value={'Field cannot be empty'}/>
			</div>
			<ul className={style.taskList}>
				{tasks}
			</ul>
			<div className={style.btnFilter}>
				<Button className={`${props.filterValue === 'all' ? style.filterActive : ''}`} name={'All'}
						callback={() => filterValueTasksHandle('all')}/>
				<Button className={props.filterValue === 'active' ? style.filterActive : ''} name={'Active'}
						callback={() => filterValueTasksHandle('active')}/>
				<Button className={props.filterValue === 'completed' ? style.filterActive : ''} name={'Completed'}
						callback={() => filterValueTasksHandle('completed')}/>
			</div>
		</div>
	)
}