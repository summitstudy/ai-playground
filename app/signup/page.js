"use client"
import style from "./signup.module.css";
import { useState, useContext } from 'react';
import Context from '@/utils/context.js';
import { translate } from '@/utils/translate.js';

export default function Register() {
    const { language } = useContext(Context);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
        } else {
            alert(data.message);
            window.location.href = '/';
        }
    }

    return (
        <div className="f1 c1">
            <div className={`${style.signup1}`}>
                <div>{translate('회원가입', language)}</div>
                <div>개인정보수집이용 동의</div>
                <form onSubmit={handleSubmit}>
                    <p>아이디: <input name="email" type="text" placeholder="ID" value={formData.email} onChange={handleChange} /></p>
                    <p>비밀번호: <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} /></p>
                    <p>비밀번호 확인: <input name="password2" type="password" placeholder="Password check" value={formData.password2} onChange={handleChange} /></p>
                    <p>이름: <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} /></p>
                    <button type="submit">가입완료</button>
                </form>
                </div>
        </div>
    )
}
