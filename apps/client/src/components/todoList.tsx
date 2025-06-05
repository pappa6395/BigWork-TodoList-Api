import { useEffect, useState } from 'react'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todos'
import toast from 'react-hot-toast'
import { Pencil, Trash2 } from 'lucide-react'

type ApiResponse<T> = {
  status: 'success' | 'error';
  error: string | null;
  data: T;
};

type Todo = {
  id: number;
  name: string;
  date_start: string;
  finished: boolean;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [form, setForm] = useState({ name: '', date_start: '' })
  const [editId, setEditId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getTodos().then(res => {
      setLoading(false)
      if (res.status === 'success') {
        setTodos(res.data)
      } else {
        toast.error('Failed to fetch todos')
      }
    })
  }, [])

  const handleSubmit = async () => {
    if (!form.name || !form.date_start) {
      toast.error('Please fill all fields')
      return
    }

    setLoading(true)
    try {
      let res: ApiResponse<Todo>;
      if (editId !== null) {
        res = await updateTodo(editId, form)
        if (res.status === 'success') {
          setTodos(prev => prev.map(t => (t.id === editId ? res.data : t)))
          toast.success('Todo updated')
        }
      } else {
        res = await createTodo(form)
        if (res.status === 'success') {
          setTodos(prev => [...prev, res.data])
          toast.success('Todo created')
        }
      }
      setForm({ name: '', date_start: '' })
      setEditId(null)
    } catch (e) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = (id: number) => {
  setTodos(prev =>
    prev.map(todo =>
      todo.id === id ? { ...todo, finished: !todo.finished } : todo
    )
  );
};


  const handleEdit = (todo: Todo) => {
    setForm({ name: todo.name, date_start: todo.date_start })
    setEditId(todo.id)
  }

  const handleDelete = async (id: number) => {
    const res = await deleteTodo(id)
    if (res.status === 'success') {
      setTodos(prev => prev.filter(t => t.id !== id))
      toast.success('Todo deleted')
    } else {
      toast.error('Delete failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-blue-600">📋 My Todo List</h1>

        <div className="flex gap-3 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="What do you need to do?"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="date"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            value={form.date_start}
            onChange={e => setForm({ ...form, date_start: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            {editId !== null ? 'Update' : 'Add'}
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : todos.length === 0 ? (
          <div className="text-center text-gray-500">No todos yet.</div>
        ) : (
          <ul className="space-y-4">
            {todos.map(todo => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-gray-50 border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="font-medium text-lg">{todo.name}</p>
                  <p className="text-sm text-gray-500">Start: {todo.date_start}</p>
                  <p className="text-sm text-gray-500">Status: {todo.finished ? '✅ Done' : '❌ Pending'}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleStatus(todo.id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    {todo.finished ? "Undo" : "Done"}
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-blue-100"
                    title="Edit"
                    onClick={() => handleEdit(todo)}
                  >
                    <Pencil size={18} className="text-blue-600" />
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-red-100"
                    title="Delete"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
