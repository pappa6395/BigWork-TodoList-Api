export const API_URL = `${import.meta.env.VITE_API_URL}/todos`;


export async function getTodos() {
  const res = await fetch(API_URL);
  return res.json();
}

export const createTodo = async (form: { name: string, date_start: string }) => {
  return await fetch(`${API_URL}`, {
    method: 'POST',
    body: JSON.stringify(form),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
}


export async function updateTodo(id: number, data: Partial<{ name: string; date_start: string; finished: boolean }>) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTodo(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}
