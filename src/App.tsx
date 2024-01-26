import { useState } from 'react';
import { TodoList, TaskType, FilterType } from './TodoList';
import './App.css';
import { v1 } from 'uuid';

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
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

  function removeTask(id: string) {
    setTasks(tasks.filter((task) => task.id != id));
  }

  function changeFilter(filter: FilterType) {
    setFilter(filter);
  }

  function addTask(taskTitle: string) {
    if (taskTitle.length > 0) {
      const newTask: TaskType = {
        id: v1(),
        title: taskTitle,
        isDone: false,
      };
      setTasks([newTask, ...tasks]);
    }
  }

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={tasksForTodoList}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
