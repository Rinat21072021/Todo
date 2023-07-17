import React from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {v1} from "uuid";


export type TasksType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
	let [tasks, setTasks] = React.useState <Array<TasksType>>([
		{id: v1(), title: 'HTML', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'React', isDone: false},
		{id: v1(), title: 'GraphQL', isDone: false},
	])

	let [filterValue, setFilterValue] = React.useState<FilterValueType>('all')

	const removeTask = (id: string) => setTasks(tasks.filter(elem => elem.id !== id))

	const addTask = (value: string) => setTasks([{id: v1(), title: value, isDone: false}, ...tasks])

	const filterValueTasks = (value: FilterValueType) => setFilterValue(value)

	const checkedTask = (id: string, isDone: boolean) => {
		setTasks(tasks.map(elem=>id===elem.id ? {...elem, isDone}:elem))
	}

	let filterTask = tasks
	if (filterValue === "active") filterTask = tasks.filter((elem) => !elem.isDone)
	if (filterValue === "completed") filterTask = tasks.filter((elem) => elem.isDone)

	return (
		<div className="App">
			<TodoList tasks={filterTask}
					  title={'What to learn'}
					  removeTask={removeTask}
					  filterValueTasks={filterValueTasks}
					  addTask={addTask}
					  checkedTask={checkedTask}
					  filterValue={filterValue}
			/>
		</div>
	);
}

export default App;
