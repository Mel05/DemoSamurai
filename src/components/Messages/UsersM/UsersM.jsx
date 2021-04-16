import React from 'react';
import s from './UsersM.module.css';
import {NavLink, Route} from "react-router-dom";



const UsersM = (props) => {

    let way = "/Messages/" + props.id;


    return (
        <div className={s.users__item + ' ' + s.active}>

            {/*{ props.users }*/}

            <NavLink activeClassName={s.active} to={way}>{props.name}</NavLink>
            {/*<Route path='/1' render={ () => <Incoming {props.messages} />}/>*/}
        </div>
    );
}

export default UsersM;