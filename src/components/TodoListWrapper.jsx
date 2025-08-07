import useSWR from 'swr';
import { useTodoStore } from '../stores/todoStore';
import { useEffect, useState } from 'react';
import TodoList from './TodoList';

export default function TodoListWrapper() {
  const setTodos = useTodoStore((state) => state.setTodos);
  const todos = useTodoStore((state) => state.todos);
  const fetchLimit = 5;
  const [fetchStart, setFetchStart] = useState(0);

  const fetcher = (url) =>
    fetch(url).then((res) => {
      console.log('fetching', url);
      return res.json();
    });

  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/todos?_start=${fetchStart}&_limit=${fetchLimit}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setTodos([...todos, ...data]);
    }
  }, [data]);

  const handleLoadMore = () => {
    setFetchStart((prev) => prev + fetchLimit);
  };

  return (
    <>
      <TodoList />
      <footer className="p-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Failed to load</div>
        ) : (
          <button className="underline" onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </footer>
    </>
  );
}
