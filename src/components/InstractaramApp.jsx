import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NavigationBar from './layout/NavigationBar';
import Main from './home/Main';

class InstractaramApp extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar></NavigationBar>
                <Switch>
                    <Route path="/" component={Main}></Route>
                </Switch>
            </React.Fragment>
        )
    }
}

export default InstractaramApp;