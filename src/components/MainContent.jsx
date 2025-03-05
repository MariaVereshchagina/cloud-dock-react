import React, { useState } from "react";
import "./MainContent.css";
import "remixicon/fonts/remixicon.css";

const MainContent = ({
  toggleMenu,
  files,
  setFiles,
  activeSection,
  favorites,
  setFavorites,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFilesCollapsed, setIsFilesCollapsed] = useState(false);

  // Состояния для таблицы файлов (Все файлы )
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [showFilesMenu, setShowFilesMenu] = useState(null);

  // Состояния для таблицы "Недавние"
  const [selectedRecentFile, setSelectedRecentFile] = useState(null);
  const [showRecentMenu, setShowRecentMenu] = useState(null);

  const quickAccessCategories = [
    { name: "Картинки", icon: "ri-image-fill", count: "437/500 файлов" },
    { name: "Документы", icon: "ri-file-3-line", count: "210/500 файлов" },
    { name: "Звуки", icon: "ri-music-2-fill", count: "90/1000 файлов" },
    { name: "Видео", icon: "ri-video-on-fill", count: "540/800 файлов" },
  ];

  // Функция для получения недавно измененных
  const getRecentFiles = () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return files
      .filter((file) => file.timestamp >= threeDaysAgo)
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  const recentFiles = getRecentFiles();

  // Фильтрация файлов (все файлы) с учетом поиска
  const getFilteredFiles = () => {
    let filtered = files;
    if (selectedCategory) {
      filtered = filtered.filter((file) => file.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  const filteredFiles = getFilteredFiles();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    if (isFilesCollapsed) setIsFilesCollapsed(false);
  };

  const toggleFilesCollapse = () => {
    setIsFilesCollapsed(!isFilesCollapsed);
  };

  // Добавление/удаление из избранного
  const toggleFavorite = (fileId) => {
    if (favorites.some((fav) => fav.id === fileId)) {
      setFavorites(favorites.filter((fav) => fav.id !== fileId));
    } else {
      const file = files.find((f) => f.id === fileId);
      if (file) setFavorites([...favorites, file]);
    }
  };

  // Обработчики для таблицы файлов (Все файлы)
  const handleFilesEdit = (fileId) => {
    const newName = prompt("Введите новое название файла:");
    if (newName) {
      setFiles(
        files.map((file) =>
          file.id === fileId
            ? { ...file, name: newName, timestamp: new Date() }
            : file
        )
      );
    }
    setShowFilesMenu(null);
  };

  const handleFilesDelete = (fileId) => {
    setFiles(files.filter((file) => file.id !== fileId));
    setShowFilesMenu(null);
  };

  const handleFilesAddToFavorites = (fileId) => {
    toggleFavorite(fileId);
    setShowFilesMenu(null);
  };

  // Обработчики для таблицы "Недавние"
  const handleRecentEdit = (fileId) => {
    const newName = prompt("Введите новое название файла:");
    if (newName) {
      setFiles(
        files.map((file) =>
          file.id === fileId
            ? { ...file, name: newName, timestamp: new Date() }
            : file
        )
      );
    }
    setShowRecentMenu(null);
  };

  const handleRecentDelete = (fileId) => {
    setFiles(files.filter((file) => file.id !== fileId));
    setShowRecentMenu(null);
  };

  const handleRecentAddToFavorites = (fileId) => {
    toggleFavorite(fileId);
    setShowRecentMenu(null);
  };

  return (
    <div className="main">
      <div className="header">
        <div className="search">
          <button>
            <i className="ri-search-2-line"></i>
          </button>
          <input
            type="text"
            placeholder={
              selectedCategory
                ? `Поиск в ${selectedCategory}`
                : "Поиск среди всех файлов"
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={activeSection === "Избранное"}
          />
          <i className="ri-equalizer-line"></i>
        </div>
        <div className="icon-btns">
          <i className="ri-notification-line"></i>
          <i className="ri-message-3-line"></i>
          <i className="ri-menu-line" id="menu-btn" onClick={toggleMenu}></i>
        </div>
      </div>

      {activeSection !== "Избранное" && (
        <>
          <h3 className="separator">Быстрый доступ</h3>
          <div className="quick-access">
            {quickAccessCategories.map((category) => (
              <div
                key={category.name}
                className={`item ${
                  selectedCategory === category.name ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <i className={category.icon}></i>
                <h5>{category.name}</h5>
                <p>{category.count}</p>
              </div>
            ))}
          </div>

          <div className="section-header">
            <h3 className="separator">{selectedCategory || "Все файлы"}</h3>
            <i
              className={
                isFilesCollapsed ? "ri-arrow-down-s-line" : "ri-arrow-up-s-line"
              }
              onClick={toggleFilesCollapse}
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                fontSize: "20px",
                color: "#364670",
              }}
            ></i>
          </div>
          {!isFilesCollapsed && (
            <table>
              <tbody>
                {filteredFiles.map((file) => (
                  <tr
                    key={file.id}
                    className={selectedFiles === file.id ? "selected" : ""}
                    onClick={() => setSelectedFiles(file.id)}
                  >
                    <td className="icon">
                      <i
                        className={file.icon}
                        style={{ color: file.color, backgroundColor: file.bg }}
                      ></i>
                    </td>
                    <td className="name">{file.name}</td>
                    <td className="extension">{file.type}</td>
                    <td className="size">{file.size}</td>
                    <td className="favorite">
                      <i
                        className={
                          favorites.some((fav) => fav.id === file.id)
                            ? "ri-star-fill"
                            : "ri-star-line"
                        }
                        style={{
                          color: favorites.some((fav) => fav.id === file.id)
                            ? "#ffd12c"
                            : "#999",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(file.id);
                        }}
                      ></i>
                    </td>
                    <td className="more">
                      <i
                        className="ri-more-fill"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowFilesMenu(
                            showFilesMenu === file.id ? null : file.id
                          );
                        }}
                      ></i>
                      {showFilesMenu === file.id && (
                        <div className="context-menu">
                          <div onClick={() => handleFilesEdit(file.id)}>
                            Редактировать
                          </div>
                          <div onClick={() => handleFilesDelete(file.id)}>
                            Удалить
                          </div>
                          <div
                            onClick={() => handleFilesAddToFavorites(file.id)}
                          >
                            Добавить в избранное
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {activeSection === "Избранное" && favorites.length > 0 && (
        <div className="favorites-content">
          <h3 className="separator">Избранное</h3>
          <table>
            <tbody>
              {favorites.map((file) => (
                <tr key={file.id}>
                  <td className="icon">
                    <i
                      className={file.icon}
                      style={{ color: file.color, backgroundColor: file.bg }}
                    ></i>
                  </td>
                  <td className="name">{file.name}</td>
                  <td className="extension">{file.type}</td>
                  <td className="size">{file.size}</td>
                  <td className="favorite">
                    <i
                      className="ri-star-fill"
                      style={{ color: "#ffd12c", cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(file.id);
                      }}
                    ></i>
                  </td>
                  <td className="more">
                    <i
                      className="ri-more-fill"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowFilesMenu(null); // Сбрасываем контекстное меню для избранного
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeSection !== "Избранное" && <h3 className="separator">Недавние</h3>}
      {activeSection !== "Избранное" && (
        <table>
          <tbody>
            {recentFiles.map((file) => (
              <tr
                key={file.id}
                className={selectedRecentFile === file.id ? "selected" : ""}
                onClick={() => setSelectedRecentFile(file.id)}
              >
                <td className="icon">
                  <i
                    className={file.icon}
                    style={{ color: file.color, backgroundColor: file.bg }}
                  ></i>
                </td>
                <td className="name">{file.name}</td>
                <td className="extension">{file.type}</td>
                <td className="size">{file.size}</td>
                <td className="favorite">
                  <i
                    className={
                      favorites.some((fav) => fav.id === file.id)
                        ? "ri-star-fill"
                        : "ri-star-line"
                    }
                    style={{
                      color: favorites.some((fav) => fav.id === file.id)
                        ? "#ffd12c"
                        : "#999",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(file.id);
                    }}
                  ></i>
                </td>
                <td className="more">
                  <i
                    className="ri-more-fill"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowRecentMenu(
                        showRecentMenu === file.id ? null : file.id
                      );
                    }}
                  ></i>
                  {showRecentMenu === file.id && (
                    <div className="context-menu">
                      <div onClick={() => handleRecentEdit(file.id)}>
                        Редактировать
                      </div>
                      <div onClick={() => handleRecentDelete(file.id)}>
                        Удалить
                      </div>
                      <div onClick={() => handleRecentAddToFavorites(file.id)}>
                        Добавить в избранное
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MainContent;
