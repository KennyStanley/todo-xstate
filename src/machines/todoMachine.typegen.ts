// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  eventsCausingActions: {
    assignTodosToContext: 'done.invoke.Todo Machine.loadingTodos:invocation[0]'
    assignErrorMessageToContext: 'error.platform.Todo Machine.loadingTodos:invocation[0]'
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
    'xstate.init': { type: 'xstate.init' }
  }
  invokeSrcNameMap: {
    loadTodos: 'done.invoke.Todo Machine.loadingTodos:invocation[0]'
  }
  missingImplementations: {
    actions: never
    services: 'loadTodos'
    guards: never
    delays: never
  }
  eventsCausingServices: {
    loadTodos: 'xstate.init'
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: 'loadingTodos' | 'todosLoaded' | 'loadingTodosFailed'
  tags: never
}
