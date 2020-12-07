import React from 'react';
import { Link } from 'react-router-dom';

export const ProfileNotFound = () => {
    return (
        <div className="text-center">
            <i className="la la-dragon display-1"></i>
            <h2 className="mb-4">No se encontró este perfil de Instagram.</h2>
            <Link to="/"><i className="la la-undo h5"></i> Volver a buscar</Link>
        </div>
    );
}