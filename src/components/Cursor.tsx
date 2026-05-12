import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('.glass-panel') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      width: 20,
      height: 20,
      backgroundColor: "var(--accent-green)",
      border: "0px solid var(--accent-cyan)",
      boxShadow: "0 0 10px var(--accent-green)",
      mixBlendMode: "difference" as any
    },
    hover: {
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
      width: 50,
      height: 50,
      backgroundColor: "transparent",
      border: "2px solid var(--accent-cyan)",
      boxShadow: "0 0 20px rgba(0, 243, 255, 0.5)",
      mixBlendMode: "normal" as any
    }
  };

  return (
    <motion.div
      variants={variants}
      animate={isHovering ? "hover" : "default"}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
};

export default Cursor;
