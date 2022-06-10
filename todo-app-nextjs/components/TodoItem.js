import styles from "../styles/TodoList.module.css";

export default function TodoItem(props) {
  return (
    <li className={styles["todo-list-item"]} draggable="true">

      <input type="checkbox"
        className={styles.checkbox}
        id={`checkbox${props.item.id}`}
        checked={props.item.completed}
        onChange={props.onToggleCheck} />

      <label htmlFor={`checkbox${props.item.id}`}>{props.item.text}</label>

      <img className={styles.delete}
        src="/images/icon-cross.svg"
        onClick={props.onDelete} />

    </li>);
}


