// "use client" must be the first line of the file.
"use client";

import './globals.css'; // Make sure the path is correct for your project structure

import React, { useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import Tentang from "./sections/Tentang";
import Pengalaman from "./sections/Pengalaman";
import Skills from "./sections/Skills";
import Portofolio from "./sections/portofolio/page";
import Kontak from "./sections/Kontak";

export default function CVOnline() {
  const [activeSection, setActiveSection] = useState("tentang");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu

  const colors = {
    light: {
      background: "linear-gradient(135deg, #e6f3e6, #c8e6c9, #a5d6a7)",
      backgroundBottom: "linear-gradient(135deg, #81c784, #66bb6a, #4caf50)",
      card: "rgba(255,255,255,0.9)",
      text: "#2e7d32",
      primary: "#2e7d32",
      secondary: "rgb(9, 80, 12)",
      cardShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    dark: {
      background: "linear-gradient(135deg, #1b5e20, #2e7d32, #388e3c)",
      backgroundBottom: "linear-gradient(135deg, #1b5e20, #2e7d32,rgb(9, 80, 12))",
      card: "rgba(30,30,30,0.9)",
      text: "#a5d6a7",
      primary: "#4caf50",
      secondary: "#81c784",
      cardShadow: "0 4px 6px rgba(255,255,255,0.1)",
    },
  };

  const currentTheme = isDarkMode ? colors.dark : colors.light;

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      background: currentTheme.background,
      backgroundAttachment: "fixed",
      color: currentTheme.text,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: currentTheme.primary,
      padding: "15px 0",
      position: "sticky",
      top: "0",
      zIndex: "100",
      width: "100%",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      alignItems: "center",
      flexDirection: "row",
    },
    navItem: {
      color: "white",
      margin: "0 15px",
      textDecoration: "none",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "color 0.3s ease",
    },
    activeNavItem: {
      color: currentTheme.secondary,
      borderBottom: `2px solid ${currentTheme.secondary}`,
    },
    menuToggle: {
      display: "none", // Hidden by default (on desktop and tablet)
      flexDirection: "column",
      cursor: "pointer",
      justifyContent: "center",
      alignItems: "center",
    },
    menuIcon: {
      backgroundColor: "white",
      height: "3px",
      width: "25px",
      margin: "4px 0",
    },
    mobileNav: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      backgroundColor: currentTheme.primary,
      position: "absolute",
      top: "60px", // Adjust based on navbar height
      left: "0",
      right: "0",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      zIndex: "50",
    },
    mainContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      flex: "1",
    },
    section: {
      width: "100%",
      maxWidth: "800px",
      marginTop: "20px",
      padding: "20px",
      backgroundColor: currentTheme.card,
      borderRadius: "10px",
      boxShadow: currentTheme.cardShadow,
      color: currentTheme.text,
    },
  };

  const renderSection = () => {
    switch (activeSection) {
      case "tentang":
        return <Tentang styles={styles} currentTheme={currentTheme} />;
      case "pengalaman":
        return <Pengalaman styles={styles} currentTheme={currentTheme} />;
      case "skills":
        return <Skills styles={styles} currentTheme={currentTheme} />;
      case "portofolio":
        return <Portofolio styles={styles} currentTheme={currentTheme} />;
      case "kontak":
        return <Kontak styles={styles} currentTheme={currentTheme} />;
      default:
        return <Tentang styles={styles} currentTheme={currentTheme} />;
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        {/* Mobile menu toggle */}
        <div
          style={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div style={styles.menuIcon}></div>
          <div style={styles.menuIcon}></div>
          <div style={styles.menuIcon}></div>
        </div>

        {/* Navbar items for larger screens (Tablet and Desktop) */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {["tentang", "pengalaman", "skills", "portofolio", "kontak"].map(
            (menu) => (
              <div
                key={menu}
                style={{
                  ...styles.navItem,
                  ...(activeSection === menu ? styles.activeNavItem : {}),
                }}
                onClick={() => setActiveSection(menu)}
              >
                {menu.charAt(0).toUpperCase() + menu.slice(1)}
              </div>
            )
          )}
        </div>
      </nav>

      {/* Mobile menu display */}
      {isMenuOpen && (
        <div style={styles.mobileNav}>
          {["tentang", "pengalaman", "skills", "portofolio", "kontak"].map(
            (menu) => (
              <div
                key={menu}
                style={{
                  ...styles.navItem,
                  ...(activeSection === menu ? styles.activeNavItem : {}),
                }}
                onClick={() => setActiveSection(menu)}
              >
                {menu.charAt(0).toUpperCase() + menu.slice(1)}
              </div>
            )
          )}
        </div>
      )}

      <div style={styles.mainContent}>{renderSection()}</div>

      <ThemeToggle 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        currentTheme={currentTheme} 
      />
    </div>
  );
}
