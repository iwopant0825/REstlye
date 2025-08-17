import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import Landing from "./pages/Landing";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const [hash, setHash] = useState(window.location.hash || "");

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    // 라우트 전환 시 상단으로 이동
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [hash]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {hash.startsWith("#product/") ? (
        <ProductDetail />
      ) : (
        <Landing />
      )}
    </ThemeProvider>
  );
}

export default App;
