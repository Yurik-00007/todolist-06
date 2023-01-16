import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from "./Task";
import {useSelector} from "react-redux";
import {AppRootType, store} from "./store/store";
import {TaskType} from "./TodolistWithRedux";
import {todolistId1} from "./store/todolists-reducer";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
  title: 'TODOLIST/Task',
  component: Task,
  decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

const TaskWithReduxContainer=()=>{
  const task=useSelector<AppRootType, TaskType>(state=>state.tasks['todolistId1'][0])
  return <Task todolistId={'todolistId1'} task={task}/>
}

const Template: ComponentStory<typeof Task> = (args) => {
  return (
  <TaskWithReduxContainer/>
  )
};

export const TaskWithReduxStory = Template.bind({});

