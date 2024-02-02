import { ControlPoint } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';

type AddItemFormPropsType = {
  addItem: (task: string) => void;
};
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  console.log('AddItemForm is called');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<null | string>(null);

  const { addItem } = props;

  const onChangeNewTaskTitleHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newTaskTitle = event.target.value.trim();
    setNewTaskTitle(newTaskTitle);
    setError(null);
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (error !== null) setError(null);
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
      <TextField
        variant={'standard'}
        label={'type value'}
        error={!!error}
        helperText={error}
        value={newTaskTitle}
        onChange={onChangeNewTaskTitleHandler}
        onKeyDown={onKeyPressHandler}
      />
      <IconButton onClick={addNewTask} color={'primary'}>
        <ControlPoint />
      </IconButton>
    </div>
  );
});
