import React from 'react';

import { seeResults, goToExtract } from '../helpers';
import Recent from '../search/Recent';
import LastVisited from './LastVisited';

class Main extends React.Component {
    componentDidMount() {
        document.title = "Instractaram • Extraer fotos y videos de Instagram";
    }

    render() {
        return (
            <div className="card border-0">
                <div className="card-body text-center p-0">
                    <h3>Extraiga fotos y videos de los perfiles de Instagram</h3>
                    <hr/>
                    <form action="/" onSubmit={(event) => seeResults(event, this.props.history)}>
                        <Recent></Recent>
                        <input type="text" name="username" className="form-control" placeholder="Ej: instagram" required />
                        <button className="btn btn-default my-3" type="submit"><i className="la la-search la-lg"></i> Buscar por usuario</button>
                    </form>
                    <p className="mt-2">O también puedes:</p>
                    <form action="/" onSubmit={(event) => goToExtract(event, this.props.history)}>
                        <input type="text" name="postLink" className="form-control" placeholder="Ej: https://www.instagram.com/p/CJTvBNYsDMT" required />
                        <button className="btn btn-default my-3" type="submit"><i className="la la-link la-lg"></i> Descargar por enlace</button>
                    </form>
                    <p className="mt-2"><i className="la la-lightbulb-o la-lg text-danger"></i> Para acceder a perfiles privados es necesario que <a href="/">inicies sesión con tu cuenta de Instagram</a>.</p>
                    <LastVisited></LastVisited>
                </div>
            </div>
        );
    }
}

export default Main;