import Header from '@/components/Header'
import Content from '@/components/Content'
import { useMachine } from '@xstate/react'
import todoMachine from '@/machines/todoMachine'

export default function Home() {
  const [state, send] = useMachine(todoMachine)
  return (
    <>
      <main data-testid="index">
        <div className="h-screen flex flex-col justify-center align-middle text-center">
          <div>
            {JSON.stringify(state.value)}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                send({ type: 'TODOS LOADED', todos: ['Take out the trash'] })
              }}
            >
              Todos Loaded
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                send({ type: 'LOADING TODOS FAILED', errorMessage: 'Oh no!' })
              }}
            >
              Loading Todos Failed
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                send({ type: 'RETRY LOAD TODOS' })
              }}
            >
              Retry Load Todos
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
