const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

type UsersType = {
    id: number
    name: string
}

type MessagesType = {
    id: number
    message: string
}

let initialState = {
    users: [
        {id: 1, name: 'Вася'},
        {id: 2, name: 'Петя'},
        {id: 3, name: 'Коля'},
        {id: 4, name: 'Толя'},
        {id: 5, name: 'Игорь'},
        {id: 6, name: 'Шмыгарь'}
    ] as Array<UsersType> ,
    messages: [
        {id: 1, message: '???'},
        {id: 2, message: 'Вопрос 2?'},
        {id: 3, message: 'Вопрос 3?'},
        {id: 4, message: 'Вопрос 4?'},
        {id: 5, message: 'Вопрос 5?'},
        {id: 6, message: 'Вопрос 6?'}
    ] as Array<MessagesType> ,
    newMessageText: '',
}

export type InitialStateType = typeof initialState

const messagesReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newTextMessage
            };
        case ADD_MESSAGE:
            let text = state.newMessageText;
            return {
                ...state,
                newMessageText: '',
                messages: [...state.messages, {id: 7, message: text}]
            };
        default:
            return state;

    }
}
type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
}
export const addMessageActionCreator = (): AddMessageActionCreatorType => ({type: ADD_MESSAGE})

type UpdateNewMessageTextActionCreatorType = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT
    text: string
}

export const updateNewMessageTextActionCreator = (text: string): UpdateNewMessageTextActionCreatorType =>
    ({type: UPDATE_NEW_MESSAGE_TEXT, newTextMessage: text}) as any

export default messagesReducer;