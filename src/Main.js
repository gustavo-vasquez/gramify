import React from 'react';
import Instagram from 'instagram-web-api';

const { REACT_APP_USERNAME, REACT_APP_PASSWORD } = process.env;
const client = new Instagram({ REACT_APP_USERNAME, REACT_APP_PASSWORD }, { language: 'es-ES' });

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.userInfo = this.getUserInformation();
    }

    getUserInformation = async () => {
        const userInfo = await client.getUserByUsername({ username: 'gustavo.carp22' });
        console.log(userInfo);
        return userInfo;
    }

    render() {
        return <div>Pantalla inicial</div>
    }
}

export default Main;