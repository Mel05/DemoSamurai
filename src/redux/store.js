/*import profile_reducer from "./profile_reducer";
import messages_reducer from "./messages_reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 15},
                {id: 2, message: 'it is my first post', likesCount: 20}
            ],
            newPostText: ''
        },
        messagesPage: {
            users: [
                {id: 1, name: 'Надя'},
                {id: 2, name: 'Вера'},
                {id: 3, name: 'Наташа'},
                {id: 4, name: 'Света'},
                {id: 5, name: 'Галя'},
                {id: 6, name: 'Red Hat'}
            ],
            messages: [
                {id: 1, messages: 'Дмитрий?'},
                {id: 2, messages: 'Мельничек'},
                {id: 3, messages: 'Красавчик'},
                {id: 4, messages: 'Тссс'},
                {id: 5, messages: 'Уххх'},
                {id: 6, messages: 'Привет Серый Волк?'}
            ],
            newMessageText: ''
        }
    },

    _callSubscriber ()  {
        console.log('state changed');
    },
    getState() {
        return this._state;
    },
    subscribe (observer) {
        this._callSubscriber = observer; // патерн observer
    },

    dispatch(action) {

        this._state.profilePage = profile_reducer(this._state.profilePage, action);
        this._state.messagesPage = messages_reducer(this._state.messagesPage, action);

        this._callSubscriber(this._state);
    }

}

window.store = store;
export default store;*/


