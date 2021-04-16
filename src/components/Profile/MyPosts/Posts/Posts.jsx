import React from 'react';
import wolf from '../../../../assets/img/wolf.gif'
import s from './Posts.module.css';

const Posts = (props) => {

    return (
        <div className={s.item}>
            <div className={s.row}>

                <div className={s.img}>
                    <img src={wolf}/>
                </div>

                { props.message }

            </div>

           <div>
                <span> Like </span> { props.likesCount }
           </div>

        </div>
    );
}

export default Posts;