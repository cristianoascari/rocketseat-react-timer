import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :focus {
    box-shadow: 0 0 0 2px ${props => props.theme['green-500']};
    outline: 0;
  }

  body {
    background: ${props => props.theme['gray-900']};
    color: ${props => props.theme['gray-300']};
    -webkit-font-smoothing: antialiased; // Melhora a aparência das fontes (no Mac?).
  }

  body, input-security, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: 400;
  }
`;