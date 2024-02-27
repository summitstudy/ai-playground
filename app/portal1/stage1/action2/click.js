"use client"
import React, { useState, useEffect,useContext } from 'react';
import Context from '@/utils/context.js';
import { translate } from '@/utils/translate.js';
import { motion } from "framer-motion";
import style from "./action2.module.css";

export default function Click({ isFrame, setFrame }) {
    const { language } = useContext(Context);
    const [isVisible, setIsVisible] = useState(false);
    const [isLeftTop, setLeftTop] = useState({
        top: "60px",
        left: "338px"
    })
    useEffect(() => {
        if (isFrame === 35) {
            setLeftTop({
                top: "60px",
                left: "703px"
            })
        }
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className={`${style.rock2Click} aniUp`} style={{
            top: isLeftTop.top,
            left: isLeftTop.left, display: isVisible ? 'block' : 'none'
        }} onClick={() => { setFrame(isFrame + 1) }}>
            <div className={style.rock2ClickDiv}>{translate('클릭', language)}</div>
        </div>
    );
}
