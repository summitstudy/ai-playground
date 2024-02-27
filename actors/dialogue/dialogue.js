import { useReducer, useContext, useEffect, useState } from 'react';
import Context from '@/utils/context.js';
import { translate } from '@/utils/translate.js';
import { motion } from "framer-motion"
import style from "./dialogue.module.css";

export default function Dialogue({ handleDia, isFrame, setFrame, isChapter, isSelect }) {
    const { language } = useContext(Context);

    const typingReducer = (state, action) => {
        switch (action.type) {
            case 'APPEND':
                return state + action.char;
            case 'RESET':
                return '';
            default:
                throw new Error();
        }
    };

    const [dialogue, dispatch] = useReducer(typingReducer, '');
    const [btn, setBtn] = useState('aniNone');
    const typingSpeed = 30;

    useEffect(() => {
        setBtn('aniNone');
        dispatch({ type: 'RESET' });
        let index = 0;
        let text = translate(`ch${isChapter}_${isFrame}`, language);
        let lanText = [];
        for (let i = 0; i < isSelect.length; i++) {
            lanText[i] = translate(isSelect[i], language);
            text = text.replace('$$', lanText[i]);
        }

        if (handleDia.move === -1 || handleDia.move === -2) {
            setTimeout(() => {
                const typingInterval = setInterval(() => {
                    if (index < text.length) {
                        dispatch({ type: 'APPEND', char: text.charAt(index) });
                        index++;
                    } else {
                        clearInterval(typingInterval);
                        setBtn('aniBlock');
                    }
                }, typingSpeed);
                return () => clearInterval(typingInterval);
            }, 1000)
        }
        else {
            const typingInterval = setInterval(() => {
                if (index < text.length) {
                    dispatch({ type: 'APPEND', char: text.charAt(index) });
                    index++;
                } else {
                    clearInterval(typingInterval);
                    setBtn('aniBlock');
                }
            }, typingSpeed);
            return () => clearInterval(typingInterval);
        }
    }, [isFrame, language]);

    const [currentFrame, setCurrentFrame] = useState(isFrame); //깜빡임 제거
    useEffect(() => {
        setCurrentFrame(isFrame); //변화시킴(2)
    }, [isFrame]); //변하는 얘를 기준으로(1)

    return (
        <>
            <motion.div
                className={`${style.dialogue} ${handleDia.add}`}
                initial={{ scale: 1.2 }}
                animate={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{
                    width: handleDia.width,
                    minHeight: handleDia.height,
                    top: handleDia.top,
                    left: handleDia.left
                }}
            >
                {/* <div className={`${style.dialogueSpeaker}  ${style[handleDia.speaker]} f3`}>
                    {translate(handleDia.speaker, language)}
                </div> */}
                {(handleDia.select.length === 0) && (
                    <>
                        {dialogue}
                        {handleDia.move != -1 && handleDia.move != -2 ? <button className={`${style.dialogueBtn} ${btn}`}
                            onClick={() => setFrame(isFrame + handleDia.move)}>▶</button> : <></>}
                        {handleDia.move === -2 ? <button className={`${style.dialogueBtn} ${btn}`}
                            onClick={() => setFrame(isFrame + 1)}>▶</button> : <></>}
                    </>
                )}
                {handleDia.select.length > 0 && (
                    translate(`ch${isChapter}_${currentFrame}`, language).split('\n').map((line, i) => (
                        <motion.div className={`${style.dialogueOption}`} key={i}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1.0 }}
                            transition={{ type: "spring", stiffness: 80, damping: 10 }}>
                            <div className={`${style.dialogueSelect}`}>{line}</div>
                            <button className={`${style.dialogueBtn2}`} onClick={() => setFrame(handleDia.select[i])}>▶</button>
                        </motion.div>
                    ))
                )}
            </motion.div>
        </>
    );
}
