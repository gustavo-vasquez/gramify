import React from 'react';
import { Link } from 'react-router-dom';

import history from '../../history';
import { searchUsers, seeResults } from '../helpers';
import Recent from './Recent';
import { Spinner } from '../shared/Spinner';

class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: null
        }
    }

    componentDidMount() {
        this.getAllResults();
    }

    componentDidUpdate(prevProps) {
        if(this.props.username !== prevProps.username) {
            this.getAllResults();
        }
    }

    getAllResults = async () => {
        const results = await searchUsers(this.props.username);
        this.setState({results: results});
    }

    render() {//console.log(this.state.results);
        return (
            <div>
                <form action="/" onSubmit={(event) => seeResults(event, history)}>
                    <div className="input-group">
                        <input type="text" name="username" className="form-control" placeholder="Escriba el nombre de usuario de Instagram..." defaultValue={this.props.username} autoFocus required />
                        <button className="btn" type="submit" title="Buscar ahora"><i className="la la-search"></i></button>
                    </div>
                </form>
                <Recent></Recent>
                <h3 className="pt-3">Resultados de la búsqueda "{this.props.username}"</h3>
                {!this.state.results ? <Spinner></Spinner> :
                <div className="row pt-4">
                    { this.state.results.length > 0 ? this.state.results.map((result, index) =>
                        <div className="col-12 col-md-3 mb-2" key={index}>
                            <Link to="/" className="result-link">
                                <div className="card">
                                    <div className="card-body p-2">
                                        <div className="row no-gutters">
                                            <div className="col-auto pr-2">
                                                <img className="rounded-circle" width="50" height="50" src={result.user.profile_pic_url} alt={result.user.username + "_picture"} />
                                            </div>
                                            <div className="col-8 pl-0">
                                                <p className="card-title truncate-text mb-1" title={result.user.username}>{ result.user.username }</p>
                                                <p className="card-subtitle truncate-text text-muted" title={result.user.full_name}>
                                                    {result.user.is_verified && <i className="la la-check-circle" title="Cuenta verificada">&nbsp;</i>}
                                                    <small>{ result.user.full_name }</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ) : <div className="text-center text-muted py-4 m-auto">
                                <h3><i className="la la-low-vision"></i></h3>
                                <h3>Sin resultados</h3>
                            </div>}
                </div>}
            </div>
        );
    }
}

export default Results;