import { createMachine, assign } from 'xstate'

const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQA2quEZUaGsAxBuRWQG6oDWlTLHiJlKNOg0GwE3VPlwAXYqlIBtAAwBdRKAAOqWMSUqdIAB6IAzABYAjBXUAOAOwvb6gJzWAbM9vWAGhAAT0R3Rwpbb2iAVmtHG3UnD1sAX1SgwRwCEg5xelJGdAMWMAAnMtQyil0qRQAzKoBbCizhXLFaAqLmGVIeeWM1LVN9QyHTCwQAWlsAJnUHZ2cPSzmY9W91ZdtLINCES08KSw8562c5lccPFet0zOLskQ4FYtgAGS7IFgBBABF-gB9ZAAeX+oNGBiMylIk0Q3jmEQ26iOSOsMQ83kc3n2iDm0QoHjOGI8MVsMUcMRicweIDaOVEFHwZTAigYADkwAB3QQUWCEVDchgAMWaAElSLoAK4KFgi0EAJWwQPFHIACgBVZBAgDCAAlfhyAOIAUX+UPGsPhCGcTkiiPWu28lldXjxCGs1ksFBuqOiF2sZOx3jpDJelBZbKUhS5vOK-MFwsKYrKTUlMrlAGVNQAhbDi5CWmEmJDmRDxbwnXw+I62MlYyy4kKITERRGU3zUxHzRxhp7tJlR9mxnl82C4LiSYpsFSUWT8VoDxkcYcxqBx8eT6cYPoDdkqDTaMtjEtwstTBYRdTnBZzSyOG737Ye7xRIn3h-OV0rdxpDL0suEbMqyI4bmOCYTlOhSCKUFRVDUdQKI0aZLhgzwdCB0achBGD8tuMHFHucgHsMx56NCEwXogzjWIsOIxJYrj+IxLjNgcb5VmcrouD+KQ3ukAGkOgcCmOGmH5DuBjFlRoBTNYcwemSFDRNElwxJc5xeP26GDq87xfHQkAyda1EIFscyRMGtgrDxlK2B68z2FE0RzFi37xJ4-6PLpK6dBIhHMCKuDEFQxknpRplyYgszbBQ5JxExIbeDSPgevEllIt48QrNlZzkjpQh+VhYGbpBSaihKUqyiZpbRZ6RyRHRNxYgpXiIoELaejEVZ+g+ZyIt4xJeoVGFDqB65lXhUFSbV571d6XGOD4NK2I+-qKV1dr2DiuzLWcFLes4o16ZGE04fGGBzTadFVv4yStW5PjnB6TH0R4G38TiAkAeJojXWZsxekstnrJs2x+HsXVzJZqnRB9TgUgSfaCUAA */
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
                    target: '#Todo Machine.loadingTodos',
                    actions: 'clearFormInput',
                  },
                ],
                onError: [
                  {
                    target: 'showingFormInput',
                    actions: 'assignErrorMessageToContext',
                  },
                ],
              },
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
