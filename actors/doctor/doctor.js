"use client"
import style from "./doctor.module.css";
export default function Doctor({handleDoctor}) {
    return (
        <>
            <div 
            className={`${style.doctorBox} ${handleDoctor.add}`}
            style={{
                width: handleDoctor.width,
                height: handleDoctor.height,
                top: handleDoctor.top,
                left: handleDoctor.left,
                
            }}>
                 <object type="image/svg+xml" data="/actors/mimi/미미기본애니.svg" className={`${style.doctor}`}></object>
            </div>
        </>
    )
}