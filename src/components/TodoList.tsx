import React, {ChangeEvent} from "react";
import {FilterValueType, TasksType} from "../App";
import style from '../components/Style.module.css'
import {Button} from "./Button";

export type TodolistType = {
	tasks: Array<TasksType>
	title: string
	removeTask: (id: string) => void
	addTask: (value: string) => void
	filterValueTasks: (value: FilterValueType) => void
	checkedTask: (id: string, isDone: boolean) => void
}

export const TodoList = (props: TodolistType) => {
	let [titleInput, setTitleInput] = React.useState('')
	let [error, setError] = React.useState(false)
	let [edit, setEdit] = React.useState(false)

	const removeTaskHandle = (id: string) => props.removeTask(id)

	const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
		if (titleInput.length === 0) setError(false)
		setTitleInput(event.currentTarget.value)
	}

	const addTaskHandle = () => {
		titleInput.length === 0 && setError(true)
		if (titleInput.trim()) {
			props.addTask(titleInput)
			setTitleInput('')
		}
	}

	const checkedTaskHandle = (id: string, isDone: boolean) => {
		props.checkedTask(id, isDone)
	}

	const editHandle = () => {
		setEdit(!edit)
	}

	const filterValueTasksHandle = (value: FilterValueType) => props.filterValueTasks(value)

	let tasks = props.tasks.map((elem) => {
		return (
			<li key={elem.id}>
				<input type="checkbox"
					   checked={elem.isDone}
					   onChange={() => checkedTaskHandle(elem.id, !elem.isDone)}
				/>
				<span onDoubleClick={() => editHandle()}>{elem.title}</span>

				<button onClick={() => removeTaskHandle(elem.id)}>x</button>
			</li>
		)
	})

	return (
		<div>
			<h3>{props.title}</h3>
			<div className={style.lili}>
				<input
					   value={titleInput}
					   onChange={(event) => onChangeHandle(event)}/>
				<button onClick={addTaskHandle}>+</button>
				{error && <span className={style.error}> Поле не может быть пустым</span>}
			</div>
			<ul>
				{tasks}
			</ul>
			<div>
				<Button name={'All'} callback={() => filterValueTasksHandle('all')}/>
				<Button name={'Active'} callback={() => filterValueTasksHandle('active')}/>
				<Button name={'Completed'} callback={() => filterValueTasksHandle('completed')}/>

			</div>
		</div>
	)
}