import { useState, useEffect } from "react";

export default function TaskForm({ onSave, editing, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setDescription(editing.description);
      setPriority(editing.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("low");
    }
  }, [editing]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      id: editing ? editing.id : Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      status: editing ? editing.status : "new",
    });
    setTitle("");
    setDescription("");
    setPriority("low");
  };

  return (
    <form onSubmit={submit} className="task-form">
      <input
        placeholder="Название (обязательно)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </select>
      <button type="submit">{editing ? "Сохранить" : "Добавить"}</button>
      {editing && (
        <button type="button" onClick={onCancel}>
          Отмена
        </button>
      )}
    </form>
  );
}