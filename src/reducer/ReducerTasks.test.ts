import {TasksArrayType} from "../App";
import {addTaskAC, changeTaskAC, checkedTaskAC, ReducerTasks, removeTaskAC} from "./ReducerTasks";
import {AddTopicTodoAC, RemoveTodoListAC} from "./ReducerTodolists";

test("should be correct change title task", () => {
    const startState: TasksArrayType = {
        todolistId1: [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false },
        ],
    };

    const endState = ReducerTasks(
        startState,
        addTaskAC("todolistId2", "Fish", )
    );

    expect(endState["todolistId2"][0].title).toBe("Fish");
    expect(endState["todolistId2"].length).toBe(4);
});
test("should be remove task", () => {

    const startState: TasksArrayType = {
        todolistId1: [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false },
        ],
    };

    const endState = ReducerTasks(
        startState,
        removeTaskAC('todolistId2', "1", )
    );

    expect(endState["todolistId2"][0].title).not.toBe("bread");
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId1"][0].title).toBe('CSS');
    })

test("should be change title task", () => {

    const startState: TasksArrayType = {
        todolistId1: [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false },
        ],
    };

    const endState = ReducerTasks(
        startState,
        changeTaskAC('todolistId1', "1", 'Angular')
    );
    expect(endState["todolistId1"][0].title).toBe('Angular');
    expect(endState["todolistId2"][0].title).toBe("bread");
    expect(endState["todolistId1"].length).toBe(3);
})

test("should be change checked task", () => {

    const startState: TasksArrayType = {
        todolistId1: [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false },
        ],
    };

    const endState = ReducerTasks(
        startState,
        checkedTaskAC('todolistId1', "1", true)
    );
    expect(endState["todolistId1"][0].isDone).toBeTruthy();
    expect(endState["todolistId2"][0].isDone).toBeFalsy();
    expect(endState["todolistId1"].length).toBe(3);
})

test("should be delete properties task", () => {

    const startState: TasksArrayType = {
        todolistId1: [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false },
        ],
    };

    const endState = ReducerTasks(
        startState,
        RemoveTodoListAC('todolistId1')
    );

    const keys = Object.entries(endState)

    expect(keys.length).toBe(1);
})

test('new array should be added when new todolist task', ()=>{
    const startState: TasksArrayType = {
        todolistId1: [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false },
        ],
    };
    const endState = ReducerTasks(startState, AddTopicTodoAC( '4', 'hoho'));

    const keys = Object.keys(endState)

    const newKey = keys.find(f => f !== 'todolistId1' && f !== 'todolistId2')
    if (!newKey){
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)

})

