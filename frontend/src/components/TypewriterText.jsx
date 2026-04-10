import { useEffect, useState } from "react";

const TypewriterText = ({ text, delay = 50 }) => {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplay((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);
  return <>{display}</>;
};

export default TypewriterText;