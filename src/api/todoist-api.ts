import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials:true,
    headers: {'X-Custom-Header': 'foobar'}
  });

export const todoListAPI = {
    getTodo(){
        return instance.get<TodoListType[]>('/todo-lists')
    },
    createTodo(title:string){
        return instance.post<ResponseType<{item: TodoListType}>>(`/todo-lists`, {title})
    },
    updateTodo(todoID:string, title:string){
        return instance.put<ResponseType>(`/todo-lists/${todoID}`, {title})
    },
    deleteTodo(todoID:string){
        return instance.delete<ResponseType>(`/todo-lists/${todoID}`)
    }

}

type TodoListType = {
    addedDate: Date
    id:string
    order:number
    title:string
}

// type CreateTodoListType = {
//     resultCode: number
//     messages: string[],
//     data: {
//       item: TodoListType
//     }
// }

// type OwnTodoListType={
//     resultCode: number
//     messages: string[],
//     data: {}
// }

type ResponseType< T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}
