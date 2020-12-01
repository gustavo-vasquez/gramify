import React from 'react';
import { Link } from 'react-router-dom';

import history from '../../history';
import { seeResults } from '../helpers';

class NavigationBar extends React.Component {
    render() {console.log(this.props);
        return (
            <nav className="navbar navbar-expand-lg navbar-light border-bottom px-0 mb-4">
                <Link className="navbar-brand" to="/"><i className="la la-instagram la-lg text-danger"></i> Instractaram</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home
                        <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">Features</a>
                    </li>
                    </ul>
                    <form action="/" onSubmit={(event) => seeResults(event, history)} className="form-inline my-2 my-lg-0 mr-auto">
                        <div className="input-group">
                            <input type="text" name="username" className="form-control" placeholder="Buscar nombres de usuario..." required />
                            <button className="btn" type="submit"><i className="la la-search"></i></button>
                        </div>
                    </form>
                    <button className="btn btn-danger connect-account" type="button"><i className="la la-instagram la-lg"></i> Conectar con Instagram</button>
                </div>
            </nav>
        );
    }
}

export default NavigationBar;