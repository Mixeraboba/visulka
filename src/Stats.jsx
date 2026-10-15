export default function Stats({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="stats">
      <div>Всего: {total}</div>
      <div>Выполнено: {done}</div>
      <div>В работе: {inProgress}</div>
      <div>Прогресс: {percent}%</div>
    </div>
  );
}