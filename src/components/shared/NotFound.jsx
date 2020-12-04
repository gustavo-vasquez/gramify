import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="text-center">
            <i className="la la-dragon display-1"></i>
            <h2 className="mb-4">La página a la que intentas acceder no existe.</h2>
            <Link to="/"><i className="la la-undo h5"></i> Volver al inicio</Link>
        </div>
    );
}