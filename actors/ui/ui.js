"use Client"
import { useState } from "react";
import { motion } from "framer-motion";
import style from "./ui.module.css";
import Upload from "../upload/upload";

export default function Ui(props) {
    const [isUpload, setUpload] = useState("");
    return (
        <>
            <Upload trigger={isUpload}></Upload>
            <motion.div className={`${style.ui}`}>
                <img onClick={()=>{setUpload(props.PREV);}}className={style.uiDiv} src="/assets/뒤로가기버튼.png"></img>
                <img onClick={()=>{setUpload(`home`);}} className={style.uiDiv} src="/assets/홈버튼.png"></img>
            </motion.div>
        </>
    );
}