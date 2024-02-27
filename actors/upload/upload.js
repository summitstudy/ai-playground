"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion"
import style from "./upload.module.css"

export default function Upload(props) {
    const [isModal, setModal] = useState(false);
    const router = useRouter();

    const handleModal = () => {
        setModal(!isModal);
        setTimeout(()=>{
          router.push(`/${props.trigger}`);
        },1500);
    };
    const handleModalHome = () => {
        setModal(!isModal);
        setTimeout(()=>{
          router.push(`/`);
        },1500);
    };
    
    useEffect(() => {
        console.log(props.trigger);
        if (props.trigger == "home") {
            handleModalHome();
        }else if (props.trigger) {
            handleModal();
        }
    }, [props.trigger]);

    return (
        <>
            {isModal && (
                <motion.div
                    className={`${style.upload} f1`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    style={{zIndex:999}}
                ><span><object type="image/svg+xml" data="/assets/bubble.svg" className={style.버블}></object>
                    <br></br>{props.trigger}<br></br>Loading...</span>
                </motion.div> /*{props.trigger}*/
            )}
        </>
    );
}
