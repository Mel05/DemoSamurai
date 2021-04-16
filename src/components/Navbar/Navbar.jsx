import React from 'react';
import s from './Navbar.module.css';
import {NavLink, Route} from "react-router-dom";




const Navbar = (props) => {

    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink activeClassName={s.active} to="/Profile">Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink activeClassName={s.active} to="/Messages">Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink activeClassName={s.active} to="/News">News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink activeClassName={s.active} to="/Music">Music</NavLink>
            </div>
            <div className={s.item__settings}>
                <NavLink activeClassName={s.active} to="/Settings">Settings</NavLink>
            </div><div className={s.item}>
                <NavLink activeClassName={s.active} to="/Users">Users</NavLink>
            </div>
            <div className={s.item__friends}>
                <NavLink activeClassName={s.active} to="/Friends">Friends</NavLink>
            </div>
            <div className={s.item__friends}>
                <NavLink activeClassName={s.active} to="/FormikDemo">FormikDemo</NavLink>
            </div>

            <div className={s.item__friendsItem}>
                <div> 1 </div>
                <div> 2 </div>
                <div> 3 </div>
            </div>
        </nav>
    );
}

export default Navbar;