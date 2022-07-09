import { assign, createMachine } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FWwAQFkCGAxgBYCWAdmAHQAyqeE5UWaGsAxBhZeQG6oDWVFplyFSXWvUbN0mBL1QE8AFxKoyAbQAMAXUSgADphKr1+kAA9EAJgCMANkoBWJwE4A7ABZXr+wGYne3cADgAaEABPRABaPx9KLTstJwd3J083TwBfLPDhbHxicipJBjImfLYwACdq1GrKAwAbFQAzeoBbSnzRIok6MorZWHkyPiVTTV1zI1gTNTJzKwRo2wdKP3ctYM9g4Ntrdx8nMMiYu3cE93s3H38HXaccvOHe8SFX0sg2ABEwJrAyjAM2MkyWMQcTkongO7msnhCTnh13s4SiK2s-mcWjSyVs7j8nkJ2VyIB6hXe3U+A2+AGFqmAVGAsBQAO4guZgpCWGyBSjWfbwoJaWwpJzuNEQ66UWxaHHWPyKgWuZLPMmvCnFSj0xmqcossCsrDKWSUADKRFQrOk7WqHSw5AMAFdlGwAGKdB1kZ3KLDEPDlSAc+ZmbnLVYKyiuTxEuL2LQwxOndG2YJaGVHNz2Tzxuz4tXksRanUqaRs42mi1Wm2ex0uthmp0AIw6JmDXNAy1sfkcwQ8rj8OMJ1h8hMlCA8Ufs1nSN3s-k8cuCBY1Ra4Jb1THLJow5rwPGkO9QHHUVAUgiprDexYZpf128r+8PslG41L6m0em5sxDizDiCcLRXA2FVZUhVxgkyccbinGcTkCPxbBhVwVyvTV11vTcDSNI89wPfUjyqWp6kaFplFtLpCz6KgNzLQ0K13M0nwIl8FAmBZP3bBZwQQWVPEoYIZwTbZY3jaNx2sTF+TSRV7GCbN4UOaxUJEdCqD+AEsMIzgzzGAQPjQtd1P+QFnwwV9FHfKYv0MUFuP-FZCWAwdsyQwC-D2btPHHaJdn4sU4WuHZ7AHZdSSoykNNMliMCIuoGmaNpOkvVSjMoKKtNYvT2I-aZvzs0NOxiDIoQFbxtkRAkdh8-FHFleVFT8ZVkhJF5DOo9KTMyjAsBqeLvgsWBlCZSg8FaIFqgACiErQAEo2AirUMrM1BeuIhkIC4wqeV4xDoXk3ZDjFIC7BqgUo2uHsbncAkUmCPwclJMh0DgcxFv6KR9XyLa-yKlZ0gSFJrCHQTFQOPwfJzYJoSCJDdkzfwUPC1cOp6L5Nvyzl7L+7soVnNNo0xDzBOTc4VUoeMRWnELAmCLx7BUgo0tKaQej6+oagx2yse28MDihPYPATJEERnA4aoTfb8UVE5JNcEcnmR9rKVo+96NwqtrX1CivR9H6eNWbtAf8G78WuTFu3HE4ZS0JqHFHBU1lFRnrww3U6Jwx98KYI99YcmdHDzEIvEAumnGgqFfDgyD7mQl21O1TCPYY1A-b+1YESjGNFV8BMkKQ0mViQgTfEu5JNiQoD47S5aYtTzHfwNolgLkkKHBHUUdglM5HLTZwRzSOwK-lpG2tSjra592Q1v6rmQB-Dsdt87xKDSHMFbTHFPEOCTLhuDJ88OBd8WUpXx-eNOl4RYCypVOnIKq7ye+iFxLgC7e7FcWV9kerIgA */
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
          deleteTodo: {
            data: void;
          };
        },
        events: {} as
          | { type: "Create new" }
          | { type: "Form input changed"; value: string }
          | { type: "Submit" }
          | { type: "Delete"; todo: string },
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
            Delete: {
              target: "Deleting todo",
            },
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
                onDone: [
                  {
                    target: "#Todos Machine.Loading Todos",
                  },
                ],
                onError: [
                  {
                    actions: "assignErrorToContext",
                    target: "Showing form input",
                  },
                ],
              },
            },
          },
        },
        "Deleting todo": {
          invoke: {
            src: "deleteTodo",
            onDone: [
              {
                target: "Loading Todos",
              },
            ],
            onError: [
              {
                actions: "assignErrorToContext",
                target: "Deleting todo errored",
              },
            ],
          },
        },
        "Deleting todo errored": {
          after: {
            "2500": {
              target: "Todos Loaded",
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
