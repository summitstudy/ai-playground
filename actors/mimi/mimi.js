"use client"
import style from "./mimi.module.css";

export default function Mimi({handleMimi}) {
    return (
        <>
            <div
                className={`${style.mimiBox} ${handleMimi.add}`}
                style={{
                    width: handleMimi.width,
                    height: handleMimi.height,
                    top: handleMimi.top,
                    left: handleMimi.left,
                }}
            >
                {/* <object type="image/svg+xml" data="/actors/mimi/미미웃음고정.svg" className={`${style.mimi}`}></object> */}
            </div>
        </>
    );
}

