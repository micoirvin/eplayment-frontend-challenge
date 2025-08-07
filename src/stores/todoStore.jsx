import { create } from 'zustand';
export const useTodoStore = create((set) => ({
  todos: [],
  focusedTodo: null,
  setTodos: (todoList) => set((state) => ({ todos: todoList })),
  addTodo: (todoItem) =>
    set((state) => ({ todos: [...state.todos, todoItem] })),
  removeTodo: (todoItemId) =>
    set((state) => ({
      todos: state.todos.filter((item) => item.id !== todoItemId),
    })),
  setFocusedTodo: (todoItemId) =>
    set((state) => ({
      focusedTodo:
        todoItemId !== null
          ? state.todos.find((item) => item.id === todoItemId)
          : null,
    })),
  toggleCheckTodo: (todoItemId) =>
    set((state) => ({
      todos: state.todos.map((item) =>
        item.id === todoItemId ? { ...item, completed: !item.completed } : item
      ),
    })),
  todoForDeletion: null,
  setTodoForDeletion: (todoItemId) =>
    set((state) => ({
      todoForDeletion: todoItemId
        ? state.todos.find((item) => item.id === todoItemId)
        : null,
    })),
}));
