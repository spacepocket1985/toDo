import { TextField } from '@mui/material';
import React from 'react';
import { ChangeEvent, useState } from 'react';

type EditableSpanType = {
  title: string;
  onChange: (value: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanType) =>{
  console.log('call EditableSpan');
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const activateEditeMode = () => {
    setEditMode(true);
    setNewTitle(title);
  };

  const { title, onChange } = props;
  const activateViewMode = () => {
    setEditMode(false);
    onChange(newTitle);
  };
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTitle(e.currentTarget.value);

  return editMode ? (
    <TextField
      variant={'standard'}
      value={newTitle}
      onBlur={activateViewMode}
      autoFocus
      onChange={onChangeTitleHandler}
    />
  ) : (
    <span onDoubleClick={activateEditeMode}>{title}</span>
  );
})
