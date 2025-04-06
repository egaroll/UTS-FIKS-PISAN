"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  
  // Instead of props, we'll use state for theme
  const [currentTheme, setCurrentTheme] = useState({
    primary: "#2e8b57", // Sea Green color
    textColor: "#2e8b57", // Green text color
  });

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
    
    // Animate background fade-in
    const timer = setTimeout(() => {
      setBackgroundOpacity(1);
    }, 100);
    
    // Optional: Get theme from localStorage or a global state
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      try {
        setCurrentTheme(JSON.parse(savedTheme));
      } catch (e) {
        console.error("Error parsing theme from localStorage", e);
      }
    }
    
    return () => clearTimeout(timer);
  }, []);

  const projectData = [
    {
      title: "KQ ENT - Agensi & Merch",
      description:
        "KQ Ent adalah agensi kreatif yang fokus pada pengembangan talenta di bidang musik, seni, dan media digital.",
      image: "/P1.jpg",
      alt: "KQ ENT",
      link: "/pages/porto1",
    },
    {
      title: "NEO ZONE - NCT Merch",
      description:
        "NEO ZONE adalah destinasi utama bagi para penggemar NCT untuk mendapatkan koleksi merchandise eksklusif.",
      image: "/P2.jpg",
      alt: "NEO",
      link: "/pages/porto2",
    },
    {
      title: "PROGRAM MENGHITUNG NILAI RATA - RATA",
      description:
        "Program yang bisa digunakan untuk menghitung nilai rata-rata mahasiswa serta menyimpan datanya",
      image: "/P3.jpg",
      alt: "PROGRAM HITUNG NILAI",
      link: "/pages/porto3",
    },
  ];

  // Define styles object inside the component
  const styles = {
    section: {
      padding: "2rem 0",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
      opacity: backgroundOpacity,
      transition: "opacity 1.2s ease-in-out, transform 0.8s ease-out",
      transform: backgroundOpacity ? "translateY(0)" : "translateY(20px)",
      position: "relative",
      overflow: "hidden",
    },
    backgroundAnimation: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95) 0%, white 70%)",
      animation: "pulse 8s infinite alternate",
      zIndex: -1,
    }
  };

  // Add a style tag for custom animations
  const styleTag = `
    @keyframes pulse {
      0% {
        opacity: 0.8;
        transform: scale(1);
      }
      100% {
        opacity: 1;
        transform: scale(1.05);
      }
    }
  `;

  const headerStyle = {
    color: currentTheme.textColor,
    borderBottom: `2px solid ${currentTheme.primary}`,
    paddingBottom: "10px",
    marginBottom: "20px",
    transform: isVisible ? "translateY(0)" : "translateY(-20px)",
    opacity: isVisible ? 1 : 0,
    transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
    textAlign: "center",
    fontWeight: "bold",
  };

  const getProjectCardStyle = (index) => ({
    width: "calc(50% - 7.5px)",
    border: `1px solid ${currentTheme.primary}`,
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transform: isVisible ? "translateY(0)" : "translateY(40px)",
    opacity: isVisible ? 1 : 0,
    transition: `transform 0.6s ease-out ${
      0.2 + index * 0.15
    }s, opacity 0.6s ease-out ${0.2 + index * 0.15}s`,
  });

  const imageContainerStyle = {
    position: "relative",
    height: "200px",
    cursor: "pointer",
  };

  const imageOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: currentTheme.primary,
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    zIndex: 2,
  };

  return (
    <>
      {/* Add the style tag with keyframes animation */}
      <style dangerouslySetInnerHTML={{ __html: styleTag }} />
      
      <div style={styles.section}>
        {/* Background animation */}
        <div style={styles.backgroundAnimation}></div>
        
        <h2 style={headerStyle}>Portfolio</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            padding: "1rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {projectData.map((project, index) => (
            <div
              key={index}
              style={getProjectCardStyle(index)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
              }}
            >
              <Link href={project.link} style={{ textDecoration: "none" }}>
                <div
                  style={imageContainerStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector(
                      ".image-overlay"
                    ).style.opacity = "0.7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector(
                      ".image-overlay"
                    ).style.opacity = "0";
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  <div className="image-overlay" style={imageOverlayStyle}>
                    LIHAT DETAIL
                  </div>
                </div>
              </Link>

              <div
                style={{
                  padding: "15px",
                }}
              >
                <h3
                  style={{
                    marginTop: "0",
                    color: currentTheme.textColor,
                    transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                    opacity: isVisible ? 1 : 0,
                    transition: `transform 0.5s ease-out ${
                      0.4 + index * 0.15
                    }s, opacity 0.5s ease-out ${0.4 + index * 0.15}s`,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    marginBottom: "15px",
                    color: currentTheme.textColor,
                    transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                    opacity: isVisible ? 1 : 0,
                    transition: `transform 0.5s ease-out ${
                      0.5 + index * 0.15
                    }s, opacity 0.5s ease-out ${0.5 + index * 0.15}s`,
                  }}
                >
                  {project.description}
                </p>
                <Link
                  href={project.link}
                  style={{
                    color: currentTheme.textColor,
                    textDecoration: "none",
                    fontWeight: "bold",
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity 0.5s ease-out ${0.6 + index * 0.15}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                ></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}