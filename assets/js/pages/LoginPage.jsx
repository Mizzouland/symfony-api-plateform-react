import React, {useState} from 'react';
import axios from 'axios';

const LoginPage = (props) => {
    const [credentials, setCredentials] = useState({
        username:  "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value})
    };

    const handleSubmit = async event => {
            event.preventDefault();

            try {
                const token = await axios.post("http://127.0.0.1:8000/api/login_check", credentials)
                    .then(response => response.data.token);

                // apres avoir récupèrer le token
                setError('');

                // je stocke le token dans le localStorage
                window.localStorage.setItem("authToken", token);

                // il faut que pour axios toute requète est un header avec authorisation et on va lui ajouter une configuration par défaut
                axios.defaults.headers["Authorization"] =  "Bearer "+token;

                // maintenant axios est au courant que toutes les requètes que je fais , il y a un token d'authorisation
                // alors attention cela ne marche qu'une seule fois

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