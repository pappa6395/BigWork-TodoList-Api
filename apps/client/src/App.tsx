import CheckApiEndpoint from "./components/checkApiEndpoint"
import TodoList from "./components/todoList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"

function App() {

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <Tabs defaultValue="todo" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="todo">To-Do List</TabsTrigger>
          <TabsTrigger value="api">Check API</TabsTrigger>
        </TabsList>

        <TabsContent value="todo">
          <TodoList />
        </TabsContent>

        <TabsContent value="api">
          <CheckApiEndpoint />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default App
