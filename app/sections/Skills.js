import React, { useState, useEffect } from "react";
import {
  Code,
  Database,
  Laptop,
  Palette,
  FileCode,
  GitBranch,
  BarChart2,
  Trello,
  MessageCircle,
  Brain,
  Clock,
  Users,
  FileText,
  Package,
} from "lucide-react";

export default function Skills({ styles, currentTheme }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  const sectionHeaderStyle = {
    color: currentTheme.primary,
    borderBottom: `2px solid ${currentTheme.primary}`,
    paddingBottom: "10px",
    marginBottom: "20px",
    transform: isVisible ? "translateY(0)" : "translateY(-15px)",
    opacity: isVisible ? 1 : 0,
    transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
  };

  const categoryHeaderStyle = {
    color: currentTheme.secondary || "#333",
    marginBottom: "15px",
    marginTop: "25px",
    fontWeight: "600",
    fontSize: "1.2rem",
    transform: isVisible ? "translateX(0)" : "translateX(-20px)",
    opacity: isVisible ? 1 : 0,
    transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
  };

  const skillContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  };

  // Create animation for skill badges with delay based on index
  const getSkillStyle = (index, category) => {
    const baseDelay = {
      technical: 0.1,
      system: 0.3,
      soft: 0.5,
      tools: 0.7,
    };

    return {
      backgroundColor: currentTheme.primary,
      color: "white",
      padding: "10px 15px",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transform: isVisible ? "scale(1)" : "scale(0.7)",
      opacity: isVisible ? 1 : 0,
      transition: `transform 0.4s ease-out ${
        baseDelay[category] + index * 0.05
      }s, opacity 0.4s ease-out ${baseDelay[category] + index * 0.05}s`,
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      cursor: "default",
      "&:hover": {
        transform: "scale(1.05)",
      },
    };
  };

  // Define skills with categories and icons
  const skillCategories = {
    technical: {
      title: "Technical Skills",
      delay: 0.1,
      skills: [
        { name: "JavaScript", icon: <Laptop size={18} /> },
        { name: "HTML/CSS", icon: <FileCode size={18} /> },
        { name: "React", icon: <Code size={18} /> },
        { name: "PHP", icon: <Code size={18} /> },
        { name: "SQL", icon: <Database size={18} /> },
        { name: "Git", icon: <GitBranch size={18} /> },
      ],
    },
    system: {
      title: "System Analysis and Design",
      delay: 0.3,
      skills: [
        { name: "Business Requirements", icon: <BarChart2 size={18} /> },
        { name: "SDLC", icon: <Trello size={18} /> },
        { name: "UML Modeling", icon: <FileCode size={18} /> },
        { name: "Agile Methods", icon: <Users size={18} /> },
      ],
    },
    soft: {
      title: "Soft Skills",
      delay: 0.5,
      skills: [
        { name: "Communication", icon: <MessageCircle size={18} /> },
        { name: "Problem-Solving", icon: <Brain size={18} /> },
        { name: "Time Management", icon: <Clock size={18} /> },
        { name: "Teamwork", icon: <Users size={18} /> },
      ],
    },
    tools: {
      title: "Tools and Software",
      delay: 0.7,
      skills: [
        { name: "MS Office", icon: <FileText size={18} /> },
        { name: "ERP Systems", icon: <Package size={18} /> },
        { name: "Adobe Creative Suite", icon: <Palette size={18} /> },
        { name: "Database Tools", icon: <Database size={18} /> },
      ],
    },
  };

  return (
    <div style={styles.section}>
      <h2 style={sectionHeaderStyle}>Keahlian</h2>

      {Object.entries(skillCategories).map(
        ([categoryKey, category], categoryIndex) => (
          <div key={categoryKey}>
            <h3
              style={{
                ...categoryHeaderStyle,
                transition: `transform 0.5s ease-out ${
                  0.2 + categoryIndex * 0.1
                }s, opacity 0.5s ease-out ${0.2 + categoryIndex * 0.1}s`,
              }}
            >
              {category.title}
            </h3>

            <div style={skillContainerStyle}>
              {category.skills.map((skill, skillIndex) => (
                <span
                  key={skill.name}
                  style={getSkillStyle(skillIndex, categoryKey)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0,0,0,0.15)";
                    e.currentTarget.style.transition =
                      "transform 0.2s ease-out, box-shadow 0.2s ease-out";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 5px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transition =
                      "transform 0.2s ease-out, box-shadow 0.2s ease-out";
                  }}
                >
                  {skill.icon}
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
