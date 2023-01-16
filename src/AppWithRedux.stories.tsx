import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddItemForm from "./AddItemForm";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AppWithRedux {...args} />;

export const AppWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
/*AddItemFormStory.args = {
    addItem: action('Button is clicked')
};*/

