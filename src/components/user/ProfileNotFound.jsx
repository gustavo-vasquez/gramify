import React from 'react';
import { Link } from 'react-router-dom';

import LastVisited from '../home/LastVisited';

export const ProfileNotFound = () => {
    document.title = "Perfil no encontrado • Instractaram";
    
    return (
        <div className="text-center">
            <i className="la la-sad-cry display-1"></i>
            <h2 className="mb-4">No se encontró este perfil de Instagram.</h2>
            <Link to="/" className="btn btn-default"><i className="la la-undo la-lg"></i> Volver a buscar</Link>
            <LastVisited></LastVisited>
        </div>
    );
}