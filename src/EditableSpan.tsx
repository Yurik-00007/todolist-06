import React, {ChangeEvent, memo, useState} from 'react';

type EditableSpanType={
    oldTitle:string
    callback:(newTitle:string)=>void
}

export const EditableSpan = memo((props:EditableSpanType) => {
    //console.log('EditableSpan is called')
//debugger
    let [editMode,setEditMode]=useState<boolean>(false)
    let [title,setTitle]=useState<string>(props.oldTitle)

    const activateEditMode=()=>{
        setEditMode(true)
        setTitle(props.oldTitle)
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.callback(title)

    }

    const onChangeTitle=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }


    return (
        <>{editMode
            ?<input
                onChange={onChangeTitle}
                value={title}
                    autoFocus
                    onBlur={activateViewMode}/>
            : <span onDoubleClick={activateEditMode}>{title}</span>
        }

        </>
    );
});

export default EditableSpan;