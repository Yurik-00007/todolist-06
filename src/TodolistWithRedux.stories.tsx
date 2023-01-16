import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddItemForm from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {TodolistWithRedux} from "./TodolistWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/TodolistWithRedux',
    component: TodolistWithRedux,
    decorators:[ReduxStoreProviderDecorator],
    args:{
        todolist:{id: 'todolistId2', title: 'What to buy', filter: 'all'}
    }
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TodolistWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TodolistWithRedux> = (args) => <TodolistWithRedux {...args} />;

export const TodolistWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TodolistWithReduxStory.args = {
   // addItem: action('Button is clicked')
};

