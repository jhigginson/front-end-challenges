import styles from "../styles/TodoList.module.css";

export default function TodoItem(props) {

  const handleDrop = (event, droppedId) => {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData("DraggedID");
    const matches = draggedId.match(/(\d+)/);
    if(matches){
      let itemDraggedId = parseInt(matches[0]);
      props.onDragAndDrop(itemDraggedId, droppedId);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData("DraggedID", event.target.id);
  };

  return (
    <li id={`todo-item-${props.item.id}`}
      className={styles["todo-list-item"]}
      draggable="true"
      onDrop={(e) => handleDrop(e, props.item.id)}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}>

      <input type="checkbox"
        className={styles.checkbox}
        id={`checkbox${props.item.id}`}
        checked={props.item.completed}
        onChange={props.onToggleCheck} />

      <label htmlFor={`checkbox${props.item.id}`}>{props.item.text}</label>

      <img className={styles.delete}
        src="/images/icon-cross.svg"
        onClick={props.onDelete} draggable="false" />

    </li>);
}


