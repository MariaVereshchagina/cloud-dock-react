import React from "react";
import "./Sidebar.css";
import "remixicon/fonts/remixicon.css";

const Sidebar = ({ onSignOut, activeSection, onSectionChange, isMenuOpen }) => {
  const sections = [
    { icon: "ri-apps-line", name: "Панель управления" },
    { icon: "ri-folder-line", name: "Ваши файлы" },
    { icon: "ri-hard-drive-3-line", name: "Ваши диски" },
    { icon: "ri-folder-lock-line", name: "Защищенные" },
    { icon: "ri-star-line", name: "Избранное" },
    { icon: "ri-delete-bin-5-line", name: "Корзина" },
    { icon: "ri-settings-3-line", name: "Настройки" },
  ];

  return (
    <div className={`left-section ${isMenuOpen ? "open" : ""}`}>
      <div className="sidebar">
        <h2>Мои документы</h2>
        {sections.map((section) => (
          <div
            key={section.name}
            className={`item ${activeSection === section.name ? "active" : ""}`}
            onClick={() => onSectionChange(section.name)}
          >
            <i className={section.icon}></i>
            <h3>{section.name}</h3>
          </div>
        ))}
      </div>
      <div className="sign-out" onClick={onSignOut}>
        <i className="ri-logout-box-r-line"></i>
        <h3>Выйти</h3>
      </div>
    </div>
  );
};

export default Sidebar;
