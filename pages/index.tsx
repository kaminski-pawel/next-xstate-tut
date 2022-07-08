import { useMachine } from "@xstate/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { myMachine } from "../machines/myFistMachine";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [state, send] = useMachine(myMachine);
  return (
    <div className={styles.container}>
      {JSON.stringify(state.value)}
      <button
        onClick={() => {
          send("MOUSEOVER");
        }}
      >
        Mouse over
      </button>
      <button
        onClick={() => {
          send("MOUSEOUT");
        }}
      >
        Mouse out
      </button>
    </div>
  );
};

export default Home;
