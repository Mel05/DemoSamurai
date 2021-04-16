import React from 'react';
import s from './Incoming.module.css';

const Incoming = (props) => {

    return (

            <div className={s.post}>

                { props.messages }

            </div>

    );
}

export default Incoming;