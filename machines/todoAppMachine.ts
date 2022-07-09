import { assign, createMachine } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FWwAQFkCGAxgBYCWAdmAHQAyqeE5UWaGsAxBhZeQG6oDWVFplyFSXWvUbN0mBL1QE8AFxKoyAbQAMAXUSgADphKr1+kAA9EAJgCMANkoBWJwE4A7ABZXr+wGYne3cADgAaEABPRABaPx9KLTstJwd3J083TwBfLPDhbHxicipJBjImfLYwACdq1GrKAwAbFQAzeoBbSnzRIok6MorZWHkyPiVTTV1zI1gTNTJzKwRo2wdKP3ctYM9g4Ntrdx8nMMiYu3cE93s3H38HXaccvOHe8SFX0sg2ABEwJrAyjAM2MkyWMQcTkongO7msnhCTnh13s4SiK2s-mcWjSyVs7j8nkJ2VyIB6hXe3U+A2+AGFqmAVGAsBQAO4guZgpCWGyBSjWfbwoJaWwpJzuNEQ66UWxaHHWPyKgWuZLPMmvCnFSj0xmqcossCsrDKWSUADKRFQrOk7WqHSw5AMAFdlGwAGKdB1kZ3KLDEPDlSAc+ZmbnLVYKyiuTxEuL2LQwxOndG2YJaGVHNz2Tzxuz4tXksRanUqaRs42mi1Wm2ex0uthmp0AIw6JmDXNAy1sfkcwQ8rj8OMJ1h8hMlCA8Ufs1nSN3s-k8cuCBY1Ra4Jb1THLJow5rwPGkO9QHHUVAUgiprDexYZpf128r+8PslG41L6m0em5sxDizDiCcLRXA2FVZUhVxgkyccbinGcTkCPxbBhVwVyvTV11vTcDSNI89wPfUjyqWp6kaFplFtLpCz6KgNzLQ0K13M0nwIl8FAmBZP3bBZwQQWVPEoYIZwTbZY3jaNx2sTF+TSRV7GCbN4UOaxUJEdCqD+AEsMIzgzzGAQPjQtd1P+QFnwwV9FHfKYv0MUFuP-FZCWAwdsyQwC-D2btPHHaJdn4sU4WuHZ7AHZdSSoykNNMliMCIuoGmaNpOkvVSjMoKKtNYvT2I-aZvzs0NOxiQlLjTA5ZUEg49lRM4VnxRxZXlRU-GVVU1TIdA4HMCKtVKaR8i4wqeRWdIEhSawh0ExUDj8Hyc2CaEgiQ3ZM38FDwtXaiUuwL4IEGv8it4rZKC2XYIOCLYQoJZNzmOuU0llVwXA8eMSReQytr6-UehqeKaj2-LOXsw6IyhPYPATJEERnA4fL46F9gJAJBJHEcng2j7KVo+96NwqtrX1CivR9faeNWbsxv8dx3Hxa5MW7ccThlLQWocUcFTWUUVIKNLsa3XHH3wpgj1JhyZ0cPMQi8QCLqcaCoV8ODIPuZDuevDDdTonDZFFkGkMuaNY18BMkKQm66v4vs5KVSCaZFGM1bU9KTMyjBdeG3y4koOSQocEdRR2CVatiNNnBHNI7E2WxXBHR20oyszUCwX76iDQHfzJxc-BOmSWYmp64VsOHbASaOMhCQlNha9w4+o93wxzbOfdcP2W5OBEfJcS4AsHdJZIRHIciAA */
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
        "Deleting todo errored": {},
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
