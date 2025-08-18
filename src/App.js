import React, { useEffect, useRef, useState } from "react";
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
    // 초기 진입 시 현재 해시를 반영하고 스크롤 동기화
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const prevIsProductRef = useRef(null);
  useEffect(() => {
    const isProduct = hash.startsWith("#product/");
    const prevIsProduct = prevIsProductRef.current;
    // Landing ↔ ProductDetail 전환시에만 상단으로 스크롤
    if (prevIsProduct !== null && prevIsProduct !== isProduct) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    prevIsProductRef.current = isProduct;
    // Landing 내부 섹션 이동 처리 (#activities 등)
    if (!isProduct && hash && hash.length > 1) {
      const target = document.querySelector(hash);
      if (target) {
        // 다음 페인트 이후 스크롤 보장
        requestAnimationFrame(() =>
          target.scrollIntoView({ behavior: "smooth", block: "start" })
        );
      }
    }
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
