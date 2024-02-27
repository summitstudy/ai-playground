"use client"
import { useRef, useState,useContext } from 'react';
import { motion } from 'framer-motion';
import Upload from "@/actors/upload/upload.js";
import style from "./menu.module.css";
import Context from '@/utils/context.js';
import { translate } from '@/utils/translate.js';
import Ui from "@/actors/ui/ui.js";

export default function Menu(props) {
  const { language } = useContext(Context);
  // const chapters = new Set(props.result.chapter.split(' ').map(Number));
  const chapters = new Set([1,2]); 
  const boxRef = useRef(null);
  const [isUpload, setUpload] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const 임시챕터이름 = ["결정 나무","가장 가까운 이웃"];

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="f2 c1">
      <img src="/img/동산배경.png" className={`b1 ${style.menubg}`}></img>
      <div className='b2'></div>
      <Ui PREV = "home"></Ui>
      <Upload trigger={isUpload}></Upload>
      <div className={`${style.menu1} aniUp f3`} ref={boxRef}>
        <motion.div className={`${style.menu2}`} drag='x' dragConstraints={boxRef}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}>
          {Array.from({ length: 5 }).map((a, i) => (
            <motion.div whileHover={chapters.has(i + 1) ? { scale: 1.0 } : {}}
              onHoverStart={e => { }}
              onHoverEnd={e => { }}
              key={i}
              className={`${style.menu3} ${!chapters.has(i + 1) ? style.menu3Lock : i % 2 === 0 ? style.menu3Even : style.menu3Odd}`}
              onClick={() => {
                if (chapters.has(i + 1) && !isDragging && ((i+1) != 2)) {
                  setUpload(`portal1/stage${i + 1}`);
                }
              }}>
              {
                chapters.has(i + 1)
                  ? <>
                  <div style={{marginBottom:"10px"}}>{`${translate('스테이지', language)}${i+1}`}</div>
                  <div style={{fontSize:"28px"}}>{`${translate(임시챕터이름[i], language)}`}</div>
                  <div className={`${style.menu4}`}></div>
                  </>
                  : <>
                  <div style={{marginBottom:"10px"}}>{`${translate('스테이지', language)}${i+1}`}</div>
                  <div style={{fontSize:"28px"}}>{translate('잠김', language)}</div>
                  <div className={`${style.menu4Lock}`}>
                  <object type="image/svg+xml" data="/assets/locker.svg" className={style.menu3Svg}></object>
                  </div>
                  </>
              }
            </motion.div>
          ))}
        </motion.div>
      </div>
      <img src="/actors/mimi/미미웃음고정.png" className={`${style.미미꾸미기} aniLeft`}></img>
    </div>
  )
}