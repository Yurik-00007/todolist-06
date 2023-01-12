import React, {ChangeEvent} from 'react';
import {FilterValuesType, TodolistType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./store/store";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./store/todolists-reducer";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export function TodolistWithRedux(props: PropsType) {
    const {id: todolistId, title, filter} = props.todolist
    let tasks = useSelector<AppRootType, Array<TaskType>>(state => state.tasks[todolistId])
    const dispatch = useDispatch()

    const removeTodolist = () => dispatch(removeTodolistAC(todolistId))


    const onAllClickHandler = () => dispatch(changeFilterAC(todolistId, "all"))


    const onActiveClickHandler = () => dispatch(changeFilterAC(todolistId, "active"))

    const onCompletedClickHandler = () => dispatch(changeFilterAC(todolistId, "completed"))

    const addTask = (newTitleTask: string) => {
        dispatch(addTaskAC(todolistId,newTitleTask))
    }
    const changeTodolistTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId,newTitle))
    }

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
                tasks.map(task => {

                    const removeTask = () => dispatch(removeTaskAC(todolistId,task.id))


                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeStatusAC(todolistId,task.id,newIsDoneValue))
                    }

                    const changeTaskTitleHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(todolistId,task.id, newValue))
                    }

                    return <li key={task.id} className={task.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={changeTaskStatus} checked={task.isDone}/>
                        <EditableSpan
                            oldTitle={task.title}
                            callback={changeTaskTitleHandler}
                        />
                        <button onClick={removeTask}>x</button>
                    </li>
                })
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
}


