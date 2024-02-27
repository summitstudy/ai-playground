"use client"
import { useState, useEffect } from 'react';
import Mimi from '@/actors/mimi/mimi.js';
import Doctor from '@/actors/doctor/doctor.js';
import Dialogue from '@/actors/dialogue/dialogue.js';
import Rock2 from './action2/rock2';
import Tag from "@/actors/tag/tag.js";
import Feature2 from './action2/feature2';
import Click from './action2/click.js';
import Ui from "@/actors/ui/ui.js"
export default function Scene() {
    const [isFrame, setFrame] = useState(25);
    const [isChapter, setChapter] = useState(1);
    const [isFeature2, setFeature2] = useState([]);

    const [handleMimi, setHandleMimi] = useState(
        {
            width: '250px',
            height: '250px',
            top: '400px',
            left: '50px',
            add: "aniTran aniLeft",
        });
    const mimiState = {
        0: { ...handleMimi },
    };

    const [handleDoctor, setHandleDoctor] = useState({
        width: '270px',
        height: '270px',
        top: '395px',
        left: '930px',
        backgroundColor: "#f1f3f5",
        add: "aniTran aniRight"
    });
    const doctorState = {
        0: { ...handleDoctor },
    };

    const [handleDia, setHandleDia] = useState({
        width: '800px',
        height: '200px',
        top: '480px',
        left: '250px',
        backgroundColor: "#ffffff", //박스의 색깔
        speaker: "Doctor", //화자
        move: 1,
        select: [],
    });
    const diaState = { //select랑 move는 늘 신경써야한다
        25: { ...handleDia, speaker: "Doctor", move: 2 },
        27: { ...handleDia, move: -1 },
        28: { ...handleDia, add: "aniTran", backgroundColor: "#ffffff", speaker: "Doctor", move: 1 },
        29: { ...handleDia, add: "aniTran", move: -1 },
        30: { ...handleDia, add: "aniTran aniNonHide", speaker: "Doctor", move: 1 },
        31: { ...handleDia, move: -1 },
        33: { ...handleDia, add: "aniTran", move: -1 },
        35: { ...handleDia, move: -1 },
        36: { ...handleDia },
        37: { ...handleDia, add: "aniTran", backgroundColor: "#ffffff", speaker: "Doctor", move: 1 },//점프
        38: { ...handleDia, add: "aniTran aniNonHide", speaker: "Doctor", move: -1 },
        40: { ...handleDia, add: "aniTran", move: -1 },
        42: { ...handleDia, add: "aniTran", backgroundColor: "#ffffff", speaker: "Doctor", move: -1 },
        43: { ...handleDia, add: "dialogueWhite aniTran", speaker: "Guide", backgroundColor: "rgb(0,0,0,0.6)", move: -2 },
        43: { ...handleDia, add: "dialogueWhite aniTran", speaker: "Guide", backgroundColor: "rgb(0,0,0,0.6)", move: -2 },
        47: { ...handleDia, add: "aniTran aniHide", move: -1 }
    };

    useEffect(() => {
        if (mimiState[isFrame]) {
            setHandleMimi(mimiState[isFrame]);
        }
        if (doctorState[isFrame]) {
            setHandleDoctor(doctorState[isFrame]);
        }
        if (diaState[isFrame]) {
            setHandleDia(diaState[isFrame]);
        }
    }, [isFrame]);

    return (
        <div className="f2 c1">
            <img src="/img/광산배경.png" className="b1"></img>
            {/* <div className='b2'></div> */}
            {/* <Mimi handleMimi={handleMimi}></Mimi>
            <Doctor handleDoctor={handleDoctor}></Doctor> */}
            <Dialogue handleDia={handleDia} isFrame={isFrame} setFrame={setFrame}
                isChapter={isChapter} isSelect={isFeature2}></Dialogue>

            {[25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
                36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47].includes(isFrame) && ( //미션 시작 태그
                    <>
                        <Ui PREV="portal1"></Ui>
                        <Tag isChapter={isChapter}></Tag>
                    </>
                )}
            {[25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47].includes(isFrame) && ( //게임2
                <Rock2 isFrame={isFrame} setFrame={setFrame} isFeature2={isFeature2} setFeature2={setFeature2} ></Rock2>
            )}
            {[27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47].includes(isFrame) && ( //게임2 피쳐 선택 버튼
                <Feature2 isFrame={isFrame} setFrame={setFrame} isFeature2={isFeature2} setFeature2={setFeature2}></Feature2>
            )}
            {[31, 35].includes(isFrame) && ( //Click버튼
                <Click isFrame={isFrame} setFrame={setFrame}></Click>
            )}
        </div>
    );
}
