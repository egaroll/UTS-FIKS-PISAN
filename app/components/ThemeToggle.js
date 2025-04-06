import React from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ isDarkMode, setIsDarkMode, currentTheme = {} }) {
  const styles = {
    themeToggle: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      backgroundColor: currentTheme.primary || "#2e7d32",
      color: "white",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div
      style={styles.themeToggle}
      onClick={() => setIsDarkMode(!isDarkMode)}
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
    </div>
  );
}