import style from "../Style.module.css";
import styles from "../addItemForm/styles.module.css";
import React, {ChangeEvent, KeyboardEvent} from "react";
import {Button, TextField} from "@mui/material";

export type AddItemFormType = {
	value: string
	callback: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {
	const [titleInput, setTitleInput] = React.useState('')
	const [hasError, setHasError] = React.useState(false)
	const [placeholderWithError, setPlaceholderWithError] = React.useState('Creat')

	const addTaskHandle = () => {
		if (titleInput.length === 0) {
			setHasError(true);
			setPlaceholderWithError(props.value)
			return;
		}

		if (titleInput.trim()) {
			props.callback(titleInput);
			setTitleInput("");
		}
	};


	const onChangeHandle = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		if (titleInput.length === 0) setHasError(false)
		setTitleInput(event.currentTarget.value)
	}
	const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') addTaskHandle()
	}

	return (<>
			<TextField
					   variant="standard"
					   sx={{mr:2}}
					   value={titleInput}
					   error={hasError}
					   helperText={hasError ? props.value:""}
					   placeholder={placeholderWithError}
					   onChange={(event) => onChangeHandle(event)}
					   onKeyPress={(event) => onKeyPressHandler(event)}
			/>
			{/*<input*/}
			{/*	className={`${hasError ? style.error : ''}`}*/}
			{/*	value={titleInput}*/}
			{/*	placeholder={placeholderWithError}*/}
			{/*	onChange={(event) => onChangeHandle(event)}*/}
			{/*	onKeyPress={(event) => onKeyPressHandler(event)}*/}
			{/*/>*/}
			{/*<button className={styles.btnAddTask} onClick={addTaskHandle}>+</button>*/}
			<Button variant='outlined'
					size={'small'}
					onClick={addTaskHandle}>Add Task</Button>
		</>
	)
}