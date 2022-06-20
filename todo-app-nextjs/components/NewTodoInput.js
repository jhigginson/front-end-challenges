import styles from "../styles/NewTodoInput.module.css";
import { useState } from "react";
import { useTodoList } from "../context/TodoListProvider";

export default function NewTodoInput(props) {
  const [newTodoItem, setNewTodoItem] = useState('');
  const todoListCtx = useTodoList();

  const handleNewTodo = (event) => {
    event.preventDefault(); //prevent page refresh
    setNewTodoItem(prev => prev.trim());
    if (newTodoItem.trim() !== "") {
      todoListCtx.addTodo(newTodoItem.trim());
      setNewTodoItem("");
    }

  };

  return (
    <form onSubmit={handleNewTodo} autoComplete="off">
      <div className={`${styles["fake-input"]} ${styles["rounded-box"]}`}>
        <div className="circle" />
        <input
          className={`${styles["rounded-box"]} ${styles["input-box"]}`}
          type="text"
          id="new-item"
          name="newTodo"
          placeholder="Create a new todo..."
          onChange={event => setNewTodoItem(event.target.value)}
          value={newTodoItem}
          required
        />
      </div>
      <input type="submit" hidden />
    </form>
  );
}