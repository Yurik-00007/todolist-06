import {useDispatch} from "react-redux";
import React, {ChangeEvent, memo, useCallback} from "react";
import {changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import EditableSpan from "./EditableSpan";
import {TaskType} from "./TodolistWithRedux";

type TaskPropsType = {
    todolistId: string
    task: TaskType
}
export const Task = memo((props: TaskPropsType) => {
    const {todolistId, task} = props
    const dispatch = useDispatch()
    const removeTask = useCallback(() => dispatch(removeTaskAC(todolistId, task.id)), [dispatch])


    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeStatusAC(todolistId, task.id, newIsDoneValue))
    }, [dispatch])

    const changeTaskTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(todolistId, task.id, newValue))
    }, [dispatch])

    return <li key={task.id} className={task.isDone ? "is-done" : ""}>
        <input type="checkbox" onChange={changeTaskStatus} checked={task.isDone}/>
        <EditableSpan
            oldTitle={task.title}
            callback={changeTaskTitleHandler}
        />
        <button onClick={removeTask}>x</button>
    </li>

})