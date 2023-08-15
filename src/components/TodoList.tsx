import React, {ChangeEvent, KeyboardEvent} from "react";
import {FilterValueType, TasksArrayType, TaskType} from "../App";
import style from '../components/Style.module.css'
import {Button} from "./Button";

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
}

export const TodoList = (props: TodolistType) => {
	let [titleInput, setTitleInput] = React.useState('')
	let [hasError, setHasError] = React.useState(false)
	let [placeholderWithError, setPlaceholderWithError] = React.useState('Creat Task')
	let [edit, setEdit] = React.useState(false)


	const removeTaskHandle = (id: string) => props.removeTask(id, props.todoId)

	const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
		if (titleInput.length === 0) setHasError(false)
		setTitleInput(event.currentTarget.value)
	}

	const addTaskHandle = () => {
		if (titleInput.length === 0) {
			setHasError(true);
			setPlaceholderWithError('Field cannot be empty')
			return;
		}

		if (titleInput.trim()) {
			props.addTask(titleInput, props.todoId);
			setTitleInput("");
		}
	};

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') addTaskHandle()
	}

	const checkedTaskHandle = (id: string, isDone: boolean) => {
		props.checkedTask(id, isDone, props.todoId)
	}

	const editHandle = () => {
		setEdit(!edit)
	}

	const filterValueTasksHandle = (value: FilterValueType) => {
			props.filterValueTasks(value, props.todoId)

		};

	let tasks = props.tasks.map((elem) => {
		return (
			<li key={elem.id} className={`${elem.isDone ? style.isDone : ''} ${style.taskLine}`}>
				<div>
					<input type="checkbox"
						   checked={elem.isDone}
						   onChange={() => checkedTaskHandle(elem.id, !elem.isDone)}/>
					<span onDoubleClick={() => editHandle()}>{elem.title}</span>
				</div>
				<button onClick={() => removeTaskHandle(elem.id)}>x</button>
			</li>
		)
	})

	return (
		<div className={style.main}>
			<div className={style.todoListManager}>
				<h3>{props.title}</h3>
				<button onClick={() => props.removeTodoList(props.todoId)}>x</button>
			</div>
			<div className={style.todoListManager}>
				<input
					className={`${hasError ? style.error: ''}`}
					value={titleInput}
					   placeholder={placeholderWithError}
					   onChange={(event) => onChangeHandle(event)}
					   onKeyPress={(event) => onKeyPressHandler(event)}
				/>
				<button className={style.btnAddTask} onClick={addTaskHandle}>+</button>
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