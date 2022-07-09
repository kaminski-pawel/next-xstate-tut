import { useMachine } from "@xstate/react";
import type { NextPage } from "next";
import { todosMachine } from "../machines/todoAppMachine";
// import { myMachine } from "../machines/myFistMachine";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return ["Do thing 1", "Do thing 2"];
      },
    },
  });
  return (
    <div className={styles.container}>
      {JSON.stringify(state.value)}
      <button
        onClick={() => {
          send({ type: "Todos loaded", todos: ["Do sth"] });
        }}
      >
        Todos loaded
      </button>
      <button
        onClick={() => {
          send({ type: "Loading todos failed", errorMessage: "Error" });
        }}
      >
        Loading todos failed
      </button>
    </div>
  );
};

export default Home;
