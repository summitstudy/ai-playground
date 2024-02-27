"use client"
import { useContext } from 'react';
import Context from '@/utils/context.js';
import { translate } from '@/utils/translate.js';
import { useRouter } from "next/navigation";
export default function LoginBtn() {
    const { language } = useContext(Context);
    const router = useRouter();
    function gotoLogin() {
        router.push("/signin");
    }
    return (
        <button onClick={() => { gotoLogin() }} className="f1">
            {translate('로그인', language)}
        </button>
    );
}