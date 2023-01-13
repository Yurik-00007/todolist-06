import React, {ChangeEvent, memo, useCallback} from 'react';
import {TodolistType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./store/store";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./store/todolists-reducer";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export const TodolistWithRedux= memo((props: PropsType)=> {
    console.log('Todolist is called')
    const {id: todolistId, title, filter} = props.todolist
    let tasks = useSelector<AppRootType, Array<TaskType>>(state => state.tasks[todolistId])
    const dispatch = useDispatch()

    const removeTodolist = useCallback(() => dispatch(removeTodolistAC(todolistId)),[dispatch])


    const onAllClickHandler = useCallback(() => dispatch(changeFilterAC(todolistId, "all")),[dispatch])


    const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC(todolistId, "active")),[dispatch])

    const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC(todolistId, "completed")),[dispatch])

    const addTask = useCallback((newTitleTask: string) => {
        dispatch(addTaskAC(todolistId,newTitleTask))
    },[dispatch])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId,newTitle))
    },[dispatch])

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }
    return <div>
        <h3><EditableSpan oldTitle={title} callback={changeTodolistTitle}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasks.map(task =>
                    <Task
                        key={task.id}
                        task={task}
                        todolistId={todolistId}
                          />
                )
            }
        </ul>
        <div>
            <button className={filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
})

