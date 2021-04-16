import React, {Component} from 'react';
import s from './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, HashRouter, Route, withRouter, Switch} from "react-router-dom";

import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from './components/Login/Login';
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app_reducer";
import Preloader from "./components/common/preloader";
import store from "./redux/redux_store";
import {withSuspense} from "./hoc/withSuspense";

import MessagesContainer from "./components/Messages/MessagesContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import FormikDemo from "./components/FormikU/FormikDemo";

const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));



class App extends Component {
    
    catchAllUnhandledErrors = (promiseRejectionEvent) => {
            alert(promiseRejectionEvent);
        }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillMount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className='app__wrapper'>

                <HeaderContainer/>
                <Navbar/>
                <div className='wrapper__content'>
                    <Switch>  
                        <Route path='/login'
                         render={() => <Login/>}/>

                        <Route path='/Profile/:userId?'
                         render={() => <ProfileContainer pageTitle={"Samurai"} />}/>

                        <Route path='/Messages' render={() =>
                            <MessagesContainer/>}/>

                        <Route path='/News'
                         render={withSuspense(News)}/>

                        <Route path='/Music'
                         render={withSuspense(Music)}/>

                        <Route path='/Settings'
                         render={withSuspense(Settings)}/>

                        <Route path='/Users'
                         render={() => <UsersContainer/>}/>

                        <Route path='/FormikDemo'
                         render={() => <FormikDemo/>}/>

                        <Route path='*'
                         render={() => <div> 404 NOT FOUND </div>}/>
                    </Switch>         
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})



const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})) (App);
    
const SamuraiJSApp = (props) => {
    return(
        //<HashRouter>
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
        //</HashRouter>
    )
}    

export default  SamuraiJSApp;