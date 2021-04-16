import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile_reducer";
import messagesReducer from "./messages_reducer";
import sidebarReducer from "./sidebar_reducer";
import usersReducer from "./users_reducer";
import authReducer from "./auth_reducer";
import thunkMiddleware from "redux-thunk";
import appReducer from "./app_reducer";



let rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer

});

type RootReducerType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))


// @ts-ignore
window.__store__ = store

export default store