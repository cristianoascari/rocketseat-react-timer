import { useContext } from "react";

import { formatDistanceToNow } from "date-fns";

import { CyclesContext } from "../../contexts/CyclesContext";

import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
  const {cycles} = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>My History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Begin</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  
                  <td>{cycle.minutesAmount} minute(s)</td>
                  
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true
                    })}
                  </td>
                  
                  <td>
                    {cycle.finishedDate && <Status statuscolor="green">Finished</Status>}

                    {cycle.interruptedDate && <Status statuscolor="red">Interrupted</Status>}

                    {!cycle.finishedDate && !cycle.interruptedDate && <Status statuscolor="yellow">In progress</Status>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}