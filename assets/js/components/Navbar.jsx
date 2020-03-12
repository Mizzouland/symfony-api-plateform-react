import React from 'react';
import AuthAPI from "../services/AuthAPI";

const Navbar = (props) => {

    const handleLogout = () => {
        AuthAPI.logout();
    };



    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">SymReact</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Clients</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Factures</a>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-2">
                        <a href="#" className="btn btn-success">Connexion</a>
                    </li>
                    <li className="nav-item mr-2">
                        <button onClick={handleLogout} className="btn btn-danger">Deconnexion</button>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="btn btn-secondary">Inscription</a>
                    </li>
                </ul>
            </div>
        </nav>

    );
};

export default Navbar;