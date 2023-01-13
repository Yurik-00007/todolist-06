import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

export type AddItemFormType = {
    addItem: (newTitle: string) => void
}

const AddItemForm = memo((props: AddItemFormType) => {
    console.log('AddItemForm is called')

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error!==null){
        setError(null);}
        if (e.charCode === 13) {
            addItem();
        }
    }


    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
});

export default AddItemForm;