"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import style from "@/utils/app.module.css";
import ResizeableComponent from '@/utils/resizeable.js';
import { SetProvider } from '@/utils/context.js';
import Navbar from '@/navbars/navbar.js';
import Lanbar from '@/navbars/lanbar';

export default function Parents({ children, session }) {
    const [isBan, setBan] = useState(0);
    useEffect(() => {
        if (navigator.userAgent.indexOf('KAKAO') >= 0) {
            // alert("카카오톡 인앱을 지원하지 않습니다. 다른 브라우저로 시도해주세요.");
            setBan(1);
        }
        if (navigator.userAgent.indexOf('Firefox') >= 0) {
            // alert("파이어폭스 브라우저를 지원하지 않습니다. 다른 브라우저로 시도해주세요.");
            setBan(1);
        }
        if (navigator.userAgent.indexOf('[FB') >= 0) setBan(1); //페이스북
        if (navigator.userAgent.indexOf('Instagram') >= 0) setBan(1); //인스타그램
        if (navigator.userAgent.indexOf('trill') >= 0) setBan(1); //틱톡
    }, [])
    return (
        <div>
            {isBan === 1 ? (
                <div className="f1 c1" style={{ marginTop: "100px", padding: "20px", fontSize: "24px" }}>
                    <img src="/img/브라우저분기.png" style={{ width: "auto", height: "300px", position: "absolute", top: "50px" }}></img>
                </div>
            ) : (
                <SetProvider>
                    <Navbar session={session}></Navbar>
                    <div id="root" className={style.root}>
                        <ResizeableComponent>
                            {children}
                        </ResizeableComponent>
                    </div>
                    <div className={`${style.lan}`} style={{ zIndex: 1001 }}>
                        <Lanbar></Lanbar>
                    </div>
                </SetProvider>
            )}
        </div>
    )
}