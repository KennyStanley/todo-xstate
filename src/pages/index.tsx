import Header from '@/components/Header'
import Content from '@/components/Content'
import { useMachine } from '@xstate/react'
import todoMachine from '@/machines/todoMachine'

const todos = new Set<string>(['Take out trash', 'Walk the dog'])

export default function Home() {
  const [state, send] = useMachine(todoMachine, {
    services: {
      loadTodos: async () => {
        // throw new Error('Oh noooo!')
        return Array.from(todos)
      },
      saveTodo: async (context, event) => {
        todos.add(context.createNewTodoFormInput)
      },
      deleteTodo: async (context, event) => {
        todos.delete(event.todo)
      },
    },
  })
  return (
    <>
      <main data-testid="index">
        <div className="h-screen flex flex-col justify-center align-middle text-center">
          <div>
            <pre>{JSON.stringify(state.value)}</pre>
            <pre>{JSON.stringify(state.context)}</pre>
          </div>
          <div className="mx-auto w-1/4 flex flex-col gap-2">
            {state.context.todos.map((todo, index) => (
              <TodoCard
                key={index}
                todo={todo}
                deleteTodo={() => {
                  send({ type: 'DELETE_TODO', todo })
                }}
              />
            ))}
          </div>
          <div>
            {state.matches('todosLoaded') && (
              <button
                onClick={() => send('ADD_TODO')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Todo
              </button>
            )}
            {state.matches('creatingNewTodo.showingFormInput') && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  send('SUBMIT')
                }}
              >
                <input
                  onChange={(e) => send({ type: 'FORM_INPUT_CHANGED', value: e.target.value })}
                  className="border-2"
                ></input>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

const TodoCard = ({ todo, deleteTodo }: { todo: string; deleteTodo: any }) => {
  return (
    <div className="flex flex-col justify-center align-center">
      <div className="bg-slate-100 border-2 rounded-md flex justify-between pl-4 pr-2 overflow-hidden">
        {todo}
        <button onClick={deleteTodo}>
          <svg
            className="w-6 h-6"
            data-darkreader-inline-stroke=""
            fill="none"
            stroke="currentColor"
            style={{ borderInlineColor: 'currentColor' }}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
