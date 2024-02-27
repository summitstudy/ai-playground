"use client"
import { useState } from 'react';
import { signIn } from "next-auth/react";
import Link from 'next/link';

export default function Login() {
    const [isLoginFail, setLoginFail] = useState(""); // 오류 메시지를 저장할 상태
    const handleLogin = async (e) => {
        e.preventDefault(); //새로고침 방지
        const email = e.target.email.value;
        const password = e.target.password.value;
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        if (!(result.error)) {
            window.location.href = '/';
        } else {
            setLoginFail("로그인 실패: 이메일 또는 비밀번호가 올바르지 않습니다.");
        }
    };
    const GoogleLogin = () => {
        signIn('google', { callbackUrl: '/' });
    };

    return (
        <div className='c1 f1'>
            <form onSubmit={handleLogin}>
                <input name="email" type="text" required />
                <input name="password" type="password" required />
                <button type="submit">로그인</button>
                {isLoginFail && <div className="error-message">{isLoginFail}</div>}
            </form>
            <button onClick={GoogleLogin}>구글로 로그인</button><br></br>
            <Link href="/signup">회원가입</Link>
        </div>
    );
}
