import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { NotFound } from './shared/NotFound';
import NavigationBar from './shared/NavigationBar';
import Main from './home/Main';
import Results from './search/Results';

class InstractaramApp extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar></NavigationBar>
                <Switch>
                    <Route path="/search/:username" render={({ match }) => <Results username={match.params.username}></Results>}></Route>
                    <Route exact path="/" component={Main}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
            </React.Fragment>
        )
    }
}

export default InstractaramApp;