export default function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <div className={`task-item priority-${task.priority}`}>
      <div className="task-info">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div className="task-meta">
          <span>Приоритет: {task.priority}</span>
          <span>Статус: {task.status}</span>
        </div>
      </div>
      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          <option value="new">Новая</option>
          <option value="in-progress">В работе</option>
          <option value="done">Выполнена</option>
        </select>
        <button onClick={() => onEdit(task)}>редактировать</button>
        <button onClick={() => onDelete(task.id)}>удалить</button>
      </div>
        <img class="gif" src="https://media1.tenor.com/m/d7wqDJoRHlIAAAAd/vergil-chair.gif" alt=""/>
    </div>

  );
}