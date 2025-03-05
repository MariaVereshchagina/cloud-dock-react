import React from "react";
import "./RightSection.css";
import userImage from "../assets/user.png";

const RightSection = ({ onFileAdd, files, usedSpace, setUsedSpace }) => {
  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const newFiles = uploadedFiles.map((file) => {
      const extension = file.name.split(".").pop().toUpperCase();
      const sizeMB = (file.size / 1024 / 1024).toFixed(1); // Размер в МБ
      const category = getCategoryFromExtension(extension);
      const { icon, color, bg } = getFileStyle(category);

      return {
        id: Date.now() + Math.random(),
        name: file.name,
        type: `${extension} Файл`,
        size: `${sizeMB} MB`,
        icon,
        color,
        bg,
        category,
        timestamp: new Date(),
      };
    });

    // Обновляем файлы через пропс
    onFileAdd(newFiles);
  };

  // Определение категории по расширению
  const getCategoryFromExtension = (extension) => {
    switch (extension.toLowerCase()) {
      case "png":
      case "jpg":
      case "jpeg":
        return "Картинки";
      case "docx":
      case "pptx":
      case "pdf":
        return "Документы";
      case "mp3":
      case "wav":
        return "Звуки";
      case "mp4":
      case "avi":
        return "Видео";
      default:
        return "Документы";
    }
  };

  // Определение стиля иконки по категории
  const getFileStyle = (category) => {
    switch (category) {
      case "Картинки":
        return { icon: "ri-image-fill", color: "#1976d2", bg: "#e6e4ec" };
      case "Документы":
        return { icon: "ri-file-3-fill", color: "#1d92f1", bg: "#ddeffd" };
      case "Звуки":
        return { icon: "ri-music-2-fill", color: "#ffd12c", bg: "#fff8df" };
      case "Видео":
        return { icon: "ri-video-on-fill", color: "#3bc963", bg: "#e2f7e8" };
      default:
        return { icon: "ri-file-3-fill", color: "#1d92f1", bg: "#ddeffd" };
    }
  };

  const freeSpace = 50000 - usedSpace; // 50 ГБ = 50000 MB
  const usedPercentage = (usedSpace / 50000) * 100;
  console.log("usedSpace (MB):", usedSpace, "usedPercentage:", usedPercentage); // Отладка

  return (
    <div className="right-section">
      <div className="profile">
        <div className="info">
          <img src={userImage} alt="Профиль" />
          <div className="account">
            <h5>Мария</h5>
            <p>Exapmle@gmail.com</p>
          </div>
        </div>
        <i className="ri-arrow-down-s-line"></i>
      </div>

      <div className="widgets">
        <div className="disk">
          <div className="progress">
            <div
              className="progress-bar"
              style={{
                background: `radial-gradient(closest-side, #fff 79%, transparent 80% 100%), conic-gradient(#1976d2 ${usedPercentage}%, #e9e4ff 0%)`,
              }}
            >
              <span className="progress-text">
                {usedPercentage.toFixed(2)}%
              </span>
              <span className="progress-subtext">использовано</span>
            </div>
          </div>
          <div className="info">
            <h5>
              <span>{Math.round(usedSpace)}</span> MB занято /{" "}
              <span>{Math.round(freeSpace)}</span> MB свободно
            </h5>
            <p>Доступное хранилище (50 ГБ)</p>
          </div>
        </div>

        <div className="bottom">
          <label className="upload-btn">
            Новый загрузчик <i className="ri-add-line"></i>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </label>

          <div className="premium">
            <div className="title">
              <i className="ri-folder-add-line"></i>
              <h5>Купить премиум</h5>
            </div>
            <p>Увеличьте объем хранилища сейчас и получите скидку 18%.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
