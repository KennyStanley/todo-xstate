import { createMachine, assign } from 'xstate'

const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQA2quEZUaGsAxBuRWQG6oDWlTLHiJlKNOg0GwE3VPlwAXYqlIBtAAwBdRKAAOqWMSUqdIAB6IAjAE51FAKwAmRwBYAbNYAcLgOw+Xlp4AzAA0IACeiNaW9g5uroG+lo6ePm4AvulhgjgEJBzi9KSM6AYsYABOFagVFLpUigBmNQC2FDnC+WK0RSXMMqQ88sZqWqb6hiOmFghB6pYOQcluPp6O6i7BbmGRCPb2nhTWx8d+Pq5B1vaZ2aW5IhwKpbAAMj2QLACCACLfAPrIADy30B4wMRmUpGmiBWPgoqXs81c-iCQU89h2iE8biC8NRQRc1hc7nU62uWRAHTyogoT2YbzoH2+AFEXszkMyAcDQUgQBMISZeTN7LjUuoRUFHFcfNEnJiEGk4Z5LBtPF5CS4nBkKVSHpR8BUwIoGAA5MAAd0EFFghFQ5oYADFWgBJUi6ACuChYDsBACVsH9nSaAAoAVWQfwAwgAJT4mgDizO+YMmkOhCG8dlWtksMs2MsslnlqWseNRTkLtmsSxulLunRpBqNSmKZstpWttvtxSdFRaro9XoAyqGAELYZ3IFMCqFCqzqNyHRwEgm+cW51byrxwty7xf2GL2ALo2u6roUJvG1sWq2wXBcSSlNgqSiyfjtevUjiXltQNu3+9HwwAYhmNFQNG0Xl+SmOdZnmRZllWdZNiCfZ5Q8Q51Cw0ksM2DYXFPT89QvQ0rz-G8OzvB9ikEcoqhqOoGgUZo+w-DB7nPH9TQojBrUAmjShAuQwNGSC9HBGDQBmFVFwoZcXFXHx1z8Twtywig933Q9j3JW52IbDgIDAKgwF-Wj2FfQY+AEIjzyMkyzME2RhkhCDp0k8xEEcHxcQU-xAlJew-DQiIrD8I4TmsGUrhsextT0oQv0oezTKA1A6OqWp6iaVo2MS4iUsc4DnJEtyoIktNYO83ygn8zxAuCjFQoQWwIpOaKDyueK630pKKEKtKHVwYgTIgFgh2DZkkz+UNg3cyqpKiZcjh86tq1cZU0nlTYXAoUkvGSVCVURTVCN6grjNSgSMCGkaPjMWAFEUShcEaBRKgACkcRF1AAShYM8aQG67UFu0b5sFRaFUJOSfBiBd1GrOGFO27w9qlZVlwPcUNnJClSHQOBTEBgoejS+BytTSHPIVHx5SC3FvuwtxkiC6JHDO-LzzpAwGSMiAIdnKGnDsIljx8A4bH8+UCwoFwpXly5xQJOHOY4mlCnJsHIEF9N9l2xw3Di+W1lVWr6fOBxsIV9Raqizw1YM-VSN-f9KK7R0XTdT1ddg7xYiC+qiSUg8-GsLc4bLVDHErRHJUdvquOvdteKotLfahyxJVFxc4ai5TN2aok7HxVDiRioKfAT4ik-IlPUAzmnlTcChs3mPMS0LYsFyjuHzkseID2ruzLqKhvKZndN5flY65MJU5jk6uLh6B0fBuG8GJ48mY4dxLPsTVff7GrUJmpVXFItsNxiVcFnLBX8hG+k1Sz7hS+1lzGKcTx9IgA */
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
                cond: 'hasTodos',
                target: 'todosLoaded',
              },
              {
                target: 'creatingNewTodo',
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
      guards: {
        hasTodos: (context, event) => event.data.length > 0,
      },
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
