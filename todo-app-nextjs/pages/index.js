import { useState, useEffect, useContext } from "react";
import Head from 'next/head';
import Image from 'next/image';
import TodoHeader from '../components/TodoHeader';
import NewTodoInput from '../components/NewTodoInput';
import TodoList from "../components/TodoList";
import styles from '../styles/Home.module.css';
import colorStyles from '../styles/colors.module.css';
import mockTodo from '../mock-todo';
import { colorModeContext } from "../context/ColorModeProvider";


const getInitialTodos = () => { 
  let todoList = mockTodo;
  if (typeof window !== 'undefined' && window.localStorage["todoList"]) {
    todoList = JSON.parse(window.localStorage["todoList"]);
  }
  return todoList;
 }

export default function Home() {
  const [todoList, setTodoList] = useState([]);

  const colorCtx = useContext(colorModeContext);

  useEffect(() => {
    if(todoList.length === 0){
      setTodoList(getInitialTodos());
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && todoList.length > 0) {
      window.localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  const handleNewTodo = (todoItem) => {
    const maxId = Math.max(...todoList.map(i => i.id));
    setTodoList(prev => [...prev, { id: maxId < 0 ? 0 : maxId + 1, text: todoItem, completed: false }]);
  };

  const handleDelete = (idToDel) => {
    setTodoList(prev => prev.filter((item) => item.id != idToDel));
  };

  const handleToggleChecked = (index) => {
    setTodoList(prev => {
      let itemToCheck = prev.find(item => item.id === index);
      let completed = { id: itemToCheck.id, text: itemToCheck.text, completed: !itemToCheck.completed };
      let newTodos = [...prev];
      newTodos[newTodos.indexOf(itemToCheck)] = completed;
      return newTodos;
    });
  };

  const handleReorder = (origId, destId) => {
    if (origId === destId) return;
    const reorderedItems = [...todoList];

    const draggedItem = reorderedItems.find(i => i.id === origId);
    const droppedOnItem = reorderedItems.find(i => i.id === destId);
    reorderedItems.splice(reorderedItems.indexOf(draggedItem), 1);
    const newDestId = reorderedItems.indexOf(droppedOnItem);
    if (origId < destId) {
      //insert it after dest
      reorderedItems.splice(newDestId + 1, 0, draggedItem);
    } else if (origId > destId) {
      //insert it before dest
      reorderedItems.splice(newDestId, 0, draggedItem);
    }

    setTodoList(reorderedItems.map((elem, index) => { return { ...elem, id: index } }));

  }

  const handleClear = () => {
    setTodoList(prev => prev.filter(item => !item.completed));
  };

  return (

    <div className={`${styles.container} ${colorStyles[colorCtx.colorMode]}`}>
      <Head>
        <title>Frontend Mentor | Todo app</title>
        <meta name="description" content="A Frontend Mentor Challenge coded by John Higginson" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
      </Head>

      <TodoHeader />

      <main className={styles["main-section"]}>
        <NewTodoInput onSubmit={handleNewTodo} />
        <TodoList items={todoList} onDelete={handleDelete} onToggleChecked={handleToggleChecked} onClear={handleClear} onReorder={handleReorder} />
      </main>

      <footer className={styles.attribution}>
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge"
        >Frontend Mentor</a
        >. Coded by <a href="#">John Higginson</a>
      </footer>

    </div>
  );
}
