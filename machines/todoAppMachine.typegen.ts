// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    assignTodosToContext: "done.invoke.Todos Machine.Loading Todos:invocation[0]";
    assignErrorToContext: "error.platform.Todos Machine.Loading Todos:invocation[0]";
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
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadTodos: "done.invoke.Todos Machine.Loading Todos:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "loadTodos";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    loadTodos: "xstate.init";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "Loading Todos" | "Todos Loaded" | "Loading Todos errorerd";
  tags: never;
}
