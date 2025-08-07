import CheckIcon from '../icons/CheckIcon';
import DeleteIcon from '../icons/DeleteIcon';
import { useTodoStore } from '../stores/todoStore';

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const setFocusedTodo = useTodoStore((state) => state.setFocusedTodo);
  const toggleCheckTodo = useTodoStore((state) => state.toggleCheckTodo);
  const setTodoForDeletion = useTodoStore((state) => state.setTodoForDeletion);

  const handleToggleCheck = async (todoId) => {
    toggleCheckTodo(todoId); // optimistic update
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: !todos.find((todo) => todo.id === todoId).completed,
          }),
        }
      );
      const data = await res.json();
      console.log('Todo updated:', data);
    } catch (error) {
      toggleCheckTodo(todoId); // failed optimistic update
      console.error('Error updating todo:', error);
    }
  };

  return (
    <ul className=" flex flex-col gap-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={
            'flex gap-6 justify-between items-stretch px-4 border rounded-lg transition-colors duration-300 ease-in-out' +
            (todo.completed ? ' bg-[#d0ffe0]' : '')
          }
        >
          <button
            onClick={() => setFocusedTodo(todo.id)}
            className="text-left w-full truncate py-4"
          >
            {todo.id}. {todo.title}
          </button>
          <div className="flex items-center gap-4">
            <button
              className="flex items-center justify-center flex-none  h-full"
              onClick={() => handleToggleCheck(todo.id)}
            >
              <CheckIcon className="h-full w-8" checked={todo.completed} />
            </button>
            <button
              className="flex items-center justify-center flex-none  h-full"
              onClick={() => setTodoForDeletion(todo.id)}
            >
              <DeleteIcon className="h-full w-8" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
