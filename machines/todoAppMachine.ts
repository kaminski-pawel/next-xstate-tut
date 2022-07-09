import { assign, createMachine } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FWwAQFkCGAxgBYCWAdmAHQAyqeE5UWaGsAxBhZeQG6oDWVFplyFSXWvUbN0mBL1QE8AFxKoyAbQAMAXUSgADphKr1+kAA9EAFgBsAJkoBmAKwuAjAA4AnC+9b3ay1vABoQAE9EAFo-LWcXAHYE+wSnBP9rT2sAX2yw4Wx8YnIqSQYyJgK2MAAnGtQaygMAGxUAMwaAW0oC0WKJOnLK2Vh5Mj4lU01dcyNYEzUycysEKKctJ0oHb08nJx9fIPtrMMjVp3tHby8-b1tEj28cvJBeovEhEawyyDYAETAzTAyjAs2MU2W0VcjlsCXcCWCnjhO12tlOUNs3mc1l8WkysISnh8z3yX3eJR6Xx+EDYAGEamAVGAsBQAO5g+YQpCWRCYyhaS72WzuYXWJIuLRoiLReyedyUJ4pezrJXWCUuXKk1h9D6UemM1QVFlgVlYZSySgAZSIqFZ0g6NU6WHIBgArso2AAxLrOshu5RYYh4CqQDkLMzclZRFKbex4hKxWyeBx49EIexuSgZuXBe5qzLWJya15ksQU-UqaRss0W622+0+l3utiW10AI06JjDXNAUfcjicDkySPW8N8thO0oQ8M2ePcWj8CVskqXSWLbzLXArhqY1fNGCteB40n3qA46ioCkElO15K3DMrRr3taPJ9kYwmlfU2j03Lm4aWSNEAuRx3CcdwIPuVIIJHNM1ixJEnmsCDwPsfthVsddS36KhtyrE0awPS1XyNU9qjqBomlaZQHW6DccL1B8d2NU1T0PY9SPfBRJkWH9u0WSFVmsaxKELFw0mTNCIPSKUzlHeJ9glBdPESJ4sNvTcqABIFmLIzhL3GARPg0hjtOBN8MA-RQv2mX9DHBASgNWcTbEoFx7icbxfH8Bw0Lg2J4iSGN0jxLJ1JEO8tMBczOIwcj6kaFp2i6G8Is0ygzN0rjDJ478Zj-ByI17aIJ0cFxCx8fZkjFa44NleVFWSFVqvVcLCnSzKLNQLBagS34LFgZQmUoPA2hBGoAAoMy0LQAEo2Ho3VOti7reoaUMCs5RziuclxKCCiVlWhcC1TqpwRLlVEHDhBFbHO3IXjIdA4HMRaKTKaQCn4oqeVWY55XAgJvGOTEtGRfyEhE9ZrmExJPK8EkSxM3Vempb7AJ2mJ5ThNCE1sZdjuTODPNc4S0IcTyZusew2p1d7Bk+r41oZGoIHRwS1jAyhAmTHxhUCe5PDq+dnGVVILiXCdIcwl43vvA18NY2sbTtI1aN9f12ac6MHGcEUZNK+cJScNMwM2LwZwCJF3MJWnIsYhWnwItjiI4phTy1nb51c3wwNhHY7ruftTeQ-lkLB+FEjFZM7fSvCnaVjBPd+6NvASLN40TSTUynZdublSG3DQnxyqLWXsKW6KsqTzaAI5hwfbVfwwMJC5xLg-FnBujxdnccrIdj0yq66nqKIZNna57FO7vTgJBwF-G5RxODCXzyGVPc2E43u8vkZKZOo3x1zS8qpFjnSdw4PxzZXCSTF+wXOMNQeoA */
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
                cond: "Has todos",
                target: "Todos Loaded",
              },
              {
                target: "Creating new todo",
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
      guards: {
        "Has todos": (context, event) => {
          return event.data.length > 0;
        },
      },
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
