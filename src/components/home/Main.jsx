import React from 'react';
//import Instagram from 'instagram-web-api';
import Instagram from '../../lib/instagram-web-api/index.js';

const { REACT_APP_USERNAME, REACT_APP_PASSWORD } = process.env;
const client = new Instagram({ REACT_APP_USERNAME, REACT_APP_PASSWORD }, { language: 'es-ES' });
//const client = new Instagram({ REACT_APP_USERNAME, REACT_APP_PASSWORD }, { language: 'es-ES', proxy: '/api' });

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }

        //this.userInfo = this.getUserInformation();
    }

    /* getUserInformation = async () => {
        const userInfo = await client.getUserByUsername({ username: 'windowscentral' });
        console.log(userInfo);
        return userInfo;
    } */

    searchUsers = async (event) => {
        event.preventDefault();
        let results = await client.search({ query: this.state.username, context: 'user' });
        console.log(results);
    }

    onChangeField = (event) => {
        this.setState({username: event.target.value});
    }

    render() {
        return (
            <div className="container">
                <div className="card border-0">
                    <div className="card-body text-center">
                        <h3>Extraiga fotos y videos de los perfiles de Instagram</h3>
                        <hr className="my-4"/>
                        <form action="/" onSubmit={this.searchUsers}>
                        <input type="text" className="form-control" placeholder="Escriba el nombre de usuario..." onChange={this.onChangeField} value={this.state.username} autoFocus />
                        <button className="btn btn-default btn-lg my-4" type="submit">Buscar ahora</button>
                        </form>
                        <div className="h-separator"></div>
                        <p>Para acceder a perfiles privados es necesario que <a href="/">inicies sesión con tu cuenta de Instagram</a>.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;