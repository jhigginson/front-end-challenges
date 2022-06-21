export const initialState = {
  todos: [],
  filterBy: 'All'
}

const todoListReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "INIT_TODOS":
      // console.log("INIT_TODOS", payload);

      return{ ...state, todos: payload.todos};
    case "NEW_TODO":
      // console.log("NEW_TODO", payload);

      return { ...state, todos: payload.todos };
    case "TOGGLE_CHECKED":
      // console.log("TOGGLE_CHECKED", payload);
      
      return { ...state, todos: payload.todos };
    case "DELETE":
      // console.log("DELETE", payload);

      return { ...state, todos: payload.todos };
    case "CLEAR":
      // console.log("CLEAR", payload);

      return { ...state, todos: payload.todos };
    case "FILTER":
      // console.log("FILTER", payload);

      return { todos: payload.todos, filterBy: payload.filterBy };
    case "REORDER":
      // console.log("REORDER", payload);

      return { todos: payload.todos };
    default:
      throw new Error(`No case for type ${type} found in todoListReducer.`);
  }
}

export default todoListReducer;