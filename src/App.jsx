import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import RightSection from "./components/RightSection";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeSection, setActiveSection] = useState("Панель управления");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "IMG_10234.png",
      type: "PNG Файл",
      size: "3 MB",
      icon: "ri-image-fill",
      color: "#1976d2",
      bg: "#e6e4ec",
      category: "Картинки",
      timestamp: new Date("2025-03-04T10:00:00"),
    },
    {
      id: 2,
      name: "Мой отчет.docx",
      type: "DOCX Файл",
      size: "2 MB",
      icon: "ri-file-3-fill",
      color: "#1d92f1",
      bg: "#ddeffd",
      category: "Документы",
      timestamp: new Date("2025-03-03T15:00:00"),
    },
    {
      id: 3,
      name: "Веселое видео.mp4",
      type: "MP4 Файл",
      size: "200 MB",
      icon: "ri-video-on-fill",
      color: "#3bc963",
      bg: "#e2f7e8",
      category: "Видео",
      timestamp: new Date("2025-03-05T09:00:00"),
    },
    {
      id: 4,
      name: "Billie Eilish.mp3",
      type: "MP3 Файл",
      size: "5 MB",
      icon: "ri-music-2-fill",
      color: "#ffd12c",
      bg: "#fff8df",
      category: "Звуки",
      timestamp: new Date("2025-03-02T12:00:00"),
    },
    {
      id: 5,
      name: "Photo_001.jpg",
      type: "JPG Файл",
      size: "4 MB",
      icon: "ri-image-fill",
      color: "#1976d2",
      bg: "#e6e4ec",
      category: "Картинки",
      timestamp: new Date("2025-03-01T14:00:00"),
    },
    {
      id: 6,
      name: "Презентация.pptx",
      type: "PPTX Файл",
      size: "6 MB",
      icon: "ri-file-3-fill",
      color: "#1d92f1",
      bg: "#ddeffd",
      category: "Документы",
      timestamp: new Date("2025-03-04T16:00:00"),
    },
  ]);
  const [favorites, setFavorites] = useState([]);
  // Инициализируем usedSpace в MB на основе суммарного размера начальных файлов
  const initialUsedSpace = files.reduce((acc, file) => {
    const sizeMB = parseFloat(file.size); // Извлекаем числовую часть (например, 3 из "3 MB")
    return acc + sizeMB; // Суммируем в MB
  }, 0);
  const [usedSpace, setUsedSpace] = useState(initialUsedSpace); // Начальное значение 220 MB

  const handleSignOut = () => {
    setIsAuthenticated(false);
    alert("Вы вышли из системы");
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFileAdd = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    // Рассчитываем общий usedSpace в MB на основе всех файлов
    const totalSizeMB = [...files, ...newFiles].reduce((acc, file) => {
      const sizeMB = parseFloat(file.size); // Извлекаем числовую часть
      return acc + sizeMB; // Суммируем в MB
    }, 0);
    setUsedSpace(Math.min(totalSizeMB, 50000)); // Ограничиваем 50 ГБ = 50000 MB
    console.log(
      "Updated usedSpace (MB):",
      usedSpace,
      "Total Size MB:",
      totalSizeMB
    );
  };

  if (!isAuthenticated) {
    return <div>Вы вышли из системы. Перезагрузите страницу для входа.</div>;
  }

  return (
    <div className="app">
      <Sidebar
        onSignOut={handleSignOut}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isMenuOpen={isMenuOpen}
      />
      <MainContent
        toggleMenu={toggleMenu}
        files={files}
        setFiles={setFiles}
        activeSection={activeSection}
        favorites={favorites}
        setFavorites={setFavorites}
      />
      <RightSection
        onFileAdd={handleFileAdd}
        files={files}
        usedSpace={usedSpace}
        setUsedSpace={setUsedSpace}
      />
    </div>
  );
}

export default App;
