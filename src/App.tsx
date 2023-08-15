import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {v1} from "uuid";


export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListType = {
	id: string
	title: string
	filter: FilterValueType
}

export type TasksArrayType = {
	[id: string]: TaskType[]
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

function App() {
	const todoListID_1 = v1()
	const todoListID_2 = v1()
	const [todoLists, setTodoLists] = useState<TodoListType[]>([
		{id: todoListID_1, title: 'What to learn', filter: 'all'},
		{id: todoListID_2, title: 'what to bay', filter: 'all'}
	])

	let [tasks, setTasks] = useState<TasksArrayType>({
		[todoListID_1]: [
			{id: v1(), title: 'HTML', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'React', isDone: false},
			{id: v1(), title: 'GraphQL', isDone: false},
		],
		[todoListID_2]: [
			{id: v1(), title: 'meat', isDone: true},
			{id: v1(), title: 'egg', isDone: true},
			{id: v1(), title: 'milk', isDone: false},
			{id: v1(), title: 'ice-cream', isDone: false},
		]
	})

	const removeTask = (id: string, todoId: string) => {
		setTasks({...tasks,[todoId]:tasks[todoId].filter(el=>el.id!==id)})
	}

	const addTask = (value: string, todoId: string) => {
		const newTask = {id:v1(), title:value, isDone:false}
		setTasks({...tasks, [todoId]:[newTask,...tasks[todoId]]})
	}


	const filterValueTasks = (value: FilterValueType, todoId: string) => {
		setTodoLists(todoLists.map(m=> m.id===todoId ? {...m, filter:value}:m))
	}

	const checkedTask = (id: string, isDone: boolean, todoId: string) => {
		setTasks({...tasks, [todoId]:tasks[todoId].map(m=>m.id===id ? {...m, isDone}:m)})
	}

	const removeTodoList = (todoId:string)=>{
		setTodoLists(todoLists.filter(f=> f.id!==todoId))
		delete tasks[todoId]
	}

	// const getFilteredTasks = (tasks: Array<TasksType>, filter: FilterValueType) => {
	//
	// 	if (filter === "active") {
	// 		return tasks.filter((elem) => !elem.isDone)
	// 	}
	// 	if (filter === "completed") {
	// 		return tasks.filter((elem) => elem.isDone)
	// 	}
	//
	// 	return tasks
	//
	// }


	const todoComponents = todoLists.map((td) => {
		let allTasks = tasks[td.id]
		if (td.filter === "active") {
			allTasks = tasks[td.id].filter((elem) => !elem.isDone)
		}
		if (td.filter === "completed") {
			allTasks = tasks[td.id].filter((elem) => elem.isDone)
		}


		return (
			<TodoList key={td.id}
					  todoId={td.id}
					  tasks={allTasks}
					  title={td.title}
					  removeTask={removeTask}
					  filterValueTasks={filterValueTasks}
					  addTask={addTask}
					  checkedTask={checkedTask}
					  removeTodoList={removeTodoList}
					  filterValue={td.filter}
			/>
		)
	})

	return (
		<div className="App">
			{todoComponents}
		</div>
	);
}

export default App;
