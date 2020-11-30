import React from 'react';

class NavigationBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light border-bottom px-0 mb-4">
                <a className="navbar-brand" href="/"><i className="la la-instagram la-lg text-danger"></i> Instractaram</a>
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
                    <form className="form-inline my-2 my-lg-0 mr-auto">
                        <input className="form-control mr-sm-2" type="text" placeholder="Nombre de usuario..."/>
                        <button className="btn btn-secondary my-2 my-sm-0" type="submit"><i className="la la-search"></i></button>
                    </form>
                    <button className="btn btn-danger connect-account" type="button"><i className="la la-instagram la-lg"></i> Conectar con Instagram</button>
                </div>
            </nav>
        );
    }
}

export default NavigationBar;