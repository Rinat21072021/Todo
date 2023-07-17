import React, {ChangeEvent, KeyboardEvent} from "react";
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
	filterValue:FilterValueType
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
		if (titleInput.length === 0) {
			setError(true);
			return;
		}

		if (titleInput.trim()) {
			props.addTask(titleInput);
			setTitleInput("");
		}
	};

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') addTaskHandle()
	}

	const checkedTaskHandle = (id: string, isDone: boolean) => {
		props.checkedTask(id, isDone)
	}

	const editHandle = () => {
		setEdit(!edit)
	}

	const filterValueTasksHandle = (value: FilterValueType) => {
		props.filterValueTasks(value)

	}

	let tasks = props.tasks.map((elem) => {
		return (
			<li key={elem.id} className={elem.isDone ? style.isDone:'' }>
				<input type="checkbox"
					   checked={elem.isDone}
					   onChange={() => checkedTaskHandle(elem.id, !elem.isDone)}/>
				<span onDoubleClick={() => editHandle()}>{elem.title}</span>
				<button onClick={() => removeTaskHandle(elem.id)}>x</button>
			</li>
		)
	})

	return (
		<div>
			<h3>{props.title}</h3>
			<div className={style.lili}>
				<input className={error ? style.error : ''}
					value={titleInput}
					onChange={(event) => onChangeHandle(event)}
					onKeyPress={(event) => onKeyPressHandler(event)}
				/>
				<button onClick={addTaskHandle}>+</button>
				{error && <span className={style.errorMessage}> Поле не может быть пустым</span>}
			</div>
			<ul className={style.taskList}>
				{tasks}
			</ul>
			<div>
				<Button className={props.filterValue === 'all' ? style.filterActive: ''} name={'All'} callback={() => filterValueTasksHandle('all')}/>
				<Button className={props.filterValue === 'active' ? style.filterActive: ''} name={'Active'} callback={() => filterValueTasksHandle('active')}/>
				<Button className={props.filterValue === 'completed' ? style.filterActive: ''} name={'Completed'} callback={() => filterValueTasksHandle('completed')}/>
			</div>
		</div>
	)
}