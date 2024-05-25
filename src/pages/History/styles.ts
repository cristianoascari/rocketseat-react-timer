import styled from "styled-components";

export const HistoryContainer = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 3.5rem;

  h1{
    color: ${({ theme }) => theme['gray-100']};
    font-size: 1.5rem;
  }
`;

export const HistoryList = styled.div`
  flex: 1;
  margin-top: 2rem;
  overflow: auto;

  table {
    border-collapse: collapse;
    min-width: 600px;
    width: 100%;

    th {
      background-color: ${({ theme }) => theme['gray-600']};
      color: ${({ theme }) => theme['gray-100']};
      font-size: .875rem;
      line-height: 1.6;
      padding: 1rem;
      text-align: left;

      &:first-child {
        border-top-left-radius: 4px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 4px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${({ theme }) => theme['gray-700']};
      border-top: 4px solid ${({ theme }) => theme['gray-800']};
      font-size: .875rem;
      line-height: 1.6;
      padding: 1rem;

      &:first-child {
        padding-left: 1.5rem;
        width: 50%;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`;

const STATUS_COLORS = {
  green: 'green-500',
  red: 'red-500',
  yellow: 'yellow-500'
} as const;

interface StatusProps {
  statuscolor: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusProps>`
  align-items: center;
  display: flex;
  gap: .5rem;

  &::before {
    background-color: ${(props) => props.theme[STATUS_COLORS[props.statuscolor]]};
    border-radius: 50%;
    content: '';
    display: block;
    height: .5rem;
    width: .5rem;
  }
`;