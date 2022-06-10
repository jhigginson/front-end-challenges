import { useState, useEffect, useCallback } from 'react';
import styles from '../styles/TodoList.module.css';
import TodoItem from './TodoItem';

export default function TodoList(props) {

  const [filterBy, setFilterBy] = useState('All');
  const [filteredItems, setFilteredItems] = useState(props.items);


  const filterItems = useCallback((fltr) => {
    const newItems = [];

    if(fltr === "Active"){
      newItems = props.items.filter(item => !item.completed)
    }
    else if(fltr === "Completed"){
      newItems = props.items.filter(item => item.completed)
    }
    else {
      newItems = props.items;
    }

    setFilteredItems(newItems);
  }, [props.items]);
  
  useEffect( () => {
    filterItems(filterBy);
  },[filterItems, filterBy]);



  const handleFilter = (event) => {
    const filter = event.target.innerText;
    setFilterBy(filter);
    filterItems(filter);
  };

  return (
    <>
      <ul className={styles["todo-list"]}>

        {filteredItems.map((item, index) =>
          <TodoItem item={item} key={index} onDelete={() => props.onDelete(item.id)} onToggleCheck={() => props.onToggleChecked(item.id)} />
        )}

        <li className={styles["todo-list-item"]}>
          <div>{props.items.filter(item => !item.completed).length} items left</div>
          <a onClick={() => props.onClear()}>Clear Completed</a>
        </li>
      </ul>

      <div className={`${styles["filter-buttons"]} ${styles["rounded-box"]}`}>
        <a className={filterBy === 'All' ? styles["selected-filter"] : ''} href="#" onClick={handleFilter}>All</a>
        <a className={filterBy === 'Active' ? styles["selected-filter"] : ''} href="#" onClick={handleFilter}>Active</a>
        <a className={filterBy === 'Completed' ? styles["selected-filter"] : ''} href="#" onClick={handleFilter}>Completed</a>
      </div>

      <p className={styles["reorder-instructions"]}>Drag and Drop to Reorder List</p>
    </>
  );
}