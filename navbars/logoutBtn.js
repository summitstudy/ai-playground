"use client"
import { useContext } from 'react';
import Context from '@/utils/context.js';
import { translate } from '@/utils/translate.js';
import { signOut } from 'next-auth/react';
export default function LogOutBtn() {
  const { language } = useContext(Context);
  const checkOut = () => {
    signOut({ redirect: true, callbackUrl: '/' });
  }
  return (
    <button className="f1"
      onClick={() => { }}>{translate('로그아웃', language)}</button>
  )
} 