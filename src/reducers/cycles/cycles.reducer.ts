import { produce } from 'immer';

import { ActionTypes } from './cycles.actions';

export interface Cycle {
  finishedDate?: Date;
  id: string;
  interruptedDate?: Date;
  minutesAmount: number;
  startDate: Date;
  task: string;
}

interface CycleState {
  activeCycle: Cycle | null;
  cycles: Cycle[];
}

/*interface CycleAction {
  payload: unknown;
  type: string;
}*/

export function cyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      /*return {
        ...state,
        activeCycle: action.payload,
        cycles: [...state.cycles, action.payload]
      };*/
      return produce(state, draft => {
        draft.activeCycle = action.payload;
        draft.cycles.push(action.payload);
      });
  
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      /*return {
        ...state,
        activeCycle: null,
        cycles: state.cycles.map((cycle: Cycle) => {
          if (state.activeCycle && cycle.id === state.activeCycle.id) {
            return {...cycle, interruptedDate: new Date()};
          } else {
            return cycle;
          }
        })
      }*/
      return produce(state, draft => {
        draft.activeCycle = null;
        draft.cycles = draft.cycles.map((cycle: Cycle) => {
          if (state.activeCycle && cycle.id === state.activeCycle.id) {
            return {...cycle, interruptedDate: new Date()};
          } else {
            return cycle;
          }
        });
      });
  
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      /*return {...state, cycles: state.cycles.map((cycle: Cycle) => {
        if (action.payload === cycle.id) {
          return {...cycle, finishedDate: new Date()};
        } else {
          return cycle;
        }
      })};*/
      return produce(state, draft => {
        draft.activeCycle = null;
        draft.cycles = draft.cycles.map((cycle: Cycle) => {
          if (state.activeCycle && cycle.id === state.activeCycle.id) {
            return {...cycle, finishedDate: new Date()};
          } else {
            return cycle;
          }
        });
      });
  
    default:
      return state;
  }
}