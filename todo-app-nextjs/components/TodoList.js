import { useState, useEffect, useCallback } from 'react';
import styles from '../styles/TodoList.module.css';
import TodoItem from './TodoItem';
import { useViewport } from '../context/ViewportProvider';

export default function TodoList(props) {

  const [filterBy, setFilterBy] = useState('All');
  const [filteredItems, setFilteredItems] = useState(props.items);

  const { height, width } = useViewport();

  const filterItems = useCallback((fltr) => {
    const newItems = newItems = props.items; //default to "All"

    if (fltr === "Active") {
      newItems = props.items.filter(item => !item.completed);
    }
    else if (fltr === "Completed") {
      newItems = props.items.filter(item => item.completed);
    }

    setFilteredItems(newItems);

  }, [props.items]);

  useEffect(() => {
    filterItems(filterBy);
  }, [filterItems, filterBy]);



  const handleFilter = (event) => {
    const filter = event.target.innerText;
    setFilterBy(filter);
    filterItems(filter);
  };

  const filters = (<div className={`${styles["filter-buttons"]} ${styles["rounded-box"]}`}>
    <a className={filterBy === 'All' ? styles["selected-filter"] : ''} href="#" onClick={handleFilter}>All</a>
    <a className={filterBy === 'Active' ? styles["selected-filter"] : ''} href="#" onClick={handleFilter}>Active</a>
    <a className={filterBy === 'Completed' ? styles["selected-filter"] : ''} href="#" onClick={handleFilter}>Completed</a>
  </div>);

  return (
    <>
      <ul className={styles["todo-list"]}>

        {filteredItems.map((item, index) =>
          <TodoItem item={item} key={index} onDelete={() => props.onDelete(item.id)} onToggleCheck={() => props.onToggleChecked(item.id)} />
        )}

        <li className={styles["todo-list-item"]}>
          <div>{props.items.filter(item => !item.completed).length} items left</div>
          {width >= 640 && filters}
          <a onClick={props.onClear}>Clear Completed</a>
        </li>
      </ul>
      {width < 640 && filters}

      <p className={styles["reorder-instructions"]}>Drag and Drop to Reorder List</p>
    </>
  );
}