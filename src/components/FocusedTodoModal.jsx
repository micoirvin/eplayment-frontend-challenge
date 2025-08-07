import { useTodoStore } from '../stores/todoStore';
import CheckIcon from '../icons/CheckIcon';
import DeleteIcon from '../icons/DeleteIcon';
import { useEffect, useState } from 'react';
import fetchUserInfo from '../utils/fetchUserInfo';
import GenericModal from './GenericModal';

export default function FocusedTodoModal() {
  const focusedTodo = useTodoStore((state) => state.focusedTodo);
  const setFocusedTodo = useTodoStore((state) => state.setFocusedTodo);
  const toggleCheckTodo = useTodoStore((state) => state.toggleCheckTodo);
  const setTodoForDeletion = useTodoStore((state) => state.setTodoForDeletion);
  const [completed, setCompleted] = useState(focusedTodo?.completed || false);

  const handleToggleCheck = () => {
    toggleCheckTodo(focusedTodo.id);
    setCompleted(!completed);
  };

  const handleClickDelete = () => {
    setTodoForDeletion(focusedTodo.id);
    setFocusedTodo(null);
  };

  const userData = fetchUserInfo(focusedTodo?.userId);

  useEffect(() => {
    if (!focusedTodo) return;
    setCompleted(focusedTodo.completed);
  }, [focusedTodo]);

  if (!focusedTodo) return null;
  return (
    <GenericModal setCondition={setFocusedTodo} condition={focusedTodo}>
      <div className="modal-content">
        <article>
          <header>
            <h2 className="font-bold text-lg mb-4">
              <span className="font-normal">Task: </span>
              {focusedTodo.title}
            </h2>
          </header>
          <div className="mb-6">
            <div>Task details</div>
            <p className="ml-4">
              User:{' '}
              {userData.isLoading
                ? 'Loading user info...'
                : userData.error
                ? 'Error fetching user info'
                : userData.data
                ? userData.data.name
                : 'User info unavailable'}
            </p>
            <p className="ml-4">Completed: {completed ? 'yes' : 'no'}</p>
            <p className="ml-4">Task ID: {focusedTodo.id}</p>
          </div>
          <footer>
            <div className="flex items-center gap-4">
              <button
                className="flex items-center justify-center flex-none  h-full"
                onClick={handleToggleCheck}
              >
                <CheckIcon className="h-full w-8" checked={completed} />
              </button>
              <button
                className="flex items-center justify-center flex-none  h-full"
                onClick={handleClickDelete}
              >
                <DeleteIcon className="h-full w-8" />
              </button>
            </div>
          </footer>
        </article>
      </div>
    </GenericModal>
  );
}
