type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: number) => void;
  changeFilter: (filter: FilterType) => void;
};

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export enum FilterType {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export function TodoList(props: PropsType) {
  const { title, tasks, removeTask, changeFilter } = props;

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {tasks.map((task) => {
          const { id, isDone, title } = task;
          return (
            <li key={id}>
              <input type="checkbox" checked={isDone} />
              <span>{title}</span>
              <button
                onClick={() => {
                  removeTask(id);
                }}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => changeFilter(FilterType.ALL)}>{FilterType.ALL}</button>
        <button onClick={() => changeFilter(FilterType.ACTIVE)}>{FilterType.ACTIVE}</button>
        <button onClick={() => changeFilter(FilterType.COMPLETED)}>{FilterType.COMPLETED}</button>
      </div>
    </div>
  );
}
