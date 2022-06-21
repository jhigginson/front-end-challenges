import styles from "../styles/TodoList.module.css";
import { useTodoList } from "../context/TodoListProvider";

export default function TodoItem(props) {

  const todoListCtx = useTodoList();

  const handleDrop = (event, droppedId) => {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData("DraggedID");
    if (draggedId) {
      let itemDraggedId = parseInt(draggedId);
      todoListCtx.reorderTodos(itemDraggedId, droppedId);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData("DraggedID", props.item.id);
  };

  return (
    <li id={`todo-item-${props.item.id}`}
      className={`${styles["todo-list-item"]}${props.item.isHiding ? ' ' + styles['delete-anim'] : ""}${props.item.isGrowing ? ' ' + styles['create-anim'] : ""}`}
      draggable="true"
      onDrop={(e) => handleDrop(e, props.item.id)}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <input type="checkbox"
        className={styles.checkbox}
        id={`checkbox${props.item.id}`}
        checked={props.item.completed}
        onChange={() => todoListCtx.toggleChecked(props.item)}
      />

      <label htmlFor={`checkbox${props.item.id}`}>{props.item.text}</label>

      <img className={styles.delete}
        src="/images/icon-cross.svg"
        onClick={() => todoListCtx.deleteTodo(props.item)} draggable="false" />

    </li>);
}


