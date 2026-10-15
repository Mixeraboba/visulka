import { useState, useRef, useMemo } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import Stats from "../Stats";
import { useApp } from "../AppContext";

export default function TaskFlow() {
    const { theme, toggleTheme, actionCount, incActions } = useApp();

    const [tasks, setTasks] = useState([]);
    const [editing, setEditing] = useState(null);

    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterPriority, setFilterPriority] = useState("all");

    const prevSearchRef = useRef("");

    const handleSave = (task) => {
        if (editing) {
        setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
        setEditing(null);
        } else {
        setTasks((prev) => [...prev, task]);
        }
        incActions();
    };

    const handleDelete = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        incActions();
    };

    const handleStatusChange = (id, status) => {
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
        incActions();
    };

    const handleSearchChange = (e) => {
        prevSearchRef.current = search;
        setSearch(e.target.value);
    };

    const resetFilters = () => {
        setSearch("");
        setFilterStatus("all");
        setFilterPriority("all");
    };

    const filtered = useMemo(() => {
        return tasks.filter((t) => {
        const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "all" || t.status === filterStatus;
        const matchPriority =
            filterPriority === "all" || t.priority === filterPriority;
        return matchSearch && matchStatus && matchPriority;
        });
    }, [tasks, search, filterStatus, filterPriority]);

    return (
        <div className="app">
            <header>
                <h1>Висюлька.com</h1>
                <button onClick={toggleTheme}>Тема: {theme === "light" ? "светлая" : "НИГАА"}</button>
                <span>Действий: {actionCount}</span>
            </header>

        <Stats tasks={tasks} />

        <TaskForm onSave={handleSave} editing={editing} onCancel={() => setEditing(null)} />

        <div className="filters">
            <input
                placeholder="Поиск по названию"
                value={search}
                onChange={handleSearchChange}/>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">Все статусы</option>
                <option value="new">Новая</option>
                <option value="in-progress">В работе</option>
                <option value="done">Выполнена</option>
            </select>

            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                <option value="all">Все приоритеты</option>
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
            </select>
            <button onClick={resetFilters}>Сбросить фильтры</button>
        </div>

        <div className="task-list">
            {filtered.length === 0 ? (
            <p>Задач нет</p>
            ) : (
            filtered.map((task) => (
                <TaskItem
                key={task.id}
                task={task}
                onEdit={setEditing}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                />
            ))  
            )}
        </div>
    </div>
  );
}