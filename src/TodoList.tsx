type PropsType = {
  title: string;
  tasks: Array<TaskType>;
};

type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export function TodoList(props: PropsType) {
  const { title, tasks } = props;
  console.log(tasks);
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li>
            <input type="checkbox" checked={task.isDone} key={task.id} />
            <span>{task.title}</span>
          </li>
        ))}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
}
