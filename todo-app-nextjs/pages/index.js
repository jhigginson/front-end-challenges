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


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default function Home() {
  const [todoList, setTodoList] = useState(mockTodo);

  const colorCtx = useContext(colorModeContext);

  const handleNewTodo = (todoItem) => {
    let randId = 0;
    while (todoList.find(item => item.id === randId)) {
      randId = getRandomInt(100000);
    }
    setTodoList(prev => [...prev, { id: randId, text: todoItem, completed: false }]);
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
        <TodoList items={todoList} onDelete={handleDelete} onToggleChecked={handleToggleChecked} onClear={handleClear} />
      </main>
      <footer className={styles.attribution}>
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge"
        >Frontend Mentor</a
        >. Coded by <a href="#">John Higginson</a>
      </footer>
    </div>
  );
}


