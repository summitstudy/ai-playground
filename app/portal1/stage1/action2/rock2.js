"use client"
import style from "../stage1.module.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dataset1 from "../dataset";
import { clusters } from '../cluster';
import { useContext } from 'react';
import Context from '@/utils/context.js';
import { translate } from '@/utils/translate.js';

let leftMineral;
let rightMineral;
let pokets = [];
let poketFeature = [];

export default function Rock({ isFrame, setFrame, isFeature2, setFeature2 }) {
    const { language } = useContext(Context);
    const initialMinerals = dataset1();
    const [minerals, setMinerals] = useState(initialMinerals); //***광물의 특성
    const [classes, setClasses] = useState(useClass(-80, 0, clusters[3])); //***광물 각각의 위치

    const [isSpot, setSpot] = useState({ x: 0, y: 50 }); //***가상 점
    const [isScale, setScale] = useState(1.7); //**가상 스케일 */
    const [isOrigin, setOrigin] = useState({ x: 0, y: 0 }); //**확대축소 기준점 */

    const [isTree, setTree] = useState(1); //트리 존재 여부
    const [isNode, setNode] = useState(0); //노드 존재 여부
    const [isNodeFeature, setNodeFeature] = useState([]); //처음엔 아무것도 선택되지 않는다.

    const [isTrans, setTrans] = useState([87, -35, 6, 35, -65, 84, -61, 39, -60, 44]); //기울이기
    const randomTrans = [87, -35, 6, 35, -65, 84, -61, 39, -60, 44];
    const plainTrans = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const [리셋, 셋리셋] = useState(0);


    function useClass(PX, PY, data) { //전체 이동 셋
        return data.map(item => ({
            x: item.x + PX,
            y: item.y + PY
        }));
    }
    const allMineral = dataset1(); // 미네랄 데이터셋 로드

    function useAnimate(leftBase, rightBase, shape, type, minerals, nodeNumber = -1, rule = 'shimmer') {
        const clusterData = clusters[shape];
        const clusterDataForGroups = {
            left: clusterData,
            right: clusterData
        };
        let groups = [];
        if (type === 1) { // 결정적으로 나누는 함수
            let leftGroup;
            let rightGroup;
            if (rule === 'shimmer' || rule === '반짝거린다') {
                leftGroup = minerals.filter(mineral => mineral.shimmer === "있다").sort((a, b) => a.hidden - b.hidden);
                rightGroup = minerals.filter(mineral => mineral.shimmer === "없다").sort((a, b) => a.hidden - b.hidden);
            } else if (rule === 'surface' || rule === '울퉁불퉁하다') {
                leftGroup = minerals.filter(mineral => mineral.surface === "울퉁불퉁하다").sort((a, b) => a.hidden - b.hidden);
                rightGroup = minerals.filter(mineral => mineral.surface === "매끈하다").sort((a, b) => a.hidden - b.hidden);
            } else if (rule === 'size' || rule === '크기가 작다') {
                leftGroup = minerals.filter(mineral => mineral.size === "작다").sort((a, b) => a.hidden - b.hidden);
                rightGroup = minerals.filter(mineral => mineral.size === "크다").sort((a, b) => a.hidden - b.hidden);
            }
            groups = [{ group: leftGroup, type: 'left' }, { group: rightGroup, type: 'right' }];
            if (nodeNumber === 1) { // 루트노드일 경우
                leftMineral = leftGroup;
                rightMineral = rightGroup;
            } else if (nodeNumber === 2) {
                pokets[0] = leftGroup;
                pokets[1] = rightGroup;
            } else if (nodeNumber === 3) {
                pokets[2] = leftGroup;
                pokets[3] = rightGroup;
            }
        } else if (type === 2) { // 합치는 함수
            const singleGroup = minerals.sort((a, b) => a.hidden - b.hidden);
            groups = [{ group: singleGroup, type: 'single' }];
        }

        // 현재의 위치 데이터를 복사하여 초기 상태 유지
        let newClasses = [...classes]; // classes는 현재 광물의 위치 정보를 담고 있는 배열을 가정

        groups.forEach(({ group, type }, groupIndex) => {
            const base = groupIndex === 0 ? leftBase : rightBase;
            const selectedClusterData = clusterDataForGroups[type] || clusterData;

            group.forEach((mineral, index) => {
                const clusterPosition = selectedClusterData[index];
                const newPosition = {
                    x: base.x + clusterPosition.x,
                    y: base.y + clusterPosition.y
                };
                newClasses[mineral.number - 1] = newPosition; // 새 위치 할당
            });
        });

        setClasses(newClasses); // 위치 정보 업데이트
    }

    useEffect(() => {
        if (isFrame === 29) { //한번 같이 보기로 하고 지켜보는 장면
            setNodeFeature([...isNodeFeature, isFeature2[0]])
            setSpot({ x: 0, y: 10 });
            setNode(1);
            setScale(1);
            setTimeout(() => {
                const leftBase = { x: -330, y: 170 };
                const rightBase = { x: 150, y: 170 };
                useAnimate(leftBase, rightBase, 2, 1, allMineral, 1, isFeature2[0]); //되긴 할 듯
            }, 1500);
            setTimeout(() => {
                setFrame(isFrame + 1);
            }, 2500)
        }
        if (isFrame === 31) {
            setSpot({ x: 0, y: -240 });
        }
        if (isFrame === 32) {
            setFeature2([]);
            setSpot({ x: 320, y: -300 });
            setScale(1.5);
        }
        if (isFrame === 33) {
            setNodeFeature([...isNodeFeature, isFeature2[0]])
            setFrame(isFrame + 1);
        }
        if (isFrame === 34) {
            setNode(2);
            setTimeout(() => { //왼쪽 두개로 가르기
                const leftBase = { x: -430, y: 440 };
                const rightBase = { x: -190, y: 440 };
                setScale(1.5);
                setSpot({ x: 320, y: -550 })
                useAnimate(leftBase, rightBase, 2, 1, leftMineral, 2, isFeature2[0]);
            }, 1000);
            setTimeout(() => {
                setFrame(isFrame + 1);
            }, 2000);
        }
        if (isFrame === 35) {
            setSpot({ x: 0, y: -250 });
            setScale(1);
        }
        if (isFrame === 36) {
            setSpot({ x: -350, y: -300 });
            setScale(1.5);
            setTimeout(() => { //불순한 경우와 순수한 경우가 있다
                const mineralTypes = new Set(rightMineral.map(mineral => mineral.sort));
                if (mineralTypes.size === 1) {
                    if (mineralTypes.has('diamond')) { //다이아몬드만 있는 경우
                    } else { //돌만 있는 경우
                    }
                    setFrame(isFrame + 2);
                } else { //다시 갈라야 하는 경우
                    setFrame(isFrame + 2);
                }
            }, 0);
        }
        if (isFrame === 40) {
            setNodeFeature([...isNodeFeature, isFeature2[0]]);
            setFrame(isFrame + 1);
        }
        if (isFrame === 41) {
            setNode(3);
            setTimeout(() => { //오른쪽 두개로 가르기
                const leftBase = { x: 50, y: 440 };
                const rightBase = { x: 300, y: 440 };
                setScale(1.5);
                setSpot({ x: -360, y: -550 })
                useAnimate(leftBase, rightBase, 2, 1, rightMineral, 3, isFeature2[0]);
            }, 1000);
            setTimeout(() => {
                setFrame(isFrame + 1);
            }, 2000);
        }
        if (isFrame === 42) { //게임 끝나고 전체를 보여주는 씬
            setSpot({ x: -10, y: -240 });
            setScale(1);
            for (let i = 0; i < 4; i++) {
                const mineralCounts = pokets[i].reduce((acc, mineral) => {
                    acc[mineral.sort] = (acc[mineral.sort] || 0) + 1;
                    return acc;
                }, {});
                const mineralTypes = new Set(pokets[i].map(mineral => mineral.sort));

                if (mineralTypes.size === 0) {
                    poketFeature = [...poketFeature, ''];
                } else if (mineralTypes.size === 1) {
                    if (mineralTypes.has('diamond')) { // 다이아몬드만 있는 경우
                        poketFeature = [...poketFeature, `분류에 성공하였습니다! [다이아몬드]를 ${mineralCounts['diamond']}개 회득했습니다!`];
                    } else { // 돌만 있는 경우
                        poketFeature = [...poketFeature, `[돌]을 ${mineralCounts['rock']}개 분류했습니다!`];
                    }
                } else { // 실패한 경우 (다이아몬드와 돌이 섞여 있는 경우)
                    poketFeature = [...poketFeature, `분류에 실패했습니다. 다이아몬드는 ${mineralCounts['diamond'] || 0}개, 돌은 ${mineralCounts['rock'] || 0}개 있습니다.`];
                }
            }
            setFeature2(poketFeature[0]);
        }
    }, [isFrame, 리셋]);

    return (
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 0.78 }} transition={{ type: "spring", stiffness: 200, damping: 10 }} className={style.rockGame}>
            <motion.div
                style={{
                    scale: isScale, //캠 비율
                    x: isSpot.x, //이미지 기준점 사각형 가상 공간
                    y: isSpot.y,
                    transition: 'transform 0.5s ease-in-out',
                    transformOrigin: `${isOrigin.x}px ${isOrigin.y}px` //나중에 얘를 조정해서 캠 이동을 할 것
                }}
                className={style.rockBox}
            >

                {minerals.map((a, i) => {
                    const scale = a.size === "크다" ? 1.55 : 1;
                    const svgFile = a.sort === "diamond" ? "다이아몬드.svg" : (a.sort === "rock" && a.surface === "매끈하다" ? "매끈한돌.svg" : "울퉁불퉁한돌.svg");

                    return (
                        <motion.div
                            key={a.number}
                            initial={{ x: classes[i].x, y: classes[i].y }}
                            animate={{
                                x: classes[i].x, y: classes[i].y,
                                rotate: isTrans[i],
                            }}
                            transition={{
                                type: "spring",
                                duration: 1,
                                ease: "easeInOut"
                            }}
                            className={style.rockDiv}
                            style={{ width: "50px", height: "50px", scale: scale, zIndex: (20 - i) }}

                        >
                            {a.shimmer === "있다" && (
                                // <object
                                //     type="image/svg+xml"
                                //     data="/stage1/반짝임.svg"
                                //     className={style.rockAbsolute}
                                // ></object>
                                <></>
                            )}
                            <object
                                type="image/svg+xml"
                                data={`/stage1/${svgFile}`}
                                className={`${style.rockSvg} ${a.shimmer === "없다" ? style.rockDarker : ""}`}
                            ></object>
                        </motion.div>
                    );
                })}
                {isTree === 1 && ( //나무모양분류기
                    <>
                        <motion.div
                            initial={{ scale: 0.5, x: -335, y: 0 }}
                            animate={{ scale: 1, x: -335, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 10
                            }}
                            style={{ width: "700px", height: "700px" }}
                            className={style.rockTree}
                        >
                            <object
                                type="image/svg+xml"
                                data="/stage1/나무모양개선.svg"
                                className={style.rockSvg}
                            ></object>
                        </motion.div>
                        <motion.div //바구니
                            initial={{ scale: 0.5, x: -480, y: 200 }}
                            animate={{ scale: 0.9, x: -490, y: 170 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 10
                            }}
                            style={{ width: "1000px", height: "1000px" }}
                            className={style.rockTree}
                        >
                            <object
                                type="image/svg+xml"
                                data="/stage1/기차하단.svg"
                                className={style.rockSvg}
                            ></object>
                        </motion.div>
                        <>
                            {[
                                { x: -85, y: 200, index: 0 },
                                { x: -316, y: 360, index: 1 },
                                { x: 148, y: 360, index: 2 },
                            ].slice(0, isNode).map(({ x, y, index }) => (
                                <motion.div
                                    initial={{ x, y, scale: 1.1 }}
                                    animate={{ x, y, scale: 1.0 }}
                                    className={`${style.rockNode}`}
                                >
                                    {translate(isNodeFeature[index], language)}
                                </motion.div>
                            ))}
                        </>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}