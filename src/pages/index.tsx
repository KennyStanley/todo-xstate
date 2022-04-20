import Header from '@/components/Header'
import Content from '@/components/Content'
import { useMachine } from '@xstate/react'
import todoMachine from '@/machines/todoMachine'

export default function Home() {
  const [state, send] = useMachine(todoMachine, {
    services: {
      loadTodos: async () => {
        // throw new Error('Oh noooo!')
        return ['Take out trash', 'Walk the dog']
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
        </div>
      </main>
    </>
  )
}
