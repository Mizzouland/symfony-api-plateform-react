import React, {useState} from 'react';
import axios from 'axios';
import AuthAPI from "../services/AuthAPI";

const LoginPage = ({onLogin, history}) => {

    const [credentials, setCredentials] = useState({
        username:  "",
        password: ""
    });
    const [error, setError] = useState("");

    // GESTION DES CHAMPS
    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value})
    };

    // GESTION DU SUBMIT
    const handleSubmit = async event => {
            event.preventDefault();
            try {
                await AuthAPI.authenticate(credentials);
                setError('');
                onLogin(true);
                history.replace("/customers")
            } catch (e) {
                console.log(error.message);
                setError("Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas pas!")
            }
    };


    return (
        <>
            <h1>Connexion à l'application</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input
                        type="email"
                        placeholder="adresse email de connexion"
                        name="username"
                        id="username"
                        value={credentials.username}
                        onChange={handleChange}
                        className={"form-control " + (error && " is-invalid") }

                    />
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                        id="password"
                        className="form-control"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Je me connecte</button>
                </div>
            </form>

        </>
    )
};

export default LoginPage;