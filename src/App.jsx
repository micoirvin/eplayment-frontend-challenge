import FocusedTodoModal from './components/FocusedTodoModal';
import DeleteModal from './components/DeleteModal';
import TodoListWrapper from './components/TodoListWrapper';

function App() {
  return (
    <main className="max-w-160 p-8 md:p-16 ">
      <section>
        <header>
          <h1 className="text-lg font-bold mb-8">Todo List</h1>
        </header>
        <TodoListWrapper />
      </section>
      <FocusedTodoModal />
      <DeleteModal />
    </main>
  );
}

export default App;
