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
