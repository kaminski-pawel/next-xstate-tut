import { useMachine } from "@xstate/react";
import type { NextPage } from "next";
import { todosMachine } from "../machines/todoAppMachine";
// import { myMachine } from "../machines/myFistMachine";
import styles from "../styles/Home.module.css";

const todos = new Set<string>(["Do thing 1", "Do thing 2"]);

const Home: NextPage = () => {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return Array.from(todos);
      },
      saveTodo: async (context, event) => {
        todos.add(context.createNewTodoFormInput);
      },
    },
  });
  return (
    <div className={styles.container}>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
      <div>
        {state.matches("Todos Loaded") && (
          <button onClick={() => send({ type: "Create new" })}>
            Create new
          </button>
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
