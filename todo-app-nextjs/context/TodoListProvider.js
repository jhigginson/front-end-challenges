import { createContext, useReducer, useContext, useState, useEffect } from 'react';
import todoListReducer, { initialState } from './todoListReducer';
import mockTodo from '../mock-todo';

const TodoListContext = createContext(initialState);


const getInitialState = () => {
  let updatedTodoList = [];
  if (typeof window !== 'undefined' && window.localStorage["todoList"]) {
    updatedTodoList = JSON.parse(window.localStorage["todoList"]);
  }
  let updatedFilter = "All";
  if (typeof window !== 'undefined' && window.localStorage["todoFilter"]) {
    updatedFilter = window.localStorage["todoFilter"];
  }

  return [updatedTodoList, updatedFilter];
}


const TodoListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoListReducer, initialState);
  const [isWindowLoaded, setIsWindowLoaded] = useState(false);

  useEffect(() => {
    const [updatedTodos, updatedFltr] = getInitialState();
    if (!isWindowLoaded) {
      setIsWindowLoaded(true);
      dispatch({
        type: "INIT_TODOS",
        payload: {
          todos: updatedTodos,
          filterBy: updatedFltr
        }
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && isWindowLoaded) {
      window.localStorage.setItem('todoList', JSON.stringify(state.todos));
      window.localStorage.setItem('todoFilter', state.filterBy)
    }
  }, [state.todos, state.filterBy]);

  const addTodo = (todoText) => {
    const maxId = Math.max(...state.todos.map(i => i.id));

    const todo = {
      id: maxId < 0 ? 0 : maxId + 1,
      text: todoText,
      completed: false,
      isVisible: true
    };
    const updatedTodos = state.todos.concat(todo);

    dispatch({
      type: "NEW_TODO",
      payload: {
        todos: updatedTodos
      }
    });
  }

  const deleteTodo = (todo) => {
    const updatedTodos = state.todos.filter((item) => item.id !== todo.id);

    dispatch({
      type: "DELETE",
      payload: {
        todos: updatedTodos
      }
    });
  }

  const toggleChecked = (todo) => {
    let updatedTodos = [...state.todos];
    const completedTodo = updatedTodos.find((item) => item.id === todo.id);
    updatedTodos.splice(state.todos.indexOf(completedTodo), 1, { ...todo, completed: !todo.completed });
    dispatch({
      type: "TOGGLE_CHECKED",
      payload: {
        todos: updatedTodos
      }
    });
  }

  const clearTodos = () => {
    const updatedTodos = state.todos.filter((item) => item.completed === false);

    dispatch({
      type: "CLEAR",
      payload: {
        todos: updatedTodos
      }
    })
  }

  const filterTodos = (fltr) => {
    let updatedTodos = state.todos.map((item) => { return { ...item, isVisible: true } });

    if (fltr === "Active") {
      updatedTodos = state.todos.map((item) => { return { ...item, isVisible: !item.completed } });
    }
    else if (fltr === "Completed") {
      updatedTodos = state.todos.map((item) => { return { ...item, isVisible: item.completed } });
    }

    dispatch({
      type: "FILTER",
      payload: {
        todos: updatedTodos,
        filterBy: fltr
      }
    });
  }

  const reorderTodos = (origId, destId) => {
    if (origId === destId) return;
    let updatedTodos = [...state.todos];

    const draggedItem = updatedTodos.find(i => i.id === origId);
    const droppedOnItem = updatedTodos.find(i => i.id === destId);

    const droppedIdx = state.todos.indexOf(droppedOnItem);
    const draggedIdx = state.todos.indexOf(draggedItem);
    updatedTodos.splice(draggedIdx, 1); //delete dragged Item

    const newDroppedIdx = updatedTodos.indexOf(droppedOnItem);
    if (draggedIdx < droppedIdx) {
      updatedTodos.splice(newDroppedIdx + 1, 0, draggedItem);
    } else if (draggedIdx > droppedIdx) {
      updatedTodos.splice(newDroppedIdx, 0, draggedItem);
    }

    dispatch({
      type: "REORDER",
      payload: {
        todos: updatedTodos
      }
    });
  }

  const value = {
    filterBy: state.filterBy,
    todos: state.todos,
    addTodo,
    deleteTodo,
    toggleChecked,
    clearTodos,
    filterTodos,
    reorderTodos
  };

  return <TodoListContext.Provider value={value}>{children}</TodoListContext.Provider>

};

export const useTodoList = () => {
  const context = useContext(TodoListContext);

  if (context === undefined) {
    throw new Error("useShop must be used within ShopContext");
  }

  return context;
}


export default TodoListProvider;