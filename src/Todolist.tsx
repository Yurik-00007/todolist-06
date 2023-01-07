import React, {ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {


    const removeTodolist = () => props.removeTodolist(props.todolistId)

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");
    const addTask = (newTitleTask: string) => {
        props.addTask(props.todolistId, newTitleTask)
    }
    const changeTodolistHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }
    return <div>
        <h3><EditableSpan oldTitle={props.title} callback={changeTodolistHandler}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(task => {

                    const removeTaskHandler = () => props.removeTask(props.todolistId, task.id)

                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(props.todolistId, task.id, newIsDoneValue);
                    }

                    const changeTaskTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(props.todolistId, task.id, newValue)
                    }

                    return <li key={task.id} className={task.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={changeTaskStatusHandler} checked={task.isDone}/>
                        <EditableSpan
                            oldTitle={task.title}
                            callback={changeTaskTitleHandler}
                        />
                        <button onClick={removeTaskHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


