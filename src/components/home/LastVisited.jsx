import React from 'react';
import { Link } from 'react-router-dom';

import { getVisitedProfiles } from '../helpers';

class LastVisited extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastVisitedProfiles: null
        }
    }

    componentDidMount() {
        let list = getVisitedProfiles();
        this.setState({ lastVisitedProfiles: list });
    }

    render() {
        return (
            this.state.lastVisitedProfiles !== null &&
            <div className="pt-4">
                <p>Últimos perfiles visitados <i className="la la-angle-down"></i></p>
                <div className="row text-left">
                    { this.state.lastVisitedProfiles.map((visit, index) =>
                    <div className="col-12 col-md-3 mb-2" key={index}>
                        <Link to={`/profile/${visit.username}`} className="result-link">
                            <div className="card">
                                <div className="card-body p-2">
                                    <div className="row no-gutters">
                                        <div className="col-auto pr-2">
                                            <img className="rounded-circle" width="50" height="50" src={visit.profile_picture} alt={visit.username + "_picture"} />
                                        </div>
                                        <div className="col-8 pl-0">
                                            <p className="card-title truncate-text mb-1" title={visit.username}>{ visit.username }</p>
                                            <p className="card-subtitle truncate-text text-muted">
                                                {visit.is_verified && <i className="la la-check-circle" title="Cuenta verificada">&nbsp;</i>}
                                                <small>{ visit.full_name }</small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    )}
                </div>
            </div>
        );
    }
}

export default LastVisited;