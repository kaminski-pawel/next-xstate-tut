import { useMachine } from "@xstate/react";
import type { NextPage } from "next";
import { todosMachine } from "../machines/todoAppMachine";
import styles from "../styles/Home.module.css";

const todos = new Set<string>([]);

const randomBoolean = (): boolean => {
  return Math.floor(Math.random() * 2) == 0;
};

const Home: NextPage = () => {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return Array.from(todos);
      },
      saveTodo: async (context, event) => {
        todos.add(context.createNewTodoFormInput);
      },
      deleteTodo: async (context, event) => {
        if (randomBoolean()) {
          throw new Error("Error while deleting");
        }
        todos.delete(event.todo);
      },
    },
  });
  return (
    <div className={styles.container}>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
      <div>
        {state.matches("Todos Loaded") && (
          <>
            {state.context.todos.map((todo) => (
              <div key={todo}>
                <p>{todo}</p>
                <button onClick={() => send({ type: "Delete", todo })}>
                  Delete
                </button>
              </div>
            ))}
            <button onClick={() => send({ type: "Create new" })}>
              Create new
            </button>
          </>
        )}
        {state.matches("Deleting todo errored") && (
          <>
            <p>Error: {state.context.errorMessage}</p>
          </>
        )}
        {state.matches("Creating new todo.Showing form input") && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send({ type: "Submit" });
            }}
          >
            <input
              onChange={(e) => {
                send({ type: "Form input changed", value: e.target.value });
              }}
            ></input>
          </form>
        )}
      </div>
    </div>
  );
};

export default Home;
