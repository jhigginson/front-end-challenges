import { useContext } from "react";
import Head from 'next/head';
import Image from 'next/image';
import TodoHeader from '../components/TodoHeader';
import NewTodoInput from '../components/NewTodoInput';
import TodoList from "../components/TodoList";
import styles from '../styles/Home.module.css';
import colorStyles from '../styles/colors.module.css';
import { colorModeContext } from "../context/ColorModeProvider";



export default function Home() {
  const colorCtx = useContext(colorModeContext);

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
        <NewTodoInput />
        <TodoList />
      </main>

      <footer className={styles.attribution}>
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge"
        >Frontend Mentor</a
        >. Coded by <a href="#">John Higginson</a>
      </footer>

    </div>
  );
}
