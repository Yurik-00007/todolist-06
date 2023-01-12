import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
import {
    addTodolistAC, changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./store/todolists-reducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducer() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setDispatchToTodolists] = useReducer(todolistsReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setDispatchToTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });


    function removeTask(todolistId: string, taskId: string) {
        setDispatchToTasks(removeTaskAC(todolistId,taskId))
        //setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id != taskId)});
    }

    function addTask(todolistId: string, title: string) {
        setDispatchToTasks(addTaskAC(todolistId,title))
        //setTasks({...tasks, [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]});
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setDispatchToTasks(changeStatusAC(todolistId,taskId,isDone))
        //setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)});
    }

    function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        setDispatchToTasks(changeTaskTitleAC(todolistId,taskId,newTitle))
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        // })
    }


    function removeTodolist(todolistId: string) {
const action=removeTodolistAC(todolistId)
        setDispatchToTodolists(action)
        setDispatchToTasks(action)
/*
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id != todolistId));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[todolistId]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
*/

    }

    function addTodolist(newTitleTodolist: string) {
        const action=addTodolistAC(newTitleTodolist)
        setDispatchToTodolists(action)
        setDispatchToTasks(action)
        // const todolistId = v1();
        // setTodolists([{id: todolistId, title: newTitleTodolist, filter: "all"}, ...todolists])
        // setTasks({
        //     ...tasks, [todolistId]: [
        //         {id: v1(), title: "HTML&CSS", isDone: true},
        //         {id: v1(), title: "JS", isDone: true},
        //         {id: v1(), title: "React", isDone: false},
        //         {id: v1(), title: "Redux", isDone: false},
        //     ]
        // })
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {

        setDispatchToTodolists(changeFilterAC(todolistId,value))
        //setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }


    function changeTodolistTitle(todolistId: string, newTitle: string) {
        setDispatchToTodolists(changeTodolistTitleAC(todolistId,newTitle))
        //setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            todolistId={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    )
                })
            }

        </div>
    );
}

export default AppWithReducer;
