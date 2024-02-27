"use client"
import style from "@/navbars/navbar.module.css";
import LoginBtn from '@/navbars/loginBtn.js';
import LogOutBtn from '@/navbars/logoutBtn.js';
import Link from "next/link";
import Lanbar from "./lanbar.js";
import { useContext } from 'react';
import Context from '@/utils/context.js';
import { translate } from '@/utils/translate.js';

export default function Navbar({ session }) {
  const { language } = useContext(Context);
  return (
    <div className={`${style.navbar} f1`}>
      <div className={style.leftComponent}>
        <Link href="/"><img style={{ width: "80px", height: "auto" }} src="/navbar/logo.png"></img></Link>
      </div>
      <div>
        <div className={style.rightDiv}>
          <span style={{ marginRight: "15px" }}>{'사용자1'}</span><LogOutBtn></LogOutBtn>
        </div>
      </div>
    </div>
  )
}