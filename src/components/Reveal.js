import React from "react";
import useInView from "../hooks/useInView";

const Reveal = ({
  children,
  delay = 0,
  className = "",
  as: As = "div",
  style = {},
  ...rest
}) => {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <As
      ref={ref}
      className={`reveal ${inView ? "is-inview" : ""} ${className}`.trim()}
      style={{ ...style, "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </As>
  );
};

export default Reveal;
