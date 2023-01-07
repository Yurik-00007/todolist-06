import React, {ChangeEvent, useState} from 'react';

type EditableSpanType={
    oldTitle:string
    callback:(newTitle:string)=>void
}

const EditableSpan = (props:EditableSpanType) => {
    //console.log(props.valueTitle)
//debugger
    let [editMode,setEditMode]=useState<boolean>(false)
    let [title,setTitle]=useState<string>(props.oldTitle)

    const activateEditMode=()=>{
        setEditMode(!editMode)
        changeTitleItem()
    }
    const onChangeTitle=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    const changeTitleItem=()=>{
        let newTitle=title.trim();
        if(newTitle!==''){
            props.callback(newTitle)
        }
    }

    return (
        <>{editMode
            ?<input
                onChange={onChangeTitle}
                value={title}
                    autoFocus
                    onBlur={activateEditMode}/>
            : <span onDoubleClick={activateEditMode}>{title}</span>
        }

        </>
    );
};

export default EditableSpan;