import {useEffect, useState} from "react";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {MainScreen, ChatScreen} from './screens'
import {useCookies} from "react-cookie";

const Router = (props) => {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path={"/chat-rooms"}
                        component={ChatScreen}
                        exact
                    />
                    <Route
                        path={"/"}
                        component={MainScreen}
                        exact
                    />
                    <Redirect to="/"/>
                </Switch>
            </BrowserRouter>
        );
    }
;

export default Router;