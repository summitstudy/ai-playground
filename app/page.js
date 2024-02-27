"use client"
import { useState, useContext, useEffect, useRef } from 'react';
import Context from '@/utils/context.js';
import { motion } from 'framer-motion';
import { translate } from '@/utils/translate.js';
import Upload from "@/actors/upload/upload.js";
import style from "./page.module.css";

export default function App() {
  const { language } = useContext(Context);
  const [isUpload, setUpload] = useState("");
  const chapters = new Set([1]);
  const boxRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };
    return (
      <div className="f2 c1">
        <img src="/img/하늘배경.png" className="b1"></img>
        <div className='b2'></div>
        
        <Upload trigger={isUpload}></Upload>
        {/* <div style={{ zIndex: "1",position:"absolute",top: "-30px" }} className="f3">
        <h2>챕터 선택하기</h2>
      </div> */}
        <div style={{ zIndex: "2" }}>
          <div className={style.menu1} ref={boxRef}>
            <motion.div className={style.menu2} drag='y' dragConstraints={boxRef}
              initial={{ y: -300 }}
              animate={{
                y: 250,
                transition: { duration: 1, ease: "easeInOut" }
              }}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}>
              {Array.from({ length: 5 }).map((a, i) => (
                <motion.div
                  onHoverStart={e => { }}
                  onHoverEnd={e => { }}
                  key={i}
                  className={`${style.menu3} f3 ${i % 2 === 0 ? style.menu3Even : style.menu3Odd}`}
                  onClick={() => {
                    if (chapters.has(i + 1) && !isDragging) {
                      setUpload(`portal${i + 1}`);
                    }
                  }}>
                  <div className={style.구름부모}>
                    {
                      chapters.has(i + 1)
                        ? <motion.div>
                          <object type="image/svg+xml" data="/assets/cloud.svg"
                            className={style.구름자식}></object>
                          <div className={style.구름설명}>{translate('포털', language)}{i + 1}</div></motion.div>
                        : <motion.div><object type="image/svg+xml" data="/assets/cloudlock.svg"
                          className={style.구름자식}></object>
                          <div className={style.구름설명}></div></motion.div>
                    }
                    {
                      (i !== 4) ?
                        ((i % 2 === 0) ? <object type="image/svg+xml" data="/assets/cloudline.svg"
                          className={style.구름막대왼쪽}></object> : <object type="image/svg+xml" data="/assets/cloudline.svg"
                            className={style.구름막대오른쪽}></object>) : <></>
                    }
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        <img src="/actors/mimi/미미스카이고정.png" className={`${style.미미꾸미기} aniRight`}></img>
      </div>
    );
}
/*<button className="f2" onClick={() => { setUpload("menu") }}>게임시작</button> */