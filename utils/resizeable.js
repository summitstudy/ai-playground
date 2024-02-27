import React, { useEffect } from 'react';
import style from "@/utils/app.module.css"

const ResizeableComponent = ({ children }) => {
  useEffect(() => {
    const FixRatio = () => {
      const root = document.querySelector("#root");
      const app = document.querySelector("#App");
    
      let standardHeight = 720; // 기존 1080
      let standardWidth = 1280; // 기존 1920
      app.style.width = `${standardWidth}px`;
      app.style.height = `${standardHeight}px`;
    
      // 여백을 고려한 실제 사용 가능한 root의 너비와 높이
      let availableWidth = root.clientWidth - 20; // 양 옆으로 10px씩 여백
      let availableHeight = root.clientHeight - 20; // 위아래로 10px씩 여백
    
      let width = availableWidth;
      let height = availableWidth * (standardHeight / standardWidth);
    
      // style.zoom을 이용하여 화면 크기 조정
      app.style.zoom = height / standardHeight;
    
      if (height > availableHeight) {
        height = availableHeight;
        width = availableHeight * (standardWidth / standardHeight);
        
        // style.zoom을 이용하여 화면 크기 조정
        app.style.zoom = width / standardWidth;
      }
    };

    window.onresize = FixRatio;
    FixRatio();

    // Cleanup function
    return () => {
      window.onresize = null;
    };
  }, []);

  return <div id="App" className={style.App}>{children}</div>;
};

export default ResizeableComponent;
