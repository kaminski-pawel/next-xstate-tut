// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    assignTodosToContext: "done.invoke.Todos Machine.Loading Todos:invocation[0]";
    assignErrorToContext:
      | "error.platform.Todos Machine.Loading Todos:invocation[0]"
      | "error.platform.Todos Machine.Creating new todo.Saving todo:invocation[0]";
    assignFormInputToContext: "Form input changed";
  };
  internalEvents: {
    "done.invoke.Todos Machine.Loading Todos:invocation[0]": {
      type: "done.invoke.Todos Machine.Loading Todos:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Todos Machine.Loading Todos:invocation[0]": {
      type: "error.platform.Todos Machine.Loading Todos:invocation[0]";
      data: unknown;
    };
    "error.platform.Todos Machine.Creating new todo.Saving todo:invocation[0]": {
      type: "error.platform.Todos Machine.Creating new todo.Saving todo:invocation[0]";
      data: unknown;
    };
    "done.invoke.Todos Machine.Creating new todo.Saving todo:invocation[0]": {
      type: "done.invoke.Todos Machine.Creating new todo.Saving todo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadTodos: "done.invoke.Todos Machine.Loading Todos:invocation[0]";
    saveTodo: "done.invoke.Todos Machine.Creating new todo.Saving todo:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "loadTodos" | "saveTodo";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    loadTodos: "done.invoke.Todos Machine.Creating new todo.Saving todo:invocation[0]";
    saveTodo: "Submit";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "Loading Todos"
    | "Todos Loaded"
    | "Loading Todos errorerd"
    | "Creating new todo"
    | "Creating new todo.Showing form input"
    | "Creating new todo.Saving todo"
    | { "Creating new todo"?: "Showing form input" | "Saving todo" };
  tags: never;
}
