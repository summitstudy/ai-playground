// import userinfo from "@/utils/getuserinfo.js";
import Scene from "./scene.js";
export default async function Chapter1() {
    // let user = await userinfo();
    // let chapters;
    // if(user) {
    //     chapters = new Set(user.result.chapter.split(' ').map(Number));
    // } !(user) || !(chapters.has(1))) <<기존 조건문, 해당 챕터가 있어야한다.
    if(false) {
        return (
            <div className="f2 c1">
                <div>
                    접근 권한이 없어요.
                </div>
            </div>
        )
    }else{
        return (
            <Scene></Scene>
        );
    }
}