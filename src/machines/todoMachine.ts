import { createMachine, assign } from 'xstate'

const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQA2quEZUaGsAxBuRWQG6oDWlTLHiJlKNOg0GwE3VPlwAXYqlIBtAAwBdRKAAOqWMSUqdIAB6IATAE4AjBQCsAZluWAbAHYAHJfUAWLyc3ABoQAE9EQI8KdVj1X38vfz8AXxTQwRwCEg5xelJGdAMWMAAnUtRSil0qRQAzSoBbCkzhHLFafMLmGVIeeWM1LVN9Q0HTCwQndXtnV08fRKDQiIQHBy8Ka23tjz3LPydrBzSMoqyRDgUi2AAZTsgWAEEAEReAfWQAeRevkYMjMpSBNEJ5ol4PA4ZgcPIcnF4HCtIm4nBRAk4nH5rH4-G54uoTukQK1sqIKNdmPc6I8XgBRW605C0z4-P5IECjQEmdmTByWJEIawHGJxBIBZKnYnnNpk-ClMCKBgAOTAAHdBBRYIRUKqGAAxJoASVIugArgoWHqvgAlbDvQ1KgAKAFVkO8AMIACSeSoA4rSXv8xkCQQgvH51BRvNYZh5sRC7LYBQm0RinHzbLYY9YXJKSZdKHKFUoCir1UVNdrdQUDaVGsazRaAMrOgBC2ENyCDXOBPMQtnUbk2lkxmL8HgJtj2XgF1ghFDci6HDls6z8tgReelpI4RcVpbVGtguC4kiKbBUlFk-Ba24LFD3JagZaPJ7PGF6-UVKg02nZnPGPsphmRwXHcbxfACdNEXCUE5xFWIxSSHEtwwC52gfeV92fQ8K2PU8CkEEpykqapagUBo61vNCZV3LCnxfPC30IopPzkb8hj-PQAUA0BJgHIcKBHQ4cQnFdp1nWIFyXBFVwcddNyJfMMIgMAqDAJ8iPYK8+j4AQ7xUtSNPfVA2IGIFf27XjzCsDxUUOWEN3iBw9nWAUp2iHZdm2FdjjcVChB3ShVPUzTzzKCoqhqeommowL7xC4yWI-WRzJ-YZ-x4kMgMsOyKAchTnNcmDVhjLYvLjY4swcfzJVIdA4FMZSyTyEz4Ey4NuT4xA9gFFzUUsKFYjcVwXLsSwAvQskKQMKlVIgKzsu6hAsWiGrBssWx4T8DZ1CcZMXNTDF1hjBxsQ2SbaI6CRkoMPVcGIdSFo6ntQzXIS3BqvxLEWKCPD6jxLEcUVsT2uNvEuoLMOLZVcIwSsdX1I0TXNRaupssMdscbx1GxMSPOsWcPHsdF002rNcacCalIM2V6Nh8t4fwky0d7Zatt8LYh2J6x8Yk2DBQjCg03THEqpcjxIfvR8GcEVnQy8Ww3CjLwYyneM40zZNByOzEEXk7YUSlwzQpZl7rMmb73IJISsW8qq-ON0R5aAjd3M8rycRcXGvFVtI0iAA */
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
                target: 'loadingTodos',
              },
            ],
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
