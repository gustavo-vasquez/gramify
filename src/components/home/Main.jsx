import React from 'react';

import { seeResults } from '../helpers';
import Recent from '../search/Recent';
import LastVisited from './LastVisited';

class Main extends React.Component {
    /* constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
    } */

    render() {
        return (
            <div className="container">
                <div className="card border-0">
                    <div className="card-body text-center">
                        <h3>Extraiga fotos y videos de los perfiles de Instagram</h3>
                        <hr className="my-4"/>
                        <form action="/" onSubmit={(event) => seeResults(event, this.props.history)}>
                        <input type="text" name="username" className="form-control" placeholder="Escriba el nombre de usuario de Instagram..." autoFocus required />
                        <Recent></Recent>
                        <button className="btn btn-default btn-lg my-4" type="submit"><i className="la la-search"></i> Buscar ahora</button>
                        </form>
                        <div className="h-separator"></div>
                        <p><i className="la la-lightbulb-o la-lg text-danger"></i> Para acceder a perfiles privados es necesario que <a href="/">inicies sesión con tu cuenta de Instagram</a>.</p>
                        <LastVisited></LastVisited>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;