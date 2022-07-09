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
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
    </div>
  );
};

export default Home;
