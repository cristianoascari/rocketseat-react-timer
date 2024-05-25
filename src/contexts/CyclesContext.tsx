import { createContext, useEffect, useReducer, useState } from "react";

import { differenceInSeconds } from "date-fns";

import { addNewCycleAction, markCurrentCycleAsFinishedAction, stopCurrentCycleAction } from "../reducers/cycles/cycles.actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/cycles.reducer";

interface CreateNewCycle {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  activeCycle: Cycle | null;
  amountSecondsPassed: number;
  createNewCycle: (data: CreateNewCycle) => void;
  cycles: Cycle[];
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  stopCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({children}: {children: React.ReactNode}) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      activeCycle: null,
      cycles: []
    },
    (initialState) => {
      const storedStateAsJson = localStorage.getItem("@react-time:cycles-state");

      if (storedStateAsJson) {
        return JSON.parse(storedStateAsJson);
      }

      return initialState;
    }
  );

  const {activeCycle, cycles} = cyclesState;

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate)
      );
    }

    return 0;
  });

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  }

  const createNewCycle = (data: CreateNewCycle) => {
    const id: string = String(Date.now());
  
    const newCycle: Cycle = {
      id,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
      task: data.task
    }
  
    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  }

  const stopCurrentCycle = () => {
    dispatch(stopCurrentCycleAction());
    setAmountSecondsPassed(0);
  };

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
  
    localStorage.setItem("@react-time:cycles-state", stateJSON);
  }, [cyclesState]);

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        amountSecondsPassed,
        createNewCycle,
        cycles,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        stopCurrentCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}