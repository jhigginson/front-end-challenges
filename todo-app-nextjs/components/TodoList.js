import styles from '../styles/TodoList.module.css';
import TodoItem from './TodoItem';
import { useViewport } from '../context/ViewportProvider';
import { useTodoList } from '../context/TodoListProvider';


export default function TodoList(props) {
  const todoListCtx = useTodoList();
  const { height, width } = useViewport();

  const handleFilter = (event) => {
    const filter = event.target.innerText;
    todoListCtx.filterTodos(filter);
  };

  const filters = (<div className={`${styles["filter-buttons"]} ${styles["rounded-box"]}`}>
    <a className={todoListCtx.filterBy === 'All' ? styles["selected-filter"] : ''} href="#" onClick={handleFilter}>All</a>
    <a className={todoListCtx.filterBy === 'Active' ? styles["selected-filter"] : ''} href="#" onClick={handleFilter}>Active</a>
    <a className={todoListCtx.filterBy === 'Completed' ? styles["selected-filter"] : ''} href="#" onClick={handleFilter}>Completed</a>
  </div>);

  return (
    <>
      <ul className={styles["todo-list"]} >

        {todoListCtx.todos.filter((item) => item.isVisible).map((item) =>
          <TodoItem item={item} key={item.id} />
        )}

        <li className={styles["todo-list-item"]}>
          <div>{todoListCtx.todos.filter(item => !item.completed).length} items left</div>
          {width >= 640 && filters}
          <a onClick={todoListCtx.clearTodos}>Clear Completed</a>
        </li>

      </ul>
      {width < 640 && filters}

      <p className={styles["reorder-instructions"]}>Drag and Drop to Reorder List</p>
    </>
  );
}