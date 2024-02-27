// import userinfo from "@/utils/getuserinfo.js";
import Menu from "./menu.js";

export default async function Menupage() {
    let user;
    if(user) {
        // user = await userinfo();
    }else{
        user = '';
    }
    
    if(!(user) && false) {
        return (
            <div className="f2 c1">
                <div>
                    로그인이 필요한 페이지 입니다.
                </div>
            </div>
        )
    }else{
        return (
            <>
            <Menu result={user.result}></Menu>
            </>
        );
    }
}