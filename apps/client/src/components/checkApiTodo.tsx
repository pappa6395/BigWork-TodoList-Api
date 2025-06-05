import { useEffect, useState } from 'react';

export const CheckApiTodo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/todos`)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error('Error fetching todos:', err));
  }, []);

  return (
    <div className="bg-black text-green-400 p-4 rounded">
      <h2 className="text-white text-xl mb-2">GET /todos Response</h2>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(todos, null, 2)}
      </pre>
    </div>
  );
};