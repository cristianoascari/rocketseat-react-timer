import { Cycle } from "./cycles.reducer";

export enum ActionTypes {
  ADD_NEW_CYCLE  = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED"
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    payload: newCycle,
    type: ActionTypes.ADD_NEW_CYCLE
  }
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED
  }
}
export function stopCurrentCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE
  }
}