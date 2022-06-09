import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
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
      <header>
        <h1>TODO</h1>
        <img className="dark-mode-toggler" />
      </header>
      <main className={styles["main-section"]}>
        <form autoComplete="off">
          <div className={`${styles["fake-input"]} ${styles["rounded-box"]}`}>
            <div className={styles.circle}></div>
            <input
              className={`${styles["rounded-box"]} ${styles["input-box"]}`}
              type="text"
              id="new-item"
              name="newTodo"
              placeholder="Create a new todo..."
            />
          </div>
          <input type="submit" hidden />
        </form>
        <ul className={styles["todo-list"]}>
          <li className={styles["todo-list-item"]} draggable="true">
            <input type="checkbox" className={styles.checkbox} id="checkbox1" />
            <label htmlFor="checkbox1">Complete online JavaScript course</label>
            <img className={styles.delete} src="/images/icon-cross.svg" />
          </li>
          <li className={styles["todo-list-item"]} draggable="true">
            <input type="checkbox" className={styles.checkbox} id="checkbox2" />
            <label htmlFor="checkbox2">Jog around the park 3x</label>
            <img className={styles.delete} src="/images/icon-cross.svg" />
          </li>
          <li className={styles["todo-list-item"]} draggable="true">
            <input type="checkbox" className={styles.checkbox} id="checkbox3" />
            <label htmlFor="checkbox3">10 minutes meditation</label>
            <img className={styles.delete} src="/images/icon-cross.svg" />
          </li>
          <li className={styles["todo-list-item"]} draggable="true">
            <input type="checkbox" className={styles.checkbox} id="checkbox4" />
            <label htmlFor="checkbox4">Read for 1 hour</label>
            <img className={styles.delete} src="/images/icon-cross.svg" />
          </li>
          <li className={styles["todo-list-item"]} draggable="true">
            <input type="checkbox" className={styles.checkbox} id="checkbox5" />
            <label htmlFor="checkbox5">Pick up groceries</label>
            <img className={styles.delete} src="/images/icon-cross.svg" />
          </li>
          <li className={styles["todo-list-item"]} draggable="true">
            <input type="checkbox" className={styles.checkbox} id="checkbox6" />
            <label htmlFor="checkbox6">Complete Todo App on Frontend Mentor</label>
            <img className={styles.delete} src="/images/icon-cross.svg" />
          </li>
          <li className={styles["todo-list-item"]} draggable="true">
            <div>5 items left</div>
            <a>Clear Completed</a>
          </li>
        </ul>
        <div className={`${styles["filter-buttons"]} ${styles["rounded-box"]}`}>
          <a className={styles["selected-filter"]} href="#">All</a>
          <a href="#">Active</a>
          <a href="#">Completed</a>
        </div>
        <p className={styles["reorder-instructions"]}>Drag and Drop to Reorder List</p>
      </main>
      <footer className={styles.attribution}>
          Challenge by
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
          >Frontend Mentor</a
          >. Coded by <a href="#">John Higginson</a>
      </footer>
    </div>
  );
}


