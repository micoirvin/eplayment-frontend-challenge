import { useTodoStore } from '../stores/todoStore';
import fetchUserInfo from '../utils/fetchUserInfo';
import GenericModal from './GenericModal';

export default function DeleteModal() {
  const todoForDeletion = useTodoStore((state) => state.todoForDeletion);
  const setTodoForDeletion = useTodoStore((state) => state.setTodoForDeletion);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  const handleClickDelete = () => {
    removeTodo(todoForDeletion.id);
    setTodoForDeletion(null);
  };

  const userData = fetchUserInfo(todoForDeletion?.userId);

  return (
    <GenericModal
      setCondition={setTodoForDeletion}
      condition={todoForDeletion || false}
    >
      <div className="modal-content z-20">
        <article>
          <header className="font-bold text-lg mb-4">
            Do you want to delete this task?
          </header>
          <div className="mb-6">
            <p className="mb-4">- {todoForDeletion?.title}</p>

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
            <p className="ml-4">
              Completed: {todoForDeletion?.completed ? 'yes' : 'no'}
            </p>
          </div>
          <footer className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="p-4 bg-[#ee6677] rounded min-w-40"
              onClick={handleClickDelete}
            >
              Yes, delete.
            </button>
            <button
              className="p-4 bg-[#9999aa] rounded min-w-40"
              onClick={() => setTodoForDeletion(null)}
            >
              No, keep task.
            </button>
          </footer>
        </article>
      </div>
    </GenericModal>
  );
}
