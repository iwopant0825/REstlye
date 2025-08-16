import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import Landing from "./pages/Landing";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Landing />
    </ThemeProvider>
  );
}

export default App;
