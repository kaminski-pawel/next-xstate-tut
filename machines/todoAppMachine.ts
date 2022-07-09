import { assign, createMachine } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FWwAQFkCGAxgBYCWAdmAHQAyqeE5UWaGsAxBhZeQG6oDWVFplyFSXWvUbN0mBL1QE8AFxKoyAbQAMAXUSgADphKr1+kAA9EAVgDslAEzWAnHYCMAZgAsXtw60AbG4ANCAAnogAtB4OHpRa1l7+Wp7OtgkOAL6ZocLY+MTkVJIMZEx5bGAATlWoVZQGADYqAGZ1ALaUeaKFEnSl5bKw8mR8SqaauuZGsCZqZOZWCJEOttaUAbZuWqteMQ5eAQAcoRHLbr6U22leR0m2voEB2blDPeJCbyWQbADCVWAVGAsBQAO7TYwTRaIZwBSjOI7bY5aI7+Y7WDynKLbLRXDweI5bWxpTwBGIvEDdAofSj-QGqMogsCgrDKWSUADKRFQoOkbSq7Sw5AMAFdlGwAGIdIVkUXKLDEPBlSAQ2ZQpCWKIOI5xA5eaxuVGxaxHI6bLEIJxwi4BHzE1ywlwUqliIq0gEqaRg1nsrk8vnS4VitgckUAI3aJlVczMGqWKwclC8OwOtlNBq8aZNFrctjizgczg8CO2-mc92db2pbrpnsZ3rZGE5eB40kbqEqNTqDWayn5nRdvSotYZTAbvpbbdkIzGnvU2j0GpmMYWcaiiSTa08th3ARRAQcAQtHh2jiShp1zivsOc2RyIDI6Dg5kHNJK0jy0fVoHjDiclBiNxnECTxViAjELWiLQvEoawD2AwIUj2QlK1Yd43W6b4IC-eZoQQNw3CTaDbH8Jw-GsFJbCPcJsXLeJkwCFwkhTQ1nnvV83XfRlumqWoASqbCl0hXC12WbV1kNBEdQuXwSMxGixKOWCLlNfxDgxQk2NeNDqy4EcvWZH0mz9XlGX7GU5Rw2Mfy1EiALg6xHOJdI83ks5PBgrR0kCI5rG1BEMVQkRdOHD1RyZFl22bVtGXbKzVxshBYXhAi91NDwLlWHUc0uAtyxxKTYRRIL8ldPSwoMyLZHivCoPsPUDSNDwTTNWwLSCeJvLzJJDnxAItMpKsyrAGrROiDKz31Q0-2a01zQU6JkoSXxXD1BJjjvTIgA */
  createMachine(
    {
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
        createNewTodoFormInput: "",
      },
      tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
      schema: {
        // events: {} as
        //   | { type: "Todos loaded"; todos: string[] }
        //   | { type: "Loading todos failed"; errorMessage: string },
        services: {} as {
          loadTodos: {
            data: string[];
          };
          saveTodo: {
            data: void;
          };
        },
        events: {} as
          | { type: "Create new" }
          | { type: "Form input changed"; value: string }
          | { type: "Submit" },
      },
      id: "Todos Machine",
      initial: "Loading Todos",
      states: {
        "Loading Todos": {
          invoke: {
            src: "loadTodos",
            onDone: [
              {
                actions: "assignTodosToContext",
                target: "Todos Loaded",
              },
            ],
            onError: [
              {
                actions: "assignErrorToContext",
                target: "Loading Todos errorerd",
              },
            ],
          },
        },
        "Todos Loaded": {
          on: {
            "Create new": {
              target: "Creating new todo",
            },
          },
        },
        "Loading Todos errorerd": {},
        "Creating new todo": {
          initial: "Showing form input",
          states: {
            "Showing form input": {
              on: {
                "Form input changed": {
                  actions: "assignFormInputToContext",
                },
                Submit: {
                  target: "Saving todo",
                },
              },
            },
            "Saving todo": {
              invoke: {
                src: "saveTodo",
                onError: [
                  {
                    target: "Showing form input",
                    actions: "assignErrorToContext",
                  },
                ],
                onDone: [{ target: "#Todos Machine.Loading Todos" }],
              },
            },
          },
        },
      },
    },
    {
      actions: {
        //     consoleLogTodos: (context, event) => {
        //       alert(JSON.stringify(event.todos));
        //     },
        assignTodosToContext: assign((context, event) => {
          return { todos: event.data };
        }),
        assignErrorToContext: assign((context, event) => {
          return { errorMessage: (event.data as Error).message };
        }),
        assignFormInputToContext: assign((context, event) => {
          return { createNewTodoFormInput: event.value };
        }),
      },
    }
  );
// https://www.youtube.com/watch?v=IkLa12f_RRU
// https://www.youtube.com/watch?v=2eurRx-tR-I
