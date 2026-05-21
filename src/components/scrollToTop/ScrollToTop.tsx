import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./scrollToTop.scss";

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`scroll-to-top ${visible ? "visible" : ""}`}
      onClick={scrollUp}
      aria-label="Volver arriba"
    >
      <FaArrowUp />
    </button>
  );
};
