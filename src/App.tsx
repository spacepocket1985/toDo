import { useState } from 'react';
import { TodoList, TaskType, FilterType } from './TodoList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, title: 'CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);

  let tasksForTodoList = tasks;

  switch (filter) {
    case FilterType.COMPLETED:
      tasksForTodoList = tasks.filter((task) => task.isDone === true);
      break;
    case FilterType.ACTIVE:
      tasksForTodoList = tasks.filter((task) => task.isDone === false);
      break;
    default:
      tasksForTodoList = tasks;
      break;
  }


  function removeTask(id: number) {
    setTasks(tasks.filter((task) => task.id != id));
  }

  function changeFilter(filter: FilterType) {
    setFilter(filter);
  }

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
