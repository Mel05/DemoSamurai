import React from 'react';
import s from './Messages.module.css';
import UsersM from "./UsersM/UsersM";
import Incoming from "./Incoming/Incoming";




const Messages = (props) => {

    let state = props.messagesPage;
    let newMessageText = props.messagesPage;
    let usersElement =
        state.users.map( u => <UsersM name={u.name} id={u.id} key={u.id} />);

    let messagesElement =
        state.messages.map( m => <Incoming messages={m.message} id={m.id} key={m.id} />);

    let onAddMessage = () => {
        props.addMessage();
    }

    let onMessageChange = () => {
        let text = newMessageText.current.value;
        props.updateNewMessageText(text);
    }



    return (
        <div className={s.messages}>
            <div className={s.users}>

                {usersElement}
                <div>
                    <textarea onChange={onMessageChange}
                              ref ={newMessageText}
                              value ={props.newMessageText}/>
                </div>
                <div>
                    <button onClick={ onAddMessage }> send </button>
                </div>
            </div>

            <div className={s.post}>

                <div>{messagesElement}</div>

            </div>
        </div>
    );
}

export default Messages;