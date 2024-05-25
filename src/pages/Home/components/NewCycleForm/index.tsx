import { useContext } from "react";

import { useFormContext } from "react-hook-form";

import { CyclesContext } from "../../../../contexts/CyclesContext";

import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export function NewCycleForm() {
  const {activeCycle} = useContext(CyclesContext);
  const {register} = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">I'll work on</label>
      <TaskInput
        disabled={activeCycle !== null}
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        type="text"
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto A" />
        <option value="Projeto B" />
        <option value="Projeto C" />
      </datalist>

      <label htmlFor="minutesAmount">during</label>
      <MinutesAmountInput
        disabled={activeCycle !== null}
        id="minutesAmount"
        max={60}
        min={5}
        placeholder="00"
        step={5}
        type="number"
        {...register('minutesAmount', {valueAsNumber: true})}
      />

      <span>minutes.</span>
    </FormContainer>
  );
}