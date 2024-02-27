import { motion } from "framer-motion";
import { useContext, useEffect } from 'react';
import Context from '@/utils/context.js';
import { translate } from '@/utils/translate.js';
import style from "./tag.module.css"

export default function Tag({ isChapter }) {
    const { language } = useContext(Context);
    return (
        <div className={`${style.tagGame} f3`}>
            <div className={`${style.tagBox}`}>
                <motion.div
                    className={`${style.tagDiv}`}
                    initial={{ x: '100%' }} // 왼쪽에서 시작
                    animate={{ x: 0 }}      // 최종 위치로 이동
                    transition={{ duration: 0.5, delay: 1,ease: "easeOut" }}
                >
                    <div>{translate(`ch${isChapter}_미션`, language)}</div>
                </motion.div>
            </div>
        </div>
    );
}
