"use Client"
import { useContext, useEffect, useState } from 'react'; // useState를 추가로 임포트
import Context from '@/utils/context.js';
import { translate } from '@/utils/translate.js';
import { motion } from "framer-motion";
import style from "./action2.module.css";

export default function Feature2({ isFrame, setFrame, isFeature2, setFeature2 }) {
    const { language } = useContext(Context);
    const [selectedFeatures, setSelectedFeatures] = useState([]); // 이전에 선택된 특징들을 저장할 배열 상태
    const [handleAni, setHandleAni] = useState("rock2Feature");
    const [handleAni2, setHandleAni2] = useState("");
    const handleFeatureSelect = (feature) => {
        if (isFrame === 27) {
            setFeature2([feature]);
            setFrame(28);
            if (!selectedFeatures.includes(feature)) { // 현재 선택된 특징이 배열에 없으면 추가
                setSelectedFeatures([...selectedFeatures, feature]);
            }
        }
        if (isFrame === 32 && !selectedFeatures.includes(feature)) {
            setFeature2([feature]);
            setFrame(33);
        }
        if (isFrame === 39 && !selectedFeatures.includes(feature)) {
            setFeature2([feature]);
            setFrame(40);
        }

    };
    useEffect(() => {
        if (isFrame === 38) { //아무것도 선택하지 않음, 바로 39로 넘어감
            setFeature2([]);
            setSelectedFeatures(selectedFeatures.slice(0, 1));
            setFrame(39);
        }
        if (isFrame === 42) {
            setHandleAni("rock2Feature");
            setHandleAni2("aniTran aniHide");
            setSelectedFeatures(["울퉁불퉁하다", "크기가 작다", "반짝거린다"]);
        }
    }, [isFrame])

    return (
        <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1.0 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className={`${style[handleAni]} ${handleAni2}`}>
            <div className={isFeature2[0] === '울퉁불퉁하다' ? `${style.rock2FeatureDiv} ${style.rock2FeatureSelect}` : selectedFeatures.includes('울퉁불퉁하다') ? `${style.rock2FeatureDiv} ${style.rock2FeatureSelected}` : style.rock2FeatureDiv}
                onClick={() => handleFeatureSelect('울퉁불퉁하다')}>
                {translate('울퉁불퉁하다', language)}
            </div>
            <div className={isFeature2[0] === '반짝거린다' ? `${style.rock2FeatureDiv} ${style.rock2FeatureSelect}` : selectedFeatures.includes('반짝거린다') ? `${style.rock2FeatureDiv} ${style.rock2FeatureSelected}` : style.rock2FeatureDiv}
                onClick={() => handleFeatureSelect('반짝거린다')}>
                {translate('반짝거린다', language)}
            </div>
            <div className={isFeature2[0] === '크기가 작다' ? `${style.rock2FeatureDiv} ${style.rock2FeatureSelect}` : selectedFeatures.includes('크기가 작다') ? `${style.rock2FeatureDiv} ${style.rock2FeatureSelected}` : style.rock2FeatureDiv}
                onClick={() => handleFeatureSelect('크기가 작다')}>
                {translate('크기가 작다', language)}
            </div>

        </motion.div>
    );
}
