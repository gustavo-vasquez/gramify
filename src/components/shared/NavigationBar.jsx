import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar expand="lg" className="border-bottom px-0 mb-3">
                <Link className="navbar-brand" to="/"><i className="la la-instagram la-lg text-danger"></i> Instractaram</Link>
                <Navbar.Toggle aria-controls="hamburger_menu" label="Toggle navigation" />
                <Navbar.Collapse id="hamburger_menu">
                    <Nav className="mx-auto text-center">
                        <Nav.Link href="/">Home
                            <span className="sr-only">(current)</span>
                        </Nav.Link>
                        <Nav.Link className="nav-link" href="/">Features</Nav.Link>
                    </Nav>
                    <div className="text-center pt-3 pt-sm-0">
                        <button className="btn btn-danger connect-account" type="button"><i className="la la-instagram la-lg"></i> Conectar con Instagram</button>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavigationBar;