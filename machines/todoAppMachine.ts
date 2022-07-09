import { createMachine } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FWwAQFkCGAxgBYCWAdmAHQAyqeE5UWaGsAxBhZeQG6oDWVFplyFSXWvUbN0mBL1QE8AFxKoyAbQAMAXUSgADphKr1+kAA9EARgAsAJkoBWAGzWn9gMwAONwE5vLWtPABoQAE9EAHZrSmso+297Nxc-ZJ9PAF9MsOFsfGJyKkkGMiY8tjAAJyrUKsoDABsVADM6gFtKPNFCiTpS8tlYeTI+JVNNXXMjWBM1MnMrBABaa29Yzz9bKM8nP08vJ3dvMMiEa0S4+MSfFyjU7w9snJAydDhzboLxYv7pPOmxgmi0Qq08sS0tlcdhcBySDicp1Bu0onl2vm8ni0sPsfictmyuSGPR+XWJJUggNmwKQlhs2Moflh1i09i0TO8ATuSIQ9jslESnNsASijyChJAXzERRofzKMlYWGqtSq1QgVLmZlpS1Wfi0jOCe2sLlsDiiMXsPPstn1FvcrNsjyikPsEqlvTAGppoB1fNsBt2fmNpvs5ouPNWWm8qPRLj2wutQacz0yQA */
  createMachine(
    {
      tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
      schema: {
        // events: {} as
        //   | { type: "Todos loaded"; todos: string[] }
        //   | { type: "Loading todos failed"; errorMessage: string },
        services: {} as {
          loadTodos: {
            data: string[];
          };
        },
      },
      id: "Todos Machine",
      initial: "Loading Todos",
      states: {
        "Loading Todos": {
          invoke: {
            src: "loadTodos",
            onDone: [
              {
                target: "Todos Loaded",
              },
            ],
            onError: [
              {
                target: "Loading Todos errorerd",
              },
            ],
          },
        },
        "Todos Loaded": {},
        "Loading Todos errorerd": {},
      },
    }
    // {
    //   actions: {
    //     consoleLogTodos: (context, event) => {
    //       alert(JSON.stringify(event.todos));
    //     },
    //   },
    // }
  );
