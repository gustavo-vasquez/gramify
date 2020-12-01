import React from 'react';
import { Switch, Route } from 'react-router-dom';

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
                    <Route path="/" component={Main}></Route>
                </Switch>
            </React.Fragment>
        )
    }
}

export default InstractaramApp;