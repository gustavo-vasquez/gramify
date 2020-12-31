import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { NotFound } from './shared/NotFound';
import NavigationBar from './shared/NavigationBar';
import Main from './home/Main';
import Results from './search/Results';
import Extract from './extract/Extract';
import Profile from './user/Profile';
import { ProfileNotFound } from './user/ProfileNotFound';

class InstractaramApp extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar></NavigationBar>
                <Switch>
                    <Route path="/search/:username" render={({ match }) => <Results username={match.params.username}></Results>}></Route>
                    <Route path="/extract/:shortcode" render={({ match }) => <Extract shortcode={match.params.shortcode}></Extract>}></Route>
                    <Route path="/profile/:username/:tab" render={({ match }) => <Profile username={match.params.username} tab={match.params.tab}></Profile>}></Route>
                    <Route path="/profile/:username" render={({ match }) => <Profile username={match.params.username}></Profile>}></Route>
                    <Route path="/profile/not_found" component={ProfileNotFound}></Route>
                    <Route exact path="/" component={Main}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
            </React.Fragment>
        )
    }
}

export default InstractaramApp;