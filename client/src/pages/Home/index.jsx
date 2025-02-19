import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from './style.module.scss'
import { useSurveyStore } from '../../store';
import QRCode from "react-qr-code";

export default function Home() {

    const nav = useNavigate()
    const responses = useSurveyStore((state) => state.responses);
    console.log({ responses })


    return (
        <div dir='rtl' className={style.home}>
            <h1>ברוכות הבאות וברוכים הבאים</h1>
            <img className={style.logo} src='logo1.png' alt='pen' />
            <p>מספר האנשים שענו על השאלון:
                <span className={style.responses}> {responses.length}</span>
            </p>
            <img src="/credit.png" className={style.credit} alt="c" />

            <button className={style.start} onClick={() => nav('/survey/step1')}>התחל שאלון</button>
        </div>
    )
}
