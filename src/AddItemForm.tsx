import { useState } from "react";

type AddItemFormPropsType = {
    addItem: (task: string) => void;
  };
  export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<null | string>(null);
  
    const { addItem } = props;
  
    const onChangeNewTaskTitleHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const newTaskTitle = event.target.value.trim();
      setNewTaskTitle(newTaskTitle);
      setError(null);
    };
  
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addNewTask();
      }
    };
  
    const addNewTask = (): void => {
      if (newTaskTitle.length === 0) {
        setError('Title is required');
        return;
      }
      addItem(newTaskTitle);
      setError(null);
      setNewTaskTitle('');
    };
  
    return (
      <div>
        <input
          type="text"
          className={error ? 'error' : ''}
          value={newTaskTitle}
          onChange={onChangeNewTaskTitleHandler}
          onKeyDown={onKeyPressHandler}
        />
        <button onClick={addNewTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
    );
  }