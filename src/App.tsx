import { useState } from 'react';
import { TodoList, TaskType, FilterType } from './TodoList';
import './App.css';
import { v1 } from 'uuid';

type TodoListType = {
  id: string;
  title: string;
  filter: FilterType;
};

function App() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLIsts] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to learn?', filter: FilterType.ACTIVE },
    { id: todoListId2, title: 'What to buy?', filter: FilterType.COMPLETED },
  ]);

  const [tasksObj, setTasksObj] = useState({
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

  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let filtredTasks = tasks.filter((task) => task.id != id);
    tasksObj[todoListId] = filtredTasks;
    setTasksObj({ ...tasksObj });
  }

  function changeFilter(filter: FilterType, todoListId: string) {
    let todoList = todoLists.find((list) => list.id === todoListId);
    if (todoList) {
      console.log(todoList);
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

    let task = tasks.find(t=>t.id===id);
    if (task) {
      task.isDone = !task.isDone;
      setTasksObj({ ...tasksObj });
    }
   
  }

  return (
    <div className="App">
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
            changeTaskStatus={changeTaskStatus}
            filter={todoList.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
