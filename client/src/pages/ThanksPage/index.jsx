import React from 'react';
import style from './style.module.scss';

export default function ThanksPage() {
    return (
        <div className={style.container}>
            <img src="/lines.png" alt="lines" />
            <div className={style.box}>
                <div className={style.title}>
                    <span className={style.block}></span>
                    <h1>תודה רבה<span></span></h1>
                </div>
                <div className={style.role}>
                    <div className={style.block}></div>
                    <p>Innoveast</p>
                </div>
            </div>
        </div>
    );
}
