import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import style from '../components/Style.module.css'
import {
    AppBar,
    Button, ButtonGroup,
    Container,
    createTheme, CssBaseline,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {amber, teal} from "@mui/material/colors";

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

    const [tasks, setTasks] = useState<TasksArrayType>({
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
    const [lightMode, setLightMode] = useState(true)
    const toggleTheme = () => setLightMode(!lightMode)
    const toggleThemeText = lightMode ? 'Set Light' : 'Set Dark'
    const theme = createTheme({
        palette: {
            primary: teal,
            secondary: amber,
            mode: lightMode ? 'light' : 'dark',
        },

    });

    const removeTask = (id: string, todoId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(el => el.id !== id)})
    }

    const addTask = (value: string, todoId: string) => {
        const newTask = {id: v1(), title: value, isDone: false}
        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})
    }

    const addTopicTodo = (title: string) => {
        const id = v1()
        const newTopic: TodoListType = {id: id, title, filter: 'all'}
        setTodoLists([...todoLists, newTopic])
        setTasks({...tasks, [id]: []})
    }

    const changeTask = (id: string, newTitle: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, title: newTitle} : t)})
    }

    const changeEditTitle = (todolistId: string, newTitle: string) => {
        setTodoLists(todoLists.map((t) => t.id === todolistId ? {...t, newTitle} : t))
    }

    const filterValueTasks = (value: FilterValueType, todoId: string) => {
        setTodoLists(todoLists.map(m => m.id === todoId ? {...m, filter: value} : m))
    }

    const checkedTask = (id: string, isDone: boolean, todoId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(m => m.id === id ? {...m, isDone} : m)})
    }

    const removeTodoList = (todoId: string) => {
        setTodoLists(todoLists.filter(f => f.id !== todoId))
        delete tasks[todoId]
    }


    const todoComponents = todoLists.map((td) => {
        let allTasks = tasks[td.id]
        if (td.filter === "active") {
            allTasks = tasks[td.id].filter((elem) => !elem.isDone)
        }
        if (td.filter === "completed") {
            allTasks = tasks[td.id].filter((elem) => elem.isDone)
        }


        return (
            <Grid item key={td.id}>
                <Paper sx={{p: 1}} elevation={10}>
                    <TodoList
                        todoId={td.id}
                        tasks={allTasks}
                        title={td.title}
                        removeTask={removeTask}
                        filterValueTasks={filterValueTasks}
                        addTask={addTask}
                        checkedTask={checkedTask}
                        changeTask={changeTask}
                        changeEditTitle={changeEditTitle}
                        removeTodoList={removeTodoList}
                        filterValue={td.filter}
                    />
                </Paper>
            </Grid>
        )
    })

    return <ThemeProvider theme={theme}>
        <div className="App">
            <CssBaseline/>
            <AppBar position='static' sx={{marginBottom: 3}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <ButtonGroup  variant="outlined" aria-label="outlined button group">
                        <Button color="inherit">LogOut</Button>
                        <Button color="inherit" onClick={toggleTheme}>{toggleThemeText}</Button>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container sx={{p: '15px', justifyContent: 'center'}}>
                    <AddItemForm value={'Enter text failed'} callback={(title) => addTopicTodo(title)}/>
                </Grid>
                <Grid container sx={{justifyContent: 'center'}} spacing={10}>
                    {todoComponents}
                </Grid>

            </Container>

        </div>
    </ThemeProvider>
}

export default App;
