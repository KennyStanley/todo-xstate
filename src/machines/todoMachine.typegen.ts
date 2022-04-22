// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  eventsCausingActions: {
    assignTodosToContext: 'done.invoke.Todo Machine.loadingTodos:invocation[0]'
    assignErrorMessageToContext:
      | 'error.platform.Todo Machine.loadingTodos:invocation[0]'
      | 'error.platform.Todo Machine.creatingNewTodo.savingTodo:invocation[0]'
      | 'error.platform.Todo Machine.deletingTodo:invocation[0]'
    assignFormInputToContext: 'FORM_INPUT_CHANGED'
    clearFormInput: 'done.invoke.Todo Machine.creatingNewTodo.savingTodo:invocation[0]'
  }
  internalEvents: {
    'done.invoke.Todo Machine.loadingTodos:invocation[0]': {
      type: 'done.invoke.Todo Machine.loadingTodos:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'error.platform.Todo Machine.loadingTodos:invocation[0]': {
      type: 'error.platform.Todo Machine.loadingTodos:invocation[0]'
      data: unknown
    }
    'error.platform.Todo Machine.creatingNewTodo.savingTodo:invocation[0]': {
      type: 'error.platform.Todo Machine.creatingNewTodo.savingTodo:invocation[0]'
      data: unknown
    }
    'error.platform.Todo Machine.deletingTodo:invocation[0]': {
      type: 'error.platform.Todo Machine.deletingTodo:invocation[0]'
      data: unknown
    }
    'done.invoke.Todo Machine.creatingNewTodo.savingTodo:invocation[0]': {
      type: 'done.invoke.Todo Machine.creatingNewTodo.savingTodo:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.Todo Machine.deletingTodo:invocation[0]': {
      type: 'done.invoke.Todo Machine.deletingTodo:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'xstate.init': { type: 'xstate.init' }
  }
  invokeSrcNameMap: {
    loadTodos: 'done.invoke.Todo Machine.loadingTodos:invocation[0]'
    saveTodo: 'done.invoke.Todo Machine.creatingNewTodo.savingTodo:invocation[0]'
    deleteTodo: 'done.invoke.Todo Machine.deletingTodo:invocation[0]'
  }
  missingImplementations: {
    actions: never
    services: 'loadTodos' | 'deleteTodo' | 'saveTodo'
    guards: never
    delays: never
  }
  eventsCausingServices: {
    loadTodos:
      | 'done.invoke.Todo Machine.creatingNewTodo.savingTodo:invocation[0]'
      | 'done.invoke.Todo Machine.deletingTodo:invocation[0]'
    deleteTodo: 'DELETE_TODO'
    saveTodo: 'SUBMIT'
  }
  eventsCausingGuards: {
    hasTodos: 'done.invoke.Todo Machine.loadingTodos:invocation[0]'
  }
  eventsCausingDelays: {}
  matchesStates:
    | 'loadingTodos'
    | 'todosLoaded'
    | 'loadingTodosFailed'
    | 'creatingNewTodo'
    | 'creatingNewTodo.showingFormInput'
    | 'creatingNewTodo.savingTodo'
    | 'deletingTodo'
    | 'deletingTodoFailed'
    | { creatingNewTodo?: 'showingFormInput' | 'savingTodo' }
  tags: never
}
