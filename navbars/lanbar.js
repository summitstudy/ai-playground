"use client"
import { useContext } from 'react';
import Context from '@/utils/context.js';
import style from "./navbar.module.css";

export default function Lanbar() {
    const { language, setLanguage } = useContext(Context);

    function lanChange(e) {
        setLanguage(e.target.value);
    }
    return(
        <div>
           <select className={`f1 ${style.다국어메뉴}`} value={language} onChange={lanChange}>
                <option value="ko">한국어</option>
                <option value="en">English</option>
            </select>
        </div>
    )
}