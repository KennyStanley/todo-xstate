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
        // throw new Error('Oh noooo!')
        todos.delete(event.todo)
      },
    },
  })
  return (
    <>
      <main data-testid="index" className="bg-slate-900 text-white">
        <div className="h-screen flex flex-col justify-center align-middle text-center">
          <div className="flex w-full justify-center gap-2">
            <b>State</b>
            <pre>{JSON.stringify(state.value)}</pre>
          </div>
          <div className="flex w-full justify-center gap-2">
            <b>Context</b>
            <pre>{JSON.stringify(state.context)}</pre>
          </div>
          {state.matches('todosLoaded') && (
            <>
              <div className="mt-4 mx-auto w-1/4 flex flex-col gap-2">
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
            </>
          )}
          <div>
            {state.matches('todosLoaded') && (
              <button
                onClick={() => send('ADD_TODO')}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 mt-2 rounded-md"
              >
                Add Todo
              </button>
            )}
            {state.matches('deletingTodoFailed') && (
              <>
                <p>
                  <b>Something went wrong:</b> {state.context.errorMessage}
                </p>
                <button
                  onClick={() => send({ type: 'SPEED_UP' })}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 mt-2 rounded-md"
                >
                  Go back to list
                </button>
              </>
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
                  className="bg-slate-800 border-2 border-slate-700 rounded-md py-1 px-4 mt-2"
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
      <div className="bg-slate-800 border-2 border-slate-700 rounded-md flex justify-between pl-4 pr-2 py-1 overflow-hidden">
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
