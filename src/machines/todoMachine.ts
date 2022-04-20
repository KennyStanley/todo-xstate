import { createMachine } from 'xstate'

const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQA2quEZUaGsAxMgPIAi7AypgDLsAgpwCinRKAAOqWMQAuxVKUkgAHogBMAVk0UADAE4AHADZtAFgCMN7Vc2HDAGhABPRIYDsFC48efjT09TGwBmUwBfCJcmLDwiMkoaOgZY1kERAEkAOQBxTA5uPgAxIUz+cVUZOUVlVQ0ETU0rClNjC21AhxCLUyaXdwQrQ20KbVDtSytjHUngqJj0OIIScmpaelJGJdhi3GIqSBYAJVFkY4BNAWFOAq5eKtkFJRUkdUQrUNbjT9DrDps+lC7QGHxGYwmujsVm0+k0QSi0RApHQcFUsRwK0S6xSWzSjxqL3qiAsmlBCEMLX01Op8MMoX07SskSRGPiq0o8h2-A2kAJzzqbwaFl8Pj6I082lMQIskvJlIMNLhnnpjOsLMWGExCTWyU222YewOfLe1QFr1ADWGen0ktCzPtmn0U3JDi+ttCI00IuBITMCxAbKx5H5tQt7wQAForPoKPazOZjJZjMZDCFTOTpoiIkA */
  createMachine(
    {
      id: 'Todo Machine',
      initial: 'loadingTodos',
      schema: {
        events: {} as
          | { type: 'TODOS LOADED'; todos: string[] }
          | { type: 'LOADING TODOS FAILED'; errorMessage: string }
          | { type: 'RETRY LOAD TODOS' }
          | { type: 'TODO ADDED' }
          | { type: 'TODO REMOVED' },
      },
      tsTypes: {} as import('./todoMachine.typegen').Typegen0,
      states: {
        loadingTodos: {
          on: {
            'TODOS LOADED': {
              target: 'todosLoaded',
              actions: 'consoleLogTodos',
            },
            'LOADING TODOS FAILED': {
              target: 'loadingTodosFailed',
            },
          },
        },
        todosLoaded: {},
        loadingTodosFailed: {
          on: {
            'RETRY LOAD TODOS': {
              target: 'loadingTodos',
            },
          },
        },
      },
    },
    {
      actions: {
        consoleLogTodos: (context, event) => {
          alert(JSON.stringify(event.todos))
        },
      },
    },
  )

export default todoMachine
