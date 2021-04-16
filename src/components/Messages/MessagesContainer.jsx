import React from 'react';
import {addMessageActionCreator,
    updateNewMessageTextActionCreator} from "../../redux/messages_reducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";



const mapStateToProps = (state) => {

    return {
        messagesPage: state.messagesPage,
        newMessageText: state.messagesPage.newMessageText,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageText: (text) => {
            let action = updateNewMessageTextActionCreator(text);
            dispatch(action);
        },
        addMessage: () => {
            dispatch(addMessageActionCreator());
        }
    }
}


/*
let AuthRedirectComponent = withAuthRedirect(Messages);

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);*/

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Messages);

/*
MessagesContainer;
*/
