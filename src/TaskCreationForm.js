import s from "./App.module.css";
import { useState } from 'react';

export const TaskCreationForm = ({ onTaskNameReady }) => {
  const [taskName, setTasksName] = useState("");

  const handleText = (e) => {
    const fieldValue = e.target.value;
    setTasksName(fieldValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && taskName !== "") {
      onTaskNameReady(taskName);
      setTasksName('');
    }
  }

  return (
    <input
      onKeyDown={handleKeyDown}
      className={s.todo}
      value={taskName}
      onChange={handleText}
      placeholder="Wpisz zadanie do zrobienia"
    />
  )
}