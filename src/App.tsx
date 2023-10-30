import React, { useState } from 'react';
import './App.css';
import { TodoList } from "./components/TodoList";
import { AddItemForm } from "./components/addItemForm/AddItemForm";
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
import { amber, teal } from "@mui/material/colors";
import { useDispatch, useSelector } from 'react-redux';
import { AddTopicTodoAC,  FilterValueTasksAC } from './reducer/ReducerTodolists';
import { tasksSelector, todoListSelector } from './reducer/selector'


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
    const todoLists = useSelector(todoListSelector)
    const tasks = useSelector(tasksSelector)
    const dispatch = useDispatch()
    const [lightMode, setLightMode] = useState(true)

    const toggleTheme = () => setLightMode(!lightMode)
    const toggleThemeText = lightMode ? 'Set Light' : 'Set Dark'
    const theme = createTheme({
        palette: {
            primary: teal,
            secondary: amber,
            mode: !lightMode ? 'light' : 'dark',
        },
    });

    const addTopicTodo = (title: string) => {dispatch(AddTopicTodoAC(title))}
    const filterValueTasks = (value: FilterValueType, todoId: string) => {dispatch(FilterValueTasksAC(value, todoId))}

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
                <Paper sx={{ p: 1 }} elevation={10}>
                    <TodoList
                        todoId={td.id}
                        tasks={allTasks}
                        title={td.title}
                        filterValueTasks={filterValueTasks}
                        filterValue={td.filter}
                    />
                </Paper>
            </Grid>
        )
    })

    return <ThemeProvider theme={theme}>
        <div className="App">
            <CssBaseline />
            <AppBar position='static' sx={{ marginBottom: 3 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button color="inherit">LogOut</Button>
                        <Button color="inherit" onClick={toggleTheme}>{toggleThemeText}</Button>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container sx={{ p: '15px', justifyContent: 'center' }}>
                    <AddItemForm value={'Enter text failed'} callback={(title) => addTopicTodo(title)} />
                </Grid>
                <Grid container sx={{ justifyContent: 'center' }} spacing={10}>
                    {todoComponents}
                </Grid>
            </Container>
        </div>
    </ThemeProvider>
}

export default App;
