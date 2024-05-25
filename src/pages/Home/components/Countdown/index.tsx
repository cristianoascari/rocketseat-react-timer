import { useContext, useEffect } from "react";

import { differenceInSeconds } from "date-fns";

import { CyclesContext } from "../../../../contexts/CyclesContext";

import { CountdownContainer, Separator } from "./styles";

export function Countdown() {
  const {
    activeCycle,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed
  } = useContext(CyclesContext);

  const totalSeconds: number = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds: number = totalSeconds - amountSecondsPassed;

  const minutesAmmount: number = Math.floor(currentSeconds / 60);
  const secondsAmmount: number = currentSeconds % 60;

  const minutes: string = String(minutesAmmount).padStart(2, '0');
  const seconds: string = String(secondsAmmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        const secondsDifference: number = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(0);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [activeCycle, markCurrentCycleAsFinished, setSecondsPassed, totalSeconds]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} - ${activeCycle.task}`;
    }
  }, [activeCycle, minutes, seconds]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>

      <Separator>:</Separator>
      
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}