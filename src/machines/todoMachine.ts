import { createMachine, assign } from 'xstate'

const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQA2quEZUaGsAxBuRWQG6oDWlTLHiJlKNOg0GwE3VPlwAXYqlIBtAAwBdRKAAOqWMSUqdIAB6IATAE4AjBQCsAZluWAbAHYAHJfUAWLyc3ABoQAE9EQI8KdVj1X38vfz8AXxTQwRwCEg5xelJGdAMWMAAnUtRSil0qRQAzSoBbCkzhHLFafMLmGVIeeWM1LVN9Q0HTCwQndXtnV08fRKDQiIQHBy8Ka23tjz3LPydrBzSMoqyRDgUi2AAZTsgWAEEAEReAfWQAeRevkYMjMpSBNEJ5ol4PA4ZgcPIcnF4HCtIm4nBRAk4nH5rH4-G54uoTukQK1sqIKNdmPc6I8XgBRW605C0z4-P5IECjQEmdmTByWJEIawHGJxBIBZKnYnnNpk-ClMCKBgAOTAAHdBBRYIRUKqGAAxJoASVIugArgoWHqvgAlbDvQ1KgAKAFVkO8AMIACSeSoA4rSXv8xkCQQgvH51BRvNYZh5sRC7LYBQm0RinHzbLYY9YXJKSZdKHKFUoCir1UVNdrdQUDaVGsazRaAMrOgBC2ENyCDXOBPMQtnUbk2lkxmL8HgJtj2XgF1ghFDci6HDls6z8tgReelpI4RcVpbVGtguC4kiKbBUlFk-Ba24LFD3JagZaPJ7PGF6-UVKg02nZnPGPsphmRwXHcbxfACdNEXCUE5xFWIxSSHEtwwC52gfeV92fQ8K2PU8CkEEpykqapagUBo61vNCZV3LCnxfPC30IopPzkb8hj-PQAUA0BJgHIcKBHQ4cQnFdp1nWIFyXBFVwcddNyJfMMIgMAqDAJ8iPYK8+j4AQ7xUtSNPfVA2IGIFf27XjzCsDxUUOWEN3iBw9nWAUp2iHZdm2FdjjcVChB3ShVPUzTzzKCoqhqeommowL7xC4yWI-WRzJ-YZ-x4kMgMsOyKAchTnNcmDVhjLYvLjY4swcfylIMslErCjA9VwYh1IgFgm0dWkA3eZ1HSs7K+MQIVUWsOycxzA4vCnEJYIQAI-BiGwZpHFcCX8QkzhooKKEakyWrax4zFgBRFEoXA6gUMoAApLChdQAEoWGUhqjKa1BDvawbuWGhBYWsISPFXQd1BzYHDgFRblrnVx0wHKE-EJIlSHQOBTFe3JOhM+BMuDX6bP+jwBRc1F7riNxXBcuxLAC9CyQpAwqVUiAft7P6sWiGr7ssWx4SRpInGTFzUwxdYYwcbENjp2iOgkZKDC+yA2dDNchLcGq-EsRYoOJ+aXMsRxRWxdQnDjbwZd2x9lVwjBKx1fUjRNc0VaA8MHEcbwwfHSc9msWdgdF9NeazMGnFpuqdvva2D3LO38JM12-r53wtiHYHxt97xZwjCg03THEqpcjxLej+ibbj1Ak8Jma3CjLwYyneM40zZNByD4GPF5tx7tsUvDNCxO8Z7UMtfcgkhKxbyqr8-u3sHhWldZ4frMmYHUT5rwhzseFJYxcexq8wccQOSm+8j+L2mr-iZ3mqdyp2Hwm5XFFkZSIA */
  createMachine(
    {
      context: {
        todos: [] as string[],
        errorMessage: undefined as undefined | string,
        createNewTodoFormInput: '' as string,
      },
      tsTypes: {} as import('./todoMachine.typegen').Typegen0,
      schema: {
        services: {} as {
          loadTodos: { data: string[] }
          saveTodo: { data: void }
          deleteTodo: { data: void }
        },
        events: {} as
          | {
              type: 'ADD_TODO'
            }
          | {
              type: 'FORM_INPUT_CHANGED'
              value: string
            }
          | {
              type: 'SUBMIT'
            }
          | {
              type: 'DELETE_TODO'
              todo: string
            }
          | {
              type: 'SPEED_UP'
            },
      },
      id: 'Todo Machine',
      initial: 'loadingTodos',
      states: {
        loadingTodos: {
          invoke: {
            src: 'loadTodos',
            onDone: [
              {
                actions: 'assignTodosToContext',
                target: 'todosLoaded',
              },
            ],
            onError: [
              {
                actions: 'assignErrorMessageToContext',
                target: 'loadingTodosFailed',
              },
            ],
          },
        },
        todosLoaded: {
          on: {
            ADD_TODO: {
              target: 'creatingNewTodo',
            },
            DELETE_TODO: {
              target: 'deletingTodo',
            },
          },
        },
        loadingTodosFailed: {},
        creatingNewTodo: {
          initial: 'showingFormInput',
          states: {
            showingFormInput: {
              on: {
                FORM_INPUT_CHANGED: {
                  actions: 'assignFormInputToContext',
                },
                SUBMIT: {
                  target: 'savingTodo',
                },
              },
            },
            savingTodo: {
              invoke: {
                src: 'saveTodo',
                onDone: [
                  {
                    actions: 'clearFormInput',
                    target: '#Todo Machine.loadingTodos',
                  },
                ],
                onError: [
                  {
                    actions: 'assignErrorMessageToContext',
                    target: 'showingFormInput',
                  },
                ],
              },
            },
          },
        },
        deletingTodo: {
          invoke: {
            src: 'deleteTodo',
            onDone: [
              {
                target: 'loadingTodos',
              },
            ],
            onError: [
              {
                actions: 'assignErrorMessageToContext',
                target: 'deletingTodoFailed',
              },
            ],
          },
        },
        deletingTodoFailed: {
          after: {
            '2500': {
              target: 'todosLoaded',
            },
          },
          on: {
            SPEED_UP: {
              target: 'todosLoaded',
            },
          },
        },
      },
    },
    {
      actions: {
        assignTodosToContext: assign((context, event) => {
          return {
            todos: event.data,
          }
        }),
        assignErrorMessageToContext: assign((context, event) => {
          return {
            errorMessage: (event.data as Error).message,
          }
        }),
        assignFormInputToContext: assign((context, event) => {
          return {
            createNewTodoFormInput: event.value,
          }
        }),
        clearFormInput: assign((context, event) => {
          return {
            createNewTodoFormInput: '',
          }
        }),
      },
    },
  )

export default todoMachine
