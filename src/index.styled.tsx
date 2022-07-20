import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 20px 40px;
  font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @media screen and (max-width: 768px) {
    padding: 10px;
  }
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

a {
  text-decoration: none;
  color: black;
}

* {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  display: none;
}
`;

export default GlobalStyle;
