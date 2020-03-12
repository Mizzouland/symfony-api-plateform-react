import React from 'react';
import AuthAPI from "../services/AuthAPI";
import {NavLink} from "react-router-dom";

const Navbar = ({isAuthenticated, onLogout, history}) => {

    const handleLogout = () => {
        AuthAPI.logout();
        onLogout(false);
        history.replace("/login");
    };



    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <NavLink className="navbar-brand" to="/">SymReact</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">Clients</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    {(!isAuthenticated && (
                        <>
                            <li className="nav-item mr-2">
                                <NavLink to="/login" className="btn btn-success">Connexion</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="#" className="btn btn-secondary">Inscription</NavLink>
                            </li>
                        </>
                    )) || (
                            <li className="nav-item mr-2">
                                <button onClick={handleLogout} className="btn btn-danger">Deconnexion</button>
                            </li>
                        )
                    }
                </ul>
            </div>
        </nav>

    );
};

export default Navbar;