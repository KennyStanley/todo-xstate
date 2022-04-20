import { createMachine, assign } from 'xstate'

const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQA2quEZUaGsAxBuRWQG6oDWlTLHiJlKNOg0GwE3VPlwAXYqlIBtAAwBdRKAAOqWMSUqdIAB6IAjAHYKAVgAs1gJzO7zh5YBs1gEzW7XwAaEABPRGcADgpIgGYHL19IyOt1L1i3ZwBfLJDBHAISDnF6UkZ0AxYwACdq1GqKXSpFADN6gFsKfOEisVpS8uYZUh55YzUtU31DcdMLBEtnCnUHSPVLSwc3dVjY9TsQ8IXIywprbzj1k8tIuztrHNyQUnQ4U27C0Wp+yQr4JBA0yMylIc0QAFpfN4KF4Ur47JFYX4EdZDlZLOp7M5fF47jtfM5EricnkKgURBwFH8ADL9SBTAzAkwA+a+FZnNypSwIuyxawOBwHMIRXwUXYJNmxRFRW6xEkgD4UvoSMpSABiuGIVHpAKBsxZiDZdnsONi3gCXmc6msuLRCwCFChsK86mc1lilthDnlit6DJmILBCEhDkxSPhiLhKLtizF8USBPUaUS2MeWSAA */
  createMachine(
    {
      tsTypes: {} as import('./todoMachine.typegen').Typegen0,
      schema: {
        services: {} as {
          loadTodos: { data: string[] }
        },
      },
      context: {
        todos: [] as string[],
        errorMessage: undefined as undefined | string,
      },
      id: 'Todo Machine',
      initial: 'loadingTodos',
      states: {
        loadingTodos: {
          invoke: {
            src: 'loadTodos',
            onDone: [
              {
                target: 'todosLoaded',
                actions: 'assignTodosToContext',
              },
            ],
            onError: [
              {
                target: 'loadingTodosFailed',
                actions: 'assignErrorMessageToContext',
              },
            ],
          },
        },
        todosLoaded: {},
        loadingTodosFailed: {},
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
      },
    },
  )

export default todoMachine
