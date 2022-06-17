import styles from "../styles/NewTodoInput.module.css";
import { useState } from "react";

export default function NewTodoInput(props) {
  const [newTodoItem, setNewTodoItem] = useState('');

  const handleNewTodo = (event) => {
    event.preventDefault(); //prevent page refresh

    props.onSubmit(newTodoItem);
    setNewTodoItem("");
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
        />
      </div>
      <input type="submit" hidden />
    </form>
  );
}