import styles from '../styles/TodoList.module.css';
import TodoItem from './TodoItem';
import { useViewport } from '../context/ViewportProvider';
import { useTodoList } from '../context/TodoListProvider';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { CSSTransition } from 'react-transition-group';

export default function TodoList(props) {
  const todoListCtx = useTodoList();
  const { height, width } = useViewport();

  const handleFilter = (event) => {
    const filter = event.target.innerText;
    todoListCtx.filterTodos(filter);
  };

  const filters = (<div className={[styles["filter-buttons"], styles["rounded-box"]].join(" ")}>
    <a className={todoListCtx.filterBy === 'All' ? styles["selected-filter"] : ''} href="#" onClick={handleFilter}>All</a>
    <a className={todoListCtx.filterBy === 'Active' ? styles["selected-filter"] : ''} href="#" onClick={handleFilter}>Active</a>
    <a className={todoListCtx.filterBy === 'Completed' ? styles["selected-filter"] : ''} href="#" onClick={handleFilter}>Completed</a>
  </div>);

  return (
    <>
      <ul className={[styles["todo-list"], styles["rounded-box"]].join(" ")}>
        <TransitionGroup  >
          {todoListCtx.todos.filter((item) => item.isVisible).map((item) =>
            <CSSTransition key={item.id}
              classNames={{
                enter: styles['before-create'],
                enterActive: styles['create-anim'],
                exit: '',
                exitActive: styles['delete-anim']
              }}
              timeout={300}>
              <TodoItem item={item} />
            </CSSTransition>
          )}
        </TransitionGroup>
        <footer>
          <div>{todoListCtx.todos.filter(item => !item.completed).length} items left</div>
          {width >= 640 && filters}
          <a onClick={todoListCtx.clearTodos}>Clear Completed</a>
        </footer>
      </ul>
      {width < 640 && filters}

      <p className={styles["reorder-instructions"]}>Drag and Drop to Reorder List</p>
    </>
  );
}