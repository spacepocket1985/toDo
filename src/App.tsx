import { useState } from 'react';
import { v1 } from 'uuid';

import { TodoList, TaskType } from './TodoList';
import { AddItemForm } from './AddItemForm';
import { FilterType } from './types/enums';
import './App.css';

type TodoListType = {
  id: string;
  title: string;
  filter: FilterType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLIsts] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to learn?', filter: FilterType.ALL },
    { id: todoListId2, title: 'What to buy?', filter: FilterType.ALL },
  ]);

  const [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todoListId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Milk', isDone: false },
    ],
  });

  function removeTodoList(todoListId: string) {
    setTodoLIsts(todoLists.filter((list) => list.id !== todoListId));

    delete tasksObj[todoListId];
    setTasksObj({ ...tasksObj });
  }

  function removeTask(id: string, todoListId: string) {
    const tasks = tasksObj[todoListId];
    const filtredTasks = tasks.filter((task) => task.id != id);
    tasksObj[todoListId] = filtredTasks;
    setTasksObj({ ...tasksObj });
  }

  function changeFilter(filter: FilterType, todoListId: string) {
    const todoList = todoLists.find((list) => list.id === todoListId);
    if (todoList) {
      todoList.filter = filter;
      setTodoLIsts([...todoLists]);
    }
  }

  function addTask(taskTitle: string, todoListId: string) {
    const newTask: TaskType = {
      id: v1(),
      title: taskTitle,
      isDone: false,
    };
    const tasks = tasksObj[todoListId];
    const newTasks = [newTask, ...tasks];
    tasksObj[todoListId] = newTasks;

    setTasksObj({ ...tasksObj });
  }

  function changeTaskStatus(id: string, todoListId: string) {
    const tasks = tasksObj[todoListId];

    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.isDone = !task.isDone;
      setTasksObj({ ...tasksObj });
    }
  }

  function changeTaskTitle(id: string, todoListId: string, title: string) {
    const newTask = tasksObj[todoListId].find((task) => task.id === id);

    if (newTask) {
      newTask.title = title;
      setTasksObj({ ...tasksObj });
    }
  }

  function addTodoList(title: string) {
    const todoList: TodoListType = {
      id: v1(),
      title: title,
      filter: FilterType.ALL,
    };

    setTodoLIsts([todoList, ...todoLists]);
    setTasksObj({ ...tasksObj, [todoList.id]: [] });
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {todoLists.map((todoList) => {
        let tasksForTodoList = tasksObj[todoList.id];
        switch (todoList.filter) {
          case FilterType.COMPLETED:
            tasksForTodoList = tasksObj[todoList.id].filter((task) => task.isDone === true);
            break;
          case FilterType.ACTIVE:
            tasksForTodoList = tasksObj[todoList.id].filter((task) => task.isDone === false);
            break;
          default:
            tasksForTodoList = tasksObj[todoList.id];
            break;
        }

        return (
          <TodoList
            idList={todoList.id}
            key={todoList.id}
            title={todoList.title}
            tasks={tasksForTodoList}
            addTask={addTask}
            removeTask={removeTask}
            changeFilter={changeFilter}
            removeTodoList={removeTodoList}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            filter={todoList.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
