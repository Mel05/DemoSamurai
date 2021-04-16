import React from 'react';
import logo from '../../assets/img/wolflogo1.png';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";


type PropsType = {
    isAuth: boolean
    login: string | null,
}

const Header = ({isAuth, login}): PropsType => {

    return (
        <header className={s.header}>

            <div className={s.pic}>
            <img src={logo}/>
            </div>

            <div className={s.login__block}>
                { isAuth ? login : <NavLink to={'/login'}>
                    <button className={s.login__btn}>Login</button>
                </NavLink>}
            </div>

	    </header>
    );
}

export default Header;