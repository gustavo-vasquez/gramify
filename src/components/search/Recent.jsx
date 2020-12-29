import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import { getRecentSearches, removeRecentSearch } from '../helpers';

class Recent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: getRecentSearches()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        let recents = getRecentSearches();

        if(!prevState.content)
            this.setState({ content: recents });
        else {
            if(recents.length > 0) {
                let shouldUpdateContent = false;

                for(var i = 0; i < recents.length; i++) {
                    if(this.state.content[i] !== recents[i]) {
                        shouldUpdateContent = true;
                        break;
                    }
                }

                if(shouldUpdateContent)
                    this.setState({ content: recents });
            }
        }
    }

    removeTerm = (username) => {
        let recents = removeRecentSearch(username);
        this.setState({ content: recents });
    }

    render() {
        return (
            this.state.content.length > 0 &&
            <div className="row recent-searches-wrapper pt-md-2">
                <div className="col-12 col-md-auto pr-md-0">
                    <p className="py-1 mb-0 text-dark">Búsquedas recientes:</p>
                </div>
                {this.state.content.map((username, index) =>
                <div className="col-6 col-md-2" key={index}>
                    <Alert className="mb-2" dismissible>
                        <button type="button" className="close" onClick={() => this.removeTerm(username)} title="Borrar de la lista">&times;</button>
                        <div className="truncate-text pr-3">
                            <Link to={`/search/${username}`} title={username}>{username}</Link>
                        </div>
                    </Alert>
                </div>)}
            </div>
        );
    }
}

export default Recent;